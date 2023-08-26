import { Metadata } from 'next';
import { HydratedAsteroidsList } from '@/libs/components';
import styles from './page.module.scss';

export const metadata: Metadata = {
  title: 'Asteroid list',
  description: 'some desc for seo',
};

export default function Home() {
  return (
    <div className={styles.page}>
      <p className={`${styles.title}`}>Ближайшие подлёты астероидов</p>
      <HydratedAsteroidsList />
    </div>
  );
}
