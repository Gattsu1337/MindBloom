import { useState } from 'react';
import { format } from 'date-fns';
import MainLayout from '@/components/Layout/MainLayout';
import MonthCalendar from '@/components/Calendar/MonthCalendar';
import EntryList from '@/components/Journal/EntryList';
import { Button } from '@/components/ui/button';
import { PlusCircle, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCalendarEntries } from '@/hooks/useCalendarEntries';

const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const navigate = useNavigate();
  
  const { data, isLoading, error } = useCalendarEntries({ month: currentMonth });
  
  const handleDateClick = (date: string) => {
    setSelectedDate(date);
  };
  
  const selectedDateEntries = selectedDate 
    ? data?.entries.filter(entry => entry.entry_date === selectedDate) || []
    : [];

  const handleMonthChange = (date: Date) => {
    setCurrentMonth(date);
  };
  
  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Calendar</h1>
          <Button onClick={() => navigate('/journal')}>
            <PlusCircle className="mr-2 h-4 w-4" />
            New Entry
          </Button>
        </div>
        
        {error ? (
          <div className="text-center text-red-500">
            Error loading calendar data. Please try again later.
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8">
              {isLoading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin" />
                </div>
              ) : (
                <MonthCalendar 
                  entries={data?.entries || []}
                  onDateClick={handleDateClick}
                  onMonthChange={handleMonthChange}
                  currentMonth={currentMonth}
                />
              )}
            </div>
            
            <div className="lg:col-span-4">
              {selectedDate ? (
                <EntryList 
                  entries={selectedDateEntries} 
                  title={`Entries for ${format(new Date(selectedDate), 'MMMM d, yyyy')}`}
                />
              ) : (
                <div className="bg-muted/50 rounded-lg p-6 text-center">
                  <p className="text-muted-foreground">
                    Select a date to view entries
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default CalendarPage;
