'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/libs/components';
import { useAsteroidCart } from '@/libs/store';
import styles from './check.module.scss';
import Asteroid from '../asteroidListItem';

function Check() {
  const router = useRouter();
  const { asteroids, metric, reset } = useAsteroidCart(
    (state) => ({ asteroids: state.asteroids, metric: state.metric, reset: state.reset }),
    () => true
  );

  React.useEffect(() => {
    reset();
  }, []);

  return (
    <div className={styles.check}>
      <p className={styles.check__title}>{asteroids.length ? 'Заказ отправлен!' : 'Пусто!'}</p>
      <div className={styles.check__list}>
        {asteroids.map((asteroid) => (
          <Asteroid key={asteroid.id} type="check" metric={metric} {...asteroid} />
        ))}
      </div>
      <div className={styles.buttons}>
        <Button
          className={styles.buttons__order}
          onClick={() => {
            router.back();
          }}>
          Назад
        </Button>
      </div>
    </div>
  );
}

export default Check;
