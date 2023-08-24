'use client';
import React from 'react';
import { useInView } from 'react-intersection-observer';
import { TailSpin } from 'react-loader-spinner';
import { useInfiniteQuery } from '@tanstack/react-query';
import { shallow } from 'zustand/shallow';
import { fetchAsteroids } from '@/libs/clientApi';
import { useAsteroidCart } from '@/libs/store';
import { AsteroidsListDataType } from '@/libs/types';
import styles from './asteroidsList.module.scss';
import Asteroid from '../asteroidListItem';

function AsteroidsList() {
  const { asteroidsInCart, metric, setMetric } = useAsteroidCart(
    (state) => ({
      asteroidsInCart: state.asteroids,
      metric: state.metric,
      setMetric: state.setMetric,
    }),
    shallow
  );

  const { ref, inView } = useInView({
    threshold: 0,
  });

  const {
    data: asteroids,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteQuery<AsteroidsListDataType>({
    queryKey: ['asteroids'],
    queryFn: fetchAsteroids,
    getNextPageParam: (lastPage, _) => lastPage.nextPage,
  });

  React.useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView]);

  return (
    <div>
      <div className="list__head">
        <div className={styles.tab}>
          <button
            onClick={() => {
              setMetric('km');
            }}
            type="button"
            className={`${styles.tab__button} ${metric === 'km' && styles.tab__button_active}`}>
            В километрах
          </button>
          <div className={styles.tab__divider}></div>
          <button
            onClick={() => {
              setMetric('lunar');
            }}
            type="button"
            className={`${styles.tab__button} ${metric === 'lunar' && styles.tab__button_active}`}>
            в лунных орбитах
          </button>
        </div>
      </div>
      <div className={styles.list__content}>
        {asteroids?.pages.map((page, i) => (
          <React.Fragment key={i}>
            {page.asteroids.map((asteroid) => (
              <Asteroid
                type="store"
                key={asteroid.id}
                {...asteroid}
                metric={metric}
                isInCart={!!asteroidsInCart.find((item) => item.id === asteroid.id)}
              />
            ))}
          </React.Fragment>
        ))}
        <div ref={ref} id="load-more"></div>
      </div>
      <div>
        <TailSpin
          height="80"
          width="80"
          color="var(--orange-base)"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperClass={styles.loader}
          visible={isFetchingNextPage}
        />
      </div>
    </div>
  );
}

export default AsteroidsList;
