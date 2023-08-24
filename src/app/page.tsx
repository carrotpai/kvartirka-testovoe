import { Cart, HydratedAsteroidsList } from '@/libs/components';
import styles from './page.module.scss';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Main page',
  description: 'some desc for seo',
};

export default function Home() {
  return (
    <>
      <div>
        <p className={styles.title}>Ближайшие подлёты астероидов</p>
        <HydratedAsteroidsList />
      </div>
      <div>
        <Cart />
      </div>
    </>
  );
}
