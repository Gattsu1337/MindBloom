import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { AxiosError } from 'axios';

export interface Recommendation {
  id: string;
  content: string;
  mood: 'Happy' | 'Sad' | 'Angry' | 'Anxious' | 'Excited' | 'Neutral';
  type: 'Quote' | 'Advice' | 'Exercise';
}

interface GetRecommendationsParams {
  mood?: Recommendation['mood'];
  type?: Recommendation['type'];
}

export const useRecommendations = (params: GetRecommendationsParams = {}) => {
  return useQuery<Recommendation[], AxiosError>({
    queryKey: ['recommendations', params],
    queryFn: async () => {
      const searchParams = new URLSearchParams();
      if (params.mood) searchParams.append('mood', params.mood);
      if (params.type) searchParams.append('type', params.type);

      const response = await api.get<Recommendation[]>(`/recommendations?${searchParams.toString()}`);
      return response.data;
    },
  });
}; 