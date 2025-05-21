
import { Recommendation } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface RecommendationCardProps {
  recommendation: Recommendation;
}

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'Quote': return '💬';
    case 'Advice': return '💡';
    case 'Exercise': return '🧘';
    default: return '📝';
  }
};

const getMoodColor = (mood: string) => {
  switch (mood) {
    case 'Happy': return 'bg-green-100 text-green-800 border-green-200';
    case 'Sad': return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'Angry': return 'bg-red-100 text-red-800 border-red-200';
    case 'Anxious': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'Excited': return 'bg-purple-100 text-purple-800 border-purple-200';
    case 'Neutral': return 'bg-gray-100 text-gray-800 border-gray-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const RecommendationCard = ({ recommendation }: RecommendationCardProps) => {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <Badge className={getMoodColor(recommendation.mood)}>
            {recommendation.mood}
          </Badge>
          <span className="text-lg" aria-hidden="true">
            {getTypeIcon(recommendation.type)}
          </span>
        </div>
        <CardTitle className="text-base">
          {recommendation.type}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-foreground">{recommendation.content}</p>
      </CardContent>
    </Card>
  );
};

export default RecommendationCard;
