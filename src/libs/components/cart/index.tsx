'use client';
import React from 'react';
import Link from 'next/link';
import { useAsteroidCart } from '@/libs/store';
import styles from './cart.module.scss';
import { Button } from '..';

function Cart() {
  const ItemsInCartLength = useAsteroidCart((state) => state.asteroids.length);
  return (
    <div className={styles.cart}>
      <div className={styles.text}>
        <p className={styles.text__title}>Корзина</p>
        <p className={styles.text__length}>{`${ItemsInCartLength} астероида`}</p>
      </div>
      <Link href="/cart" legacyBehavior>
        <Button className={styles.cart__button}>Отправить</Button>
      </Link>
    </div>
  );
}

export default Cart;
