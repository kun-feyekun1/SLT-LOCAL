import { useQuery } from '@tanstack/react-query';

import { useAppSelector } from '@/store/hooks';
import { queryKeys } from '@/utils/queryKeys';

import { routeService } from '../services/routeService';

export const useRouteRecommendations = () => {
  const origin = useAppSelector((state) => state.route.origin as { id: string | number } | null);
  const destination = useAppSelector((state) => state.route.destination as { id: string | number } | null);

  return useQuery({
    queryKey: origin && destination ? queryKeys.routeRecommendations(String(origin.id), String(destination.id)) : ['routeRecommendations', 'missing'],
    queryFn: () => origin && destination
      ? routeService.getRecommendations(
          origin as Parameters<typeof routeService.getRecommendations>[0],
          destination as Parameters<typeof routeService.getRecommendations>[1]
        )
      : Promise.reject(new Error('Missing origin or destination')),
    enabled: Boolean(origin && destination)
  });
};
