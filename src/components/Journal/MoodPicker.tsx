
import React from 'react';
import { cn } from '@/lib/utils';
import { Mood } from '@/types';
import { 
  Smile,
  Frown,
  Angry,
  Meh,
  Happy
} from 'lucide-react';

interface MoodPickerProps {
  selectedMood: Mood | null;
  onMoodSelect: (mood: Mood) => void;
  className?: string;
}

interface MoodOption {
  mood: Mood;
  icon: React.ElementType;
  label: string;
  bgColor: string;
  hoverColor: string;
}

const moodOptions: MoodOption[] = [
  {
    mood: 'Happy',
    icon: Happy,
    label: 'Happy',
    bgColor: 'bg-green-100',
    hoverColor: 'hover:bg-green-200',
  },
  {
    mood: 'Sad',
    icon: Frown,
    label: 'Sad',
    bgColor: 'bg-blue-100',
    hoverColor: 'hover:bg-blue-200',
  },
  {
    mood: 'Angry',
    icon: Angry,
    label: 'Angry',
    bgColor: 'bg-red-100',
    hoverColor: 'hover:bg-red-200',
  },
  {
    mood: 'Anxious',
    icon: Meh,
    label: 'Anxious',
    bgColor: 'bg-yellow-100',
    hoverColor: 'hover:bg-yellow-200',
  },
  {
    mood: 'Excited',
    icon: Smile,
    label: 'Excited',
    bgColor: 'bg-purple-100',
    hoverColor: 'hover:bg-purple-200',
  },
  {
    mood: 'Neutral',
    icon: Meh,
    label: 'Neutral',
    bgColor: 'bg-gray-100',
    hoverColor: 'hover:bg-gray-200',
  },
];

const MoodPicker = ({ selectedMood, onMoodSelect, className }: MoodPickerProps) => {
  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {moodOptions.map((option) => {
        const isSelected = selectedMood === option.mood;
        return (
          <button
            key={option.mood}
            type="button"
            className={cn(
              'flex flex-col items-center justify-center p-4 rounded-lg transition-all',
              option.bgColor,
              option.hoverColor,
              isSelected ? 'ring-2 ring-primary scale-105' : 'scale-100',
              isSelected ? 'shadow-md' : ''
            )}
            onClick={() => onMoodSelect(option.mood)}
          >
            <option.icon 
              className={cn(
                'w-8 h-8 mb-2',
                isSelected ? 'text-primary' : 'text-foreground'
              )}
            />
            <span className={cn(
              'text-sm font-medium',
              isSelected ? 'text-primary' : 'text-foreground'
            )}>
              {option.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default MoodPicker;
