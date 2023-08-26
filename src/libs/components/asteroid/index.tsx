'use client';
import React from 'react';
import { format, parse } from 'date-fns';
import { TailSpin } from 'react-loader-spinner';
import { InfiniteData, useQueryClient } from '@tanstack/react-query';
import { enUS } from 'date-fns/locale';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import AsteroidImage from '@/../assets/asteroid.png';
import { fetchOneAsteroidById } from '@/libs/clientApi';
import { useAsteroidCart } from '@/libs/store';
import { AsteroidDataType, AsteroidsListDataType } from '@/libs/types';
import styles from './asteroid.module.scss';
import Button from '../button';

const PlanetsDict = {
  Earth: 'Земли',
  Mercury: 'Меркурия',
  Venus: 'Венеры',
  Mars: 'Марса',
  Jupiter: 'Юпитера',
  Satur: 'Сатурна',
  Uranus: 'Урана',
  Neptune: 'Нептуна',
} as const;

type PlanetDictKeys = keyof typeof PlanetsDict;

function Asteroid({ id }: { id: string }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [asteroid, setAsteroid] = React.useState<AsteroidDataType | undefined>(undefined);
  const addToCart = useAsteroidCart((state) => state.addAsteroid);

  React.useEffect(() => {
    const fetchAsteroid = async () => {
      const data = await fetchOneAsteroidById(id);
      return data;
    };
    const getAsteroid = async () => {
      const dataFromQuery = queryClient.getQueryData<InfiniteData<AsteroidsListDataType>>([
        'asteroids',
      ]);
      let asteroid: AsteroidDataType | undefined;
      if (!dataFromQuery) {
        asteroid = await fetchAsteroid();
        setAsteroid(asteroid);
        return;
      }
      for (let i = 0; i < dataFromQuery?.pages.length; i++) {
        asteroid = dataFromQuery.pages[i].asteroids.find((item) => item.id === id);
        if (asteroid) break;
      }
      if (!asteroid) {
        asteroid = await fetchAsteroid();
        setAsteroid(asteroid);
        return;
      } else {
        setAsteroid(asteroid);
      }
    };

    getAsteroid();
  }, []);

  if (!asteroid) {
    return (
      <TailSpin
        height="80"
        width="80"
        color="var(--orange-base)"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperClass={styles.loader}
        visible={true}
      />
    );
  }

  return (
    <div className={styles.asteroid}>
      <div className={styles.head}>
        <p className={styles.head__title}>{asteroid.name}</p>
        {asteroid.isHazard && <p className={styles.head__hazard}>&#9888;&#65039; Опасен</p>}
      </div>
      <div className={styles.asteroid__content}>
        <div className={styles.velocity}>
          <p className={styles.velocity__title}>Скорость</p>
          <p className={styles.velocity__text}>{`${Math.floor(+asteroid.velocity.sec)} км/с`}</p>
          <p className={styles.velocity__text}>{`${Math.floor(+asteroid.velocity.hour)} км/ч`}</p>
        </div>
        <div className={styles.image}>
          <Image alt={`asteroid ${asteroid.name}`} src={AsteroidImage} height={64} />
          <span className={styles.image__diameter}>{`Ø ${Math.floor(asteroid.diameter)} м`}</span>
        </div>
        <div className={styles.distance}>
          <p className={styles.distance__title}>Расстояние</p>
          <p className={styles.distance__text}>{`${Math.floor(+asteroid.missDistance.km)} км`}</p>
          <p className={styles.distance__text}>{`${Math.floor(
            +asteroid.missDistance.lunar
          )} лунных орбит`}</p>
        </div>
      </div>
      <div className={styles.bottom}>
        <p className={styles.bottom__orbiting}>{`Вращается вокруг ${
          PlanetsDict[asteroid.orbitingBody as PlanetDictKeys]
        }`}</p>
        <p className={styles.bottom__text}>Точная дата максимального приблежения</p>
        <p className={styles.bottom__date}>
          {format(
            parse(asteroid.fullApproachDate, 'yyyy-MMM-dd H:mm', new Date(), { locale: enUS }),
            'd MMMM yyyy HH:mm'
          )}
        </p>
      </div>
      <div className={styles.buttons}>
        <Button
          className={styles.buttons__back}
          onClick={() => {
            router.push('/list');
          }}>
          Назад
        </Button>
        <Button
          onClick={() => {
            addToCart(asteroid);
          }}
          className={styles.buttons__order}>
          Заказать
        </Button>
      </div>
    </div>
  );
}

export default Asteroid;
