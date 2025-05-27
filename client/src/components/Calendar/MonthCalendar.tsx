import { useMemo } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay } from 'date-fns';
import { JournalEntry } from '@/types';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';

interface MonthCalendarProps {
  entries: JournalEntry[];
  onDateClick?: (date: string) => void;
  onMonthChange?: (date: Date) => void;
  currentMonth: Date;
  className?: string;
}

const getDayClasses = (isCurrentMonth: boolean, isToday: boolean, hasEntries: boolean, mood?: string) => {
  const baseClasses = 'relative h-14 rounded-md transition-colors flex flex-col items-center justify-center cursor-pointer';
  
  if (!isCurrentMonth) {
    return `${baseClasses} text-gray-300 hover:bg-gray-50`;
  }
  
  let moodClass = '';
  if (hasEntries && mood) {
    switch (mood) {
      case 'Happy': moodClass = 'bg-green-50'; break;
      case 'Sad': moodClass = 'bg-blue-50'; break;
      case 'Angry': moodClass = 'bg-red-50'; break;
      case 'Anxious': moodClass = 'bg-yellow-50'; break;
      case 'Excited': moodClass = 'bg-purple-50'; break;
      case 'Neutral': moodClass = 'bg-gray-50'; break;
    }
  }
  
  if (isToday) {
    return `${baseClasses} ${moodClass} border-2 border-primary font-bold`;
  }
  
  return `${baseClasses} ${moodClass} hover:bg-gray-50`;
};

const MonthCalendar = ({ entries, onDateClick, onMonthChange, currentMonth, className }: MonthCalendarProps) => {
  const firstDayOfMonth = startOfMonth(currentMonth);
  const lastDayOfMonth = endOfMonth(currentMonth);
  
  const days = useMemo(() => {
    const daysInMonth = eachDayOfInterval({ start: firstDayOfMonth, end: lastDayOfMonth });
    
    return daysInMonth.map(day => {
      const dateStr = format(day, 'yyyy-MM-dd');
      const dayEntries = entries.filter(entry => entry.entry_date === dateStr);
      
      const mood = dayEntries.length > 0 ? dayEntries[0].mood : undefined;
      
      return {
        date: day,
        entries: dayEntries,
        isCurrentMonth: isSameMonth(day, currentMonth),
        isToday: isSameDay(day, new Date()),
        mood
      };
    });
  }, [entries, currentMonth, firstDayOfMonth, lastDayOfMonth]);
  
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  const handlePreviousMonth = () => {
    const newDate = new Date(currentMonth);
    newDate.setMonth(newDate.getMonth() - 1);
    onMonthChange?.(newDate);
  };
  
  const handleNextMonth = () => {
    const newDate = new Date(currentMonth);
    newDate.setMonth(newDate.getMonth() + 1);
    onMonthChange?.(newDate);
  };
  
  const handleDateClick = (date: Date) => {
    if (onDateClick) {
      onDateClick(format(date, 'yyyy-MM-dd'));
    }
  };
  
  return (
    <Card className={cn("p-4", className)}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">
          {format(currentMonth, 'MMMM yyyy')}
        </h2>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={handlePreviousMonth}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={handleNextMonth}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <Separator className="mb-4" />
      
      <div className="grid grid-cols-7 mb-2">
        {weekdays.map((day) => (
          <div key={day} className="text-center font-medium text-sm py-2">
            {day}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {days.map(({ date, entries, isCurrentMonth, isToday, mood }) => (
          <div
            key={format(date, 'yyyy-MM-dd')}
            className={getDayClasses(isCurrentMonth, isToday, entries.length > 0, mood)}
            onClick={() => handleDateClick(date)}
          >
            <span>{format(date, 'd')}</span>
            {entries.length > 0 && (
              <div className="absolute bottom-1 w-2 h-2 rounded-full bg-primary" />
            )}
          </div>
        ))}
      </div>
    </Card>
  );
};

export default MonthCalendar;
