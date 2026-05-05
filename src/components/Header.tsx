'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Header.module.css';

export default function Header() {
  const pathname = usePathname();

  // Ukryj header na stronach Sanity Studio
  if (pathname.startsWith('/studio')) {
    return null;
  }

  return (
    <header className={styles.header}>
      <div className={`container ${styles.nav}`}>
        <Link href="/" className={styles.logo}>
          <img src="/logo.png" alt="MACMAS Logo" style={{ height: '40px', width: 'auto' }} />
        </Link>
        <nav className={styles.navLinks}>
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
