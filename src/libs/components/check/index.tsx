'use client';
import React from 'react';
import { useAsteroidCart } from '@/libs/store';
import styles from './check.module.scss';
import Asteroid from '../asteroidListItem';

function Check() {
  const { asteroids, metric, reset } = useAsteroidCart(
    (state) => ({ asteroids: state.asteroids, metric: state.metric, reset: state.reset }),
    () => true
  );

  React.useEffect(() => {
    reset();
  }, []);

  return (
    <div className={styles.check}>
      <p className={styles.check__title}>Заказ отправлен</p>
      <div className={styles.check__list}>
        {asteroids.map((asteroid) => (
          <Asteroid key={asteroid.id} type="check" metric={metric} {...asteroid} />
        ))}
      </div>
    </div>
  );
}

export default Check;
