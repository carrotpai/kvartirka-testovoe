import { BASE_URL } from '@/libs/contants';
import { format } from 'date-fns';

export const fetchAsteroids = async ({ pageParam = 0 }) => {
  const res = await fetch(
    `${BASE_URL}/api/asteroids?start_date=${format(new Date(), 'yyyy-MM-dd')}&page=${pageParam}`
  );
  return res.json();
};
