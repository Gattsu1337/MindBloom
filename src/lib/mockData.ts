
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
    content: "List three things you're grateful for today and reflect on why they bring you joy.",
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
  {
    id: '31',
    content: '"The happiness of your life depends upon the quality of your thoughts." - Marcus Aurelius',
    mood: 'Happy',
    type: 'Quote',
  },
  {
    id: '32',
    content: 'Take a moment to savor something small that brings you joy - like a cup of tea or the sunlight through a window.',
    mood: 'Happy',
    type: 'Exercise',
  },
  {
    id: '33',
    content: 'Put on your favorite upbeat music and dance for 5 minutes to amplify your positive mood.',
    mood: 'Happy',
    type: 'Exercise',
  },
  {
    id: '34',
    content: 'Try taking a photo of something that made you happy today to create a visual happiness journal.',
    mood: 'Happy',
    type: 'Advice',
  },
  {
    id: '35',
    content: '"Happiness is when what you think, what you say, and what you do are in harmony." - Mahatma Gandhi',
    mood: 'Happy',
    type: 'Quote',
  },
  
  // Sad mood recommendations
  {
    id: '6',
    content: "\"There is a crack in everything, that's how the light gets in.\" - Leonard Cohen",
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
    content: "Try journaling about what's making you feel this way. Sometimes putting thoughts on paper helps process emotions.",
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
  {
    id: '36',
    content: '"Sadness flies away on the wings of time." - Jean de La Fontaine',
    mood: 'Sad',
    type: 'Quote',  
  },
  {
    id: '37',
    content: 'Create a comfort box with items that soothe you - photos, a soft item, a favorite tea, etc.',
    mood: 'Sad',
    type: 'Exercise',
  },
  {
    id: '38',
    content: 'Try gentle movement like stretching or a slow walk to release endorphins without requiring too much energy.',
    mood: 'Sad',
    type: 'Exercise',
  },
  {
    id: '39',
    content: 'Reach out to someone you trust. Simply saying "I feel down today" can be healing.',
    mood: 'Sad',
    type: 'Advice',
  },
  {
    id: '40',
    content: '"The pain you feel today is the strength you feel tomorrow." - Unknown',
    mood: 'Sad',
    type: 'Quote',
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
  {
    id: '41',
    content: '"Holding onto anger is like drinking poison and expecting the other person to die." - Buddha',
    mood: 'Angry',
    type: 'Quote',
  },
  {
    id: '42',
    content: 'Write a letter expressing your anger without holding back (but without sending it).',
    mood: 'Angry',
    type: 'Exercise',
  },
  {
    id: '43',
    content: 'Try progressive muscle relaxation: tense and then release each muscle group in your body.',
    mood: 'Angry',
    type: 'Exercise',
  },
  {
    id: '44',
    content: 'Identify the need behind your anger. Often anger signifies an unmet need for respect, fairness, or control.',
    mood: 'Angry',
    type: 'Advice',
  },
  {
    id: '45',
    content: '"The greatest remedy for anger is delay." - Seneca',
    mood: 'Angry',
    type: 'Quote',
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
    content: "\"You don't have to control your thoughts. You just have to stop letting them control you.\" - Dan Millman",
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
  {
    id: '46',
    content: '"Anxiety is a thin stream of fear trickling through the mind. If encouraged, it cuts a channel into which all other thoughts are drained." - Arthur Somers Roche',
    mood: 'Anxious',
    type: 'Quote',
  },
  {
    id: '47',
    content: 'Put your hands under cold water for 30 seconds to help reset your nervous system.',
    mood: 'Anxious',
    type: 'Exercise',
  },
  {
    id: '48',
    content: 'Create a worry period: set aside 15 minutes daily to focus on worries, then let them go outside that time.',
    mood: 'Anxious',
    type: 'Advice',
  },
  {
    id: '49',
    content: 'Try box breathing: inhale for 4 counts, hold for 4, exhale for 4, hold for 4. Repeat.',
    mood: 'Anxious',
    type: 'Exercise',
  },
  {
    id: '50',
    content: '"Peace is the result of retraining your mind to process life as it is, rather than as you think it should be." - Wayne Dyer',
    mood: 'Anxious',
    type: 'Quote',
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
    content: "Create a vision board or write down your goals while you're feeling motivated and inspired.",
    mood: 'Excited',
    type: 'Exercise',
  },
  {
    id: '25',
    content: 'Share your excitement with someone who will appreciate and celebrate with you.',
    mood: 'Excited',
    type: 'Advice',
  },
  {
    id: '51',
    content: '"Energy and persistence conquer all things." - Benjamin Franklin',
    mood: 'Excited',
    type: 'Quote',
  },
  {
    id: '52',
    content: 'Document this excited state with a voice memo or journal entry to revisit when you need motivation.',
    mood: 'Excited',
    type: 'Exercise',
  },
  {
    id: '53',
    content: 'Use this energized state to tackle a challenging task that requires enthusiasm.',
    mood: 'Excited',
    type: 'Advice',
  },
  {
    id: '54',
    content: 'Set small, achievable milestones to maintain this positive momentum.',
    mood: 'Excited',
    type: 'Exercise',
  },
  {
    id: '55',
    content: '"Your positive action combined with positive thinking results in success." - Shiv Khera',
    mood: 'Excited',
    type: 'Quote',
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
    content: "\"Life isn't about finding yourself. Life is about creating yourself.\" - George Bernard Shaw",
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
  {
    id: '56',
    content: '"The meaning of life is to give life meaning." - Viktor Frankl',
    mood: 'Neutral',
    type: 'Quote',
  },
  {
    id: '57',
    content: 'Try the "five senses check-in" - note one thing you can currently see, hear, feel, smell, and taste.',
    mood: 'Neutral',
    type: 'Exercise',
  },
  {
    id: '58',
    content: 'Consider setting an intention for the day, even a simple one like "I will notice moments of beauty."',
    mood: 'Neutral',
    type: 'Advice',
  },
  {
    id: '59',
    content: 'Practice mindful observation: choose an object and examine it with full attention for 2 minutes.',
    mood: 'Neutral',
    type: 'Exercise',
  },
  {
    id: '60',
    content: '"How we spend our days is, of course, how we spend our lives." - Annie Dillard',
    mood: 'Neutral',
    type: 'Quote',
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
