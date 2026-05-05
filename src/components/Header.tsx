'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Header.module.css';

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Zamknij menu przy zmianie strony
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Zablokuj scroll gdy menu otwarte
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  if (pathname.startsWith('/studio')) {
    return null;
  }

  return (
    <header className={styles.header}>
      <div className={`container ${styles.nav}`}>
        <Link href="/" className={styles.logo}>
          <img src="/logo.png" alt="MACMAS Logo" className={styles.logoImage} />
        </Link>
        
        <button 
          className={`${styles.hamburger} ${isOpen ? styles.active : ''}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav className={`${styles.navLinks} ${isOpen ? styles.navActive : ''}`}>
          <Link href="/" className={styles.navLink}>Start</Link>
          <Link href="/#uslugi" className={styles.navLink}>Usługi</Link>
          <Link href="/portfolio" className={styles.navLink}>Portfolio</Link>
          <Link href="/o-mnie" className={styles.navLink}>O mnie</Link>
          <Link href="/#kontakt" className={styles.navLink}>Kontakt</Link>
        </nav>
      </div>
    </header>
  );
}
