import styles from '../page.module.css';
import Link from 'next/link';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';

const PORTFOLIO_QUERY = `*[_type == "project"] | order(order asc) {
  _id,
  title,
  slug,
  coverImage
}`;

export const revalidate = 60;

export default async function PortfolioPage() {
  const portfolioData = await client.fetch(PORTFOLIO_QUERY);

  // Mock data fallback
  const portfolio = portfolioData.length > 0 ? portfolioData : [
    { _id: '1', title: "zestwaterforlife.com", slug: { current: "zestwaterforlife" } },
    { _id: '2', title: "ptpiree.pl", slug: { current: "ptpiree" } },
    { _id: '3', title: "nierafinowane.pl", slug: { current: "nierafinowane" } },
    { _id: '4', title: "motobirds.com", slug: { current: "motobirds" } },
    { _id: '5', title: "dobrywet.com", slug: { current: "dobrywet" } },
    { _id: '6', title: "logicai.io", slug: { current: "logicai" } }
  ];

  return (
    <main className={styles.main}>
      <header className={`${styles.header} ${styles.headerScrolled}`}>
        <div className={`container ${styles.nav}`}>
          <Link href="/" className={styles.logo}>
            <img src="/logo.png" alt="MACMAS Logo" style={{ height: '40px', width: 'auto', display: 'block' }} />
          </Link>
          <nav className={styles.navLinks}>
            <Link href="/" className={styles.navLink}>Wróć na stronę główną</Link>
          </nav>
        </div>
      </header>

      <section className={styles.portfolio} style={{ paddingTop: '150px', minHeight: '100vh' }}>
        <div className="container">
          <h2>Wszystkie <span>Projekty</span></h2>
          <p style={{ textAlign: 'center', color: '#a0a0a0', marginBottom: '3rem' }}>
            Poznaj pełną historię moich realizacji
          </p>
          
          <div className={styles.portfolioGrid}>
            {portfolio.map((item: any) => (
              <Link href={`/portfolio/${item.slug?.current || ''}`} key={item._id} className={styles.portfolioCard}>
                {item.coverImage ? (
                  <img 
                    src={urlFor(item.coverImage).width(800).height(450).url()} 
                    alt={item.title} 
                    className={styles.portfolioImage} 
                  />
                ) : (
                  <div style={{
                    width: '100%', 
                    height: '100%', 
                    backgroundColor: '#111', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    fontSize: '1.2rem',
                    color: '#333'
                  }}>
                    Podgląd niedostępny
                  </div>
                )}
                
                <div className={styles.portfolioOverlay}>
                  <h3 className={styles.portfolioTitle}>{item.title}</h3>
                  <span className={styles.portfolioLink}>Szczegóły projektu →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
