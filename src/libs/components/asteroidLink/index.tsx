import React from 'react';
import styles from './asteroidLink.module.scss';

interface AsteroidLinkProps {
  asteroidName: string;
  diameter: number;
  onClick?: () => void;
  href?: string;
}

const AsteroidLink = React.forwardRef<HTMLDivElement, AsteroidLinkProps>(function AsteroidLink(
  { asteroidName, diameter, onClick, href },
  ref
) {
  return (
    <div ref={ref} onClick={onClick} className="info__other">
      <div className={styles['info__other-stats']}>
        <a href={href} className={styles.info__name}>
          {asteroidName}
        </a>
        <p className={styles.info__diameter}>{`Ø ${Math.floor(diameter)} м`}</p>
      </div>
    </div>
  );
});

export default AsteroidLink;
