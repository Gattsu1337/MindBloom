import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { AxiosError } from 'axios';
import { JournalEntry } from '@/types';
import { startOfMonth, endOfMonth, format } from 'date-fns';

interface GetCalendarEntriesParams {
  month?: Date;
}

interface GetCalendarEntriesResponse {
  entries: JournalEntry[];
  total: number;
}

export const useCalendarEntries = (params: GetCalendarEntriesParams = {}) => {
  const month = params.month || new Date();
  const startDate = format(startOfMonth(month), 'yyyy-MM-dd');
  const endDate = format(endOfMonth(month), 'yyyy-MM-dd');

  return useQuery<GetCalendarEntriesResponse, AxiosError>({
    queryKey: ['calendar-entries', startDate, endDate],
    queryFn: async () => {
      const searchParams = new URLSearchParams({
        startDate,
        endDate,
        pageSize: '100',
      });

      const response = await api.get<GetCalendarEntriesResponse>(`/entries?${searchParams.toString()}`);
      return response.data;
    },
  });
}; 