import { dehydrate, Hydrate } from '@tanstack/react-query';
import getQueryClient from '@/app/getQueryClient';
import { fetchAsteroids } from '@/libs/clientApi';
import AsteroidsList from '../asteroidsList';

async function HydratedAsteroidsData() {
  const queryClient = getQueryClient();
  await queryClient.prefetchInfiniteQuery(['asteroids'], fetchAsteroids);
  const dehydratedState = dehydrate(queryClient);
  return (
    <Hydrate state={dehydratedState}>
      <AsteroidsList />
    </Hydrate>
  );
}

export default HydratedAsteroidsData;
