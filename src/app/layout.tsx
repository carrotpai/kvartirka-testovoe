import React from 'react';
import './globals.css';
import type { Metadata } from 'next';
import { Passion_One } from 'next/font/google';
import localFont from 'next/font/local';
import Image from 'next/image';
import EarthImage from '@/../assets/Earth.jpg';
import EarthImageLow from '@/../assets/low/Earth-low.jpg';
import Providers from '@/libs/components/providers';
import styles from './layout.module.scss';

const PassionOneFont = Passion_One({
  weight: ['400', '700'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--passion-one-font',
});

const HelveticaFont = localFont({
  src: [
    { path: '../vendor/fonts/helvetica/HelveticaRegular.woff', weight: '400', style: 'normal' },
    { path: '../vendor/fonts/helvetica/HelveticaBold.woff', weight: '700', style: 'normal' },
    { path: '../vendor/fonts/helvetica/HelveticaLight.woff', weight: '300', style: 'normal' },
  ],
  variable: '--helvetica-font',
});

export const metadata: Metadata = {
  title: 'ARMAGEDDON 2023',
  description: 'some desc for seo',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${PassionOneFont.variable} ${HelveticaFont.variable} ${HelveticaFont.style} ${styles.layout}`}>
        <div className={styles.title}>
          <p className={styles.title__logo}>ARMAGEDDON 2023</p>
          <p className={styles.title__text}>
            ООО “Команда им. Б. Уиллиса”. Взрываем астероиды с 1998 года.
          </p>
        </div>
        <main>
          <section className={styles.page}>
            <Providers>{children}</Providers>
          </section>
        </main>
        <Image
          className={styles.layout__earth}
          alt="Planet Earth from space"
          height={650}
          src={EarthImage}
          placeholder="blur"
          blurDataURL={EarthImageLow.src}></Image>
      </body>
    </html>
  );
}
