import { format, parse, setDefaultOptions } from 'date-fns';
import { ru } from 'date-fns/locale';
import Image from 'next/image';
import Link from 'next/link';
import AsteroidImage from '@/../assets/asteroid.png';
import ArrowSvg from '@/../assets/icons/Arrow.svg';
import { useAsteroidCart } from '@/libs/store';
import { AsteroidDataType } from '@/libs/types';
import styles from './asteroidListItem.module.scss';
import { Button } from '..';
import AsteroidLink from '../asteroidLink';

setDefaultOptions({ locale: ru });

interface AsteroidListItemProps extends AsteroidDataType {
  metric: 'km' | 'lunar';
  isInCart?: boolean;
  type: 'store' | 'check';
}

function Asteroid({
  id,
  isInCart,
  name,
  approachDate,
  diameter,
  missDistance,
  isHazard,
  metric,
  velocity,
  fullApproachDate,
  orbitingBody,
  type,
}: AsteroidListItemProps) {
  const addToCart = useAsteroidCart((state) => state.addAsteroid);
  const distanceKm = Math.floor(+missDistance.km).toString();
  let formattedDistanceKm = distanceKm.slice(-3);
  for (let i = 3; i <= distanceKm.length; i += 3) {
    formattedDistanceKm = formattedDistanceKm.concat(` ${distanceKm.slice(-1 * (i + 3), -1 * i)}`);
  }
  let asteroidImageSize: { width?: number; height?: number } = { width: 22, height: 24 };
  if (diameter > 200) {
    asteroidImageSize = { height: 40 };
  }

  return (
    <div className={styles.asteroid}>
      <p className={styles['asteroid__close-date']}>
        {format(parse(approachDate, 'yyyy-MM-dd', new Date()), 'd MMMM yyyy')}
      </p>
      <div className={styles.info}>
        <div className={styles.info__distance}>
          <p>
            {
              {
                km: `${formattedDistanceKm.split(' ').reverse().join(' ')} км`,
                lunar: `${Math.floor(+missDistance.lunar)} лунных орбит`,
              }[metric]
            }
          </p>
          <ArrowSvg />
        </div>
        <Image
          className="asteroid__image_default"
          alt="asteroid"
          src={AsteroidImage}
          width={asteroidImageSize.width}
          height={asteroidImageSize.height}
        />
        <Link href={`/asteroid/${id}`} passHref legacyBehavior>
          <AsteroidLink asteroidName={name} diameter={diameter} />
        </Link>
      </div>
      <div className={styles['asteroid__bottom-part']}>
        {type === 'store' && (
          <Button
            onClick={() => {
              addToCart({
                id,
                name,
                approachDate,
                diameter,
                missDistance,
                isHazard,
                velocity,
                fullApproachDate,
                orbitingBody,
              });
            }}
            className={`${styles.order} ${isInCart && styles.order_active}`}>
            {isInCart ? 'В Корзине' : 'Заказать'}
          </Button>
        )}

        <div className={styles.hazard}>{isHazard && <p>&#9888;&#65039; Опасен</p>}</div>
      </div>
    </div>
  );
}

export default Asteroid;
