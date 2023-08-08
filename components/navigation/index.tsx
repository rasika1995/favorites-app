"use client"
import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faHeart } from '@fortawesome/free-solid-svg-icons';
import styles from './navigation.module.scss'; // Import your SCSS module

const Navigation: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  const isHomeSelected = pathname === '/';
  const isFavoritesSelected = pathname === '/favorites';

  return (
    <header>
    {/* Top navigation bar for desktop */}
    <nav className={styles['navbar-desktop']}>
      <Link href="/" className={styles['nav-link']}>
        <span className={isHomeSelected ? styles['selected'] : ''}>Home</span>
      </Link>
      <Link href="/favorites" className={styles['nav-link']}>
        <span className={isFavoritesSelected ? styles['selected'] : ''}>Liked</span>
      </Link>
    </nav>
    {/* Bottom tab bar for mobile */}
    <nav className={styles['navbar-mobile']}>
      <Link href="/" className={styles['nav-link']}>
        <FontAwesomeIcon icon={faHome} color={isHomeSelected ? 'yellow' : 'white'} />
      </Link>
      <Link href="/favorites" className={styles['nav-link']}>
        <FontAwesomeIcon icon={faHeart} color={isFavoritesSelected ? 'yellow' : 'white'} />
      </Link>
    </nav>
  </header>
  );
};

export default Navigation;
