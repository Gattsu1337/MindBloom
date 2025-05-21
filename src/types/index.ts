
export interface User {
  id: string;
  username: string;
  email: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
}

export type Mood = 'Happy' | 'Sad' | 'Angry' | 'Anxious' | 'Excited' | 'Neutral';

export interface JournalEntry {
  id: string;
  userId: string;
  mood: Mood;
  note?: string;
  trigger?: string;
  entryDate: string;
  createdAt: string;
}

export interface RecommendationType {
  type: 'Quote' | 'Advice' | 'Exercise';
}

export interface Recommendation {
  id: string;
  content: string;
  mood: Mood;
  type: RecommendationType['type'];
}

export interface CalendarDay {
  date: Date;
  entries: JournalEntry[];
  isCurrentMonth: boolean;
  isToday: boolean;
}
