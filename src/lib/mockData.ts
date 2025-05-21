
import { JournalEntry, Recommendation } from '@/types';

// Mock data for authenticated user
export const mockUserData = {
  id: '1',
  username: 'demo_user',
  email: 'demo@example.com',
};

// Mock token
export const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwiaWF0IjoxNTg5NTcyMjU1LCJleHAiOjE1ODk2NTg2NTV9.hR1XSKzXRcw6iSa0RK-xRj8pO3b3f-SV8tbZZ_yL90M';

// Mock journal entries
export const mockJournalEntries: JournalEntry[] = [
  {
    id: '1',
    userId: '1',
    mood: 'Happy',
    note: 'Had a great day! Went for a walk and enjoyed the sunshine.',
    trigger: 'Nature',
    entryDate: '2025-05-20',
    createdAt: '2025-05-20T12:00:00Z',
  },
  {
    id: '2',
    userId: '1',
    mood: 'Anxious',
    note: 'Feeling stressed about work deadlines.',
    trigger: 'Work',
    entryDate: '2025-05-19',
    createdAt: '2025-05-19T18:30:00Z',
  },
  {
    id: '3',
    userId: '1',
    mood: 'Neutral',
    note: 'Just an average day.',
    entryDate: '2025-05-18',
    createdAt: '2025-05-18T20:45:00Z',
  },
  {
    id: '4',
    userId: '1',
    mood: 'Sad',
    note: 'Feeling down today, not sure why.',
    entryDate: '2025-05-17',
    createdAt: '2025-05-17T21:15:00Z',
  },
  {
    id: '5',
    userId: '1',
    mood: 'Excited',
    note: 'Just got good news about my project!',
    trigger: 'Work success',
    entryDate: '2025-05-16',
    createdAt: '2025-05-16T15:20:00Z',
  },
];

// Mock recommendations
export const mockRecommendations: Recommendation[] = [
  {
    id: '1',
    content: '"Happiness is not something ready-made. It comes from your own actions." - Dalai Lama',
    mood: 'Happy',
    type: 'Quote',
  },
  {
    id: '2',
    content: 'Take 5 deep breaths, focusing on the sensations in your body.',
    mood: 'Anxious',
    type: 'Exercise',
  },
  {
    id: '3',
    content: 'Try journaling about what\'s making you feel this way. Sometimes putting thoughts on paper helps process emotions.',
    mood: 'Sad',
    type: 'Advice',
  },
  {
    id: '4',
    content: 'Go for a brisk walk or do some physical activity to channel your energy.',
    mood: 'Angry',
    type: 'Exercise',
  },
  {
    id: '5',
    content: '"The purpose of our lives is to be happy." - Dalai Lama',
    mood: 'Neutral',
    type: 'Quote',
  },
  {
    id: '6',
    content: 'Channel this positive energy into something creative or productive!',
    mood: 'Excited',
    type: 'Advice',
  },
];

// Helper function to get recommendations based on mood
export const getRecommendationsByMood = (mood: string): Recommendation[] => {
  return mockRecommendations.filter(rec => rec.mood === mood);
};

// Helper function to get entries by date
export const getEntriesByDate = (date: string): JournalEntry[] => {
  return mockJournalEntries.filter(entry => entry.entryDate === date);
};
