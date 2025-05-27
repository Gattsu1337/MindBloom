import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { AxiosError } from 'axios';
import { JournalEntry } from '@/types';
import { startOfWeek, endOfWeek, startOfMonth, endOfMonth, format } from 'date-fns';

type Period = 'week' | 'month' | 'all';

interface GetStatisticsParams {
  period?: Period;
}

interface MoodDistribution {
  [key: string]: number;
}

interface Statistics {
  totalEntries: number;
  moodDistribution: MoodDistribution;
  mostFrequentMood: string;
  averageEntriesPerWeek: number;
}

export const useStatistics = (params: GetStatisticsParams = {}) => {
  const { period = 'all' } = params;

  return useQuery<Statistics, AxiosError>({
    queryKey: ['statistics', period],
    queryFn: async () => {
      const searchParams = new URLSearchParams();
      searchParams.append('pageSize', '1000');
      
      if (period === 'week') {
        const start = format(startOfWeek(new Date()), 'yyyy-MM-dd');
        const end = format(endOfWeek(new Date()), 'yyyy-MM-dd');
        searchParams.append('startDate', start);
        searchParams.append('endDate', end);
      } else if (period === 'month') {
        const start = format(startOfMonth(new Date()), 'yyyy-MM-dd');
        const end = format(endOfMonth(new Date()), 'yyyy-MM-dd');
        searchParams.append('startDate', start);
        searchParams.append('endDate', end);
      }

      const response = await api.get<{ entries: JournalEntry[] }>(`/entries?${searchParams.toString()}`);
      const entries = response.data.entries;

      const moodDistribution = entries.reduce((acc, entry) => {
        acc[entry.mood] = (acc[entry.mood] || 0) + 1;
        return acc;
      }, {} as MoodDistribution);

      const totalEntries = entries.length;
      const mostFrequentMood = Object.entries(moodDistribution)
        .sort(([, a], [, b]) => b - a)[0]?.[0] || 'No entries';

      const averageEntriesPerWeek = totalEntries / (period === 'month' ? 4 : period === 'week' ? 1 : 52);

      return {
        totalEntries,
        moodDistribution,
        mostFrequentMood,
        averageEntriesPerWeek,
      };
    },
  });
}; 