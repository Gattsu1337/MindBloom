
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
  // Happy mood recommendations
  {
    id: '1',
    content: '"Happiness is not something ready-made. It comes from your own actions." - Dalai Lama',
    mood: 'Happy',
    type: 'Quote',
  },
  {
    id: '2',
    content: '"The most wasted of all days is one without laughter." - E.E. Cummings',
    mood: 'Happy',
    type: 'Quote',
  },
  {
    id: '3',
    content: 'List three things you're grateful for today and reflect on why they bring you joy.',
    mood: 'Happy',
    type: 'Exercise',
  },
  {
    id: '4',
    content: 'Spread your positive energy by doing a small act of kindness for someone else today.',
    mood: 'Happy',
    type: 'Advice',
  },
  {
    id: '5',
    content: 'Try "joy journaling" - write down moments that made you smile today to revisit later.',
    mood: 'Happy',
    type: 'Exercise',
  },
  
  // Sad mood recommendations
  {
    id: '6',
    content: '"There is a crack in everything, that\'s how the light gets in." - Leonard Cohen',
    mood: 'Sad',
    type: 'Quote',
  },
  {
    id: '7',
    content: '"Even the darkest night will end and the sun will rise." - Victor Hugo',
    mood: 'Sad',
    type: 'Quote',
  },
  {
    id: '8',
    content: 'Try journaling about what\'s making you feel this way. Sometimes putting thoughts on paper helps process emotions.',
    mood: 'Sad',
    type: 'Advice',
  },
  {
    id: '9',
    content: 'Practice self-compassion by speaking to yourself as you would to a good friend going through a hard time.',
    mood: 'Sad',
    type: 'Advice',
  },
  {
    id: '10',
    content: 'Engage your senses: Find something pleasant to see, touch, smell, taste, and hear to ground yourself in the present moment.',
    mood: 'Sad',
    type: 'Exercise',
  },
  
  // Angry mood recommendations
  {
    id: '11',
    content: '"Speak when you are angry and you will make the best speech you will ever regret." - Ambrose Bierce',
    mood: 'Angry',
    type: 'Quote',
  },
  {
    id: '12',
    content: '"For every minute you remain angry, you give up sixty seconds of peace of mind." - Ralph Waldo Emerson',
    mood: 'Angry',
    type: 'Quote',
  },
  {
    id: '13',
    content: 'Go for a brisk walk or do some physical activity to channel your energy.',
    mood: 'Angry',
    type: 'Exercise',
  },
  {
    id: '14',
    content: 'Try the 4-7-8 breathing technique: Inhale for 4 seconds, hold for 7 seconds, exhale for 8 seconds. Repeat 4 times.',
    mood: 'Angry',
    type: 'Exercise',
  },
  {
    id: '15',
    content: 'Before responding to what triggered your anger, take a short time-out to collect your thoughts.',
    mood: 'Angry',
    type: 'Advice',
  },
  
  // Anxious mood recommendations
  {
    id: '16',
    content: '"Worry does not empty tomorrow of its sorrow, it empties today of its strength." - Corrie ten Boom',
    mood: 'Anxious',
    type: 'Quote',
  },
  {
    id: '17',
    content: '"You don't have to control your thoughts. You just have to stop letting them control you." - Dan Millman',
    mood: 'Anxious',
    type: 'Quote',
  },
  {
    id: '18',
    content: 'Take 5 deep breaths, focusing on the sensations in your body.',
    mood: 'Anxious',
    type: 'Exercise',
  },
  {
    id: '19',
    content: 'Try the 5-4-3-2-1 grounding technique: Acknowledge 5 things you can see, 4 things you can touch, 3 things you can hear, 2 things you can smell, and 1 thing you can taste.',
    mood: 'Anxious',
    type: 'Exercise',
  },
  {
    id: '20',
    content: 'Write down your worries, then next to each one, note what you can and cannot control about the situation.',
    mood: 'Anxious',
    type: 'Advice',
  },
  
  // Excited mood recommendations
  {
    id: '21',
    content: '"The future belongs to those who believe in the beauty of their dreams." - Eleanor Roosevelt',
    mood: 'Excited',
    type: 'Quote',
  },
  {
    id: '22',
    content: '"Enthusiasm moves the world." - Arthur Balfour',
    mood: 'Excited',
    type: 'Quote',
  },
  {
    id: '23',
    content: 'Channel this positive energy into something creative or productive!',
    mood: 'Excited',
    type: 'Advice',
  },
  {
    id: '24',
    content: 'Create a vision board or write down your goals while you're feeling motivated and inspired.',
    mood: 'Excited',
    type: 'Exercise',
  },
  {
    id: '25',
    content: 'Share your excitement with someone who will appreciate and celebrate with you.',
    mood: 'Excited',
    type: 'Advice',
  },
  
  // Neutral mood recommendations
  {
    id: '26',
    content: '"The purpose of our lives is to be happy." - Dalai Lama',
    mood: 'Neutral',
    type: 'Quote',
  },
  {
    id: '27',
    content: '"Life isn't about finding yourself. Life is about creating yourself." - George Bernard Shaw',
    mood: 'Neutral',
    type: 'Quote',
  },
  {
    id: '28',
    content: 'Try a new hobby or activity today that sparks your curiosity.',
    mood: 'Neutral',
    type: 'Advice',
  },
  {
    id: '29',
    content: 'Take a mindful walk outside, paying attention to the small details around you that you might normally miss.',
    mood: 'Neutral',
    type: 'Exercise',
  },
  {
    id: '30',
    content: 'Practice a body scan meditation: Start at your toes and slowly move attention up through your body, noticing sensations without judgment.',
    mood: 'Neutral',
    type: 'Exercise',
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
