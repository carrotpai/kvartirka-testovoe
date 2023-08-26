import React from 'react';
import { Metadata } from 'next';
import { Asteroid } from '@/libs/components';
import styles from './page.module.scss';

export const metadata: Metadata = {
  title: 'Some Asteroid',
  description: 'some desc for seo',
};

function page({ params }: { params: { id: string } }) {
  return (
    <div className={styles.page}>
      <Asteroid id={params.id} />
    </div>
  );
}

export default page;
