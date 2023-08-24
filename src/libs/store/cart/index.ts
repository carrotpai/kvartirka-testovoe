import { createWithEqualityFn } from 'zustand/traditional';
import { AsteroidListItemDataType } from '@/libs/types';
import { produce } from 'immer';

interface UseAsteroidCartType {
  asteroids: Array<AsteroidListItemDataType>;
  metric: 'km' | 'lunar';
  setMetric: (metric: 'km' | 'lunar') => void;
  addAsteroid: (item: AsteroidListItemDataType) => void;
  reset: () => void;
}

export const useAsteroidCart = createWithEqualityFn<UseAsteroidCartType>(
  (set, get) => ({
    asteroids: [],
    metric: 'km',
    addAsteroid: (item) => {
      const isAlreadyAdded = !!get().asteroids.find((aster) => aster.id === item.id);
      if (isAlreadyAdded) {
        return;
      }
      return set(
        produce<UseAsteroidCartType>((store) => {
          store.asteroids.push(item);
        })
      );
    },
    setMetric: (metric) =>
      set(
        produce<UseAsteroidCartType>((store) => {
          store.metric = metric;
        })
      ),
    reset: () => set({ asteroids: [] }),
  }),
  Object.is
);
