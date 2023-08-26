import React from 'react';
import { Cart } from '@/libs/components';
import styles from './layout.module.scss';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.page}>
      <div className={styles.page__content}>{children}</div>
      <Cart />
    </div>
  );
}

export default Layout;
