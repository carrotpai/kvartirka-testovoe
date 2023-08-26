import React from 'react';
import { Metadata } from 'next';
import { Check } from '@/libs/components';
import styles from './page.module.scss';

export const metadata: Metadata = {
  title: 'ARMAGEDDON 2023 Cart',
  description: 'some desc for cart seo',
};

function Page() {
  return (
    <div className={styles.page}>
      <Check />
    </div>
  );
}

export default Page;
