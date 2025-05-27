export type Mood = 'Happy' | 'Sad' | 'Angry' | 'Anxious' | 'Excited' | 'Neutral';

export interface User {
  id: number;
  username: string;
  email: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
}

export interface JournalEntry {
  id: number;
  mood: Mood;
  note?: string;
  trigger?: string;
  entry_date: string;
  user_id: number;
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
