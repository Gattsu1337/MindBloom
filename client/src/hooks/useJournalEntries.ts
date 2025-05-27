import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { AxiosError } from 'axios';

export interface JournalEntry {
  id: number;
  mood: 'Happy' | 'Sad' | 'Angry' | 'Anxious' | 'Excited' | 'Neutral';
  note?: string;
  trigger?: string;
  entry_date: string;
  user_id: number;
}

interface GetEntriesParams {
  page?: number;
  pageSize?: number;
  mood?: JournalEntry['mood'];
  date?: string;
}

interface GetEntriesResponse {
  entries: JournalEntry[];
  total: number;
  currentPage: number;
  totalPages: number;
}

export const useJournalEntries = (params: GetEntriesParams = {}) => {
  const queryClient = useQueryClient();

  const { data: entriesData, isLoading, error } = useQuery<GetEntriesResponse, AxiosError>({
    queryKey: ['entries', params],
    queryFn: async () => {
      const searchParams = new URLSearchParams();
      if (params.page) searchParams.append('page', params.page.toString());
      if (params.pageSize) searchParams.append('pageSize', params.pageSize.toString());
      if (params.mood) searchParams.append('mood', params.mood);
      if (params.date) searchParams.append('date', params.date);

      const response = await api.get<GetEntriesResponse>(`/entries?${searchParams.toString()}`);
      return response.data;
    },
    retry: 1,
    staleTime: 30000,
    refetchOnWindowFocus: false,
  });

  const createEntry = useMutation<JournalEntry, AxiosError, Omit<JournalEntry, 'id' | 'user_id'>>({
    mutationFn: async (newEntry) => {
      const response = await api.post<JournalEntry>('/entries', newEntry);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['entries'] });
    },
  });

  const updateEntry = useMutation<JournalEntry, AxiosError, Partial<JournalEntry> & { id: number }>({
    mutationFn: async ({ id, ...data }) => {
      const response = await api.put<JournalEntry>(`/entries/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['entries'] });
    },
  });

  const deleteEntry = useMutation<void, AxiosError, number>({
    mutationFn: async (id) => {
      await api.delete(`/entries/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['entries'] });
    },
  });

  return {
    entries: entriesData?.entries || [],
    totalEntries: entriesData?.total || 0,
    currentPage: entriesData?.currentPage || 1,
    totalPages: entriesData?.totalPages || 1,
    isLoading,
    error,
    createEntry,
    updateEntry,
    deleteEntry,
  };
}; 