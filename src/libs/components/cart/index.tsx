'use client';
import React from 'react';
import { Button } from '..';
import Link from 'next/link';
import { useAsteroidCart } from '@/libs/store';
import styles from './cart.module.scss';

function Cart() {
  const ItemsInCartLength = useAsteroidCart((state) => state.asteroids.length);
  return (
    <div className={styles.cart}>
      <div className={styles.text}>
        <p className={styles.text__title}>Корзина</p>
        <p className={styles.text__length}>{`${ItemsInCartLength} астеройда`}</p>
      </div>
      <Link href="/cart" passHref legacyBehavior>
        <Button className={styles.cart__button}>Отправить</Button>
      </Link>
    </div>
  );
}

export default Cart;
