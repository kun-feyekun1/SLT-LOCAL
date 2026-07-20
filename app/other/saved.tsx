import { MapPinned } from 'lucide-react-native';

import { AppHeader, EmptyState } from '@/components';
import { useAppSelector } from '@/store/hooks';
import ScreenWrapper from '@/components/ScreenWrapper';

export default function SavedScreen() {
  const saved = useAppSelector((state:any) => state.route.savedLocations);

  return (
    <ScreenWrapper>
      <AppHeader title="Saved places" subtitle="Home, work, campus, terminals, and frequent destinations." showActions={false} />
      {saved.length === 0 ? (
        <EmptyState title="No saved places yet" message="Save destinations from search results for faster route planning." icon={MapPinned} />
      ) : null}
    </ScreenWrapper>
  );
}
