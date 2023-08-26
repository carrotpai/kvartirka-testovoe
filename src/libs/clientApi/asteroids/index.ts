import { BASE_URL } from '@/libs/contants';
import { AsteroidDataType } from '@/libs/types';
import { format } from 'date-fns';

export const fetchAsteroids = async ({ pageParam = 0 }) => {
  const res = await fetch(
    `${BASE_URL}/api/asteroids?start_date=${format(new Date(), 'yyyy-MM-dd')}&page=${pageParam}`
  );
  return res.json();
};

export const fetchOneAsteroidById = async (id: string) => {
  const res = await fetch(`${BASE_URL}/api/asteroid/${id}`);
  return res.json() as Promise<AsteroidDataType>;
};
