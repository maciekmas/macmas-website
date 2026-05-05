import styles from './page.module.css';
import Link from 'next/link';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';

// GROQ queries
const SERVICES_QUERY = `*[_type == "service"] | order(order asc) {
  _id,
  title,
  description,
  icon
}`;

const PORTFOLIO_QUERY = `*[_type == "project"] | order(order asc)[0...4] {
  _id,
  title,
  slug,
  coverImage
}`;

export const revalidate = 60; // Revalidate every 60 seconds

export default async function Home() {
  const [servicesData, portfolioData] = await Promise.all([
    client.fetch(SERVICES_QUERY),
    client.fetch(PORTFOLIO_QUERY)
  ]);

  // Fallback to static mock data if CMS is empty
  const services = servicesData.length > 0 ? servicesData : [
    {
      _id: '1',
      title: "Obsługa stron",
      description: "Kompleksowa opieka nad Twoją stroną internetową. Aktualizacje, kopie zapasowe, monitorowanie działania i gwarancja stabilności.",
      icon: "⚙️"
    },
    {
      _id: '2',
      title: "Naprawa po włamaniach",
      description: "Szybkie przywracanie zainfekowanych stron do działania. Czyszczenie złośliwego kodu i wdrażanie zaawansowanych zabezpieczeń.",
      icon: "🛡️"
    },
    {
      _id: '3',
      title: "Modyfikacje stron",
      description: "Rozbudowa istniejących witryn o nowe funkcjonalności, przebudowa struktury oraz optymalizacja pod kątem UX i wydajności.",
      icon: "🔧"
    }
  ];

  const portfolio = portfolioData.length > 0 ? portfolioData : [
    { _id: '1', title: "zestwaterforlife.com", slug: { current: "zestwaterforlife" } },
    { _id: '2', title: "ptpiree.pl", slug: { current: "ptpiree" } },
    { _id: '3', title: "nierafinowane.pl", slug: { current: "nierafinowane" } },
    { _id: '4', title: "motobirds.com", slug: { current: "motobirds" } }
  ];

  return (
    <main className={styles.main}>
      {/* Header */}
      <header className={`${styles.header} ${styles.headerScrolled}`}>
        <div className={`container ${styles.nav}`}>
          <img src="/logo.png" alt="MACMAS Logo" style={{ height: '40px', width: 'auto' }} />
          <nav className={styles.navLinks}>
            <a href="#uslugi" className={styles.navLink}>Usługi</a>
            <a href="#portfolio" className={styles.navLink}>Portfolio</a>
            <a href="#kontakt" className={styles.navLink}>Kontakt</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroBackground}>
          <div className={styles.gridOverlay}></div>
          <div className={`${styles.orb} ${styles.orb1}`}></div>
          <div className={`${styles.orb} ${styles.orb2}`}></div>
          <div className={`${styles.orb} ${styles.orb3}`}></div>
        </div>
        <div className={`container ${styles.heroContent}`}>
          <h1 className={styles.heroTitle}>
            Web Designer <br />
            <span className="text-gradient">& Art Director</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Tworzę, zabezpieczam i rozwijam strony internetowe z myślą o najwyższej jakości.
          </p>
          <div className={styles.heroButtons}>
            <a href="#uslugi" className="btn">Zobacz usługi</a>
            <a href="#portfolio" className="btn btn-outline">Moje portfolio</a>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="uslugi" className={styles.services}>
        <div className="container">
          <h2>Moje <span>Usługi</span></h2>
          <div className={styles.servicesGrid}>
            {services.map((service: any) => (
              <div key={service._id} className={`${styles.serviceCard} glass`}>
                <div className={styles.serviceIcon}>{service.icon || '📌'}</div>
                <h3 className={styles.serviceTitle}>{service.title}</h3>
                <p className={styles.serviceDesc}>{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className={styles.portfolio}>
        <div className="container">
          <h2>Wybrane <span>Projekty</span></h2>
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
          <div style={{ textAlign: 'center', marginTop: '4rem' }}>
            <Link href="/portfolio" className="btn btn-outline">Zobacz całe portfolio</Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="kontakt" className={styles.contact}>
        <div className="container">
          <h2>Bądźmy w <span>Kontakcie</span></h2>
          <div className={styles.contactContent}>
            <p className={styles.contactText}>
              Szukasz wsparcia przy swojej stronie internetowej? Potrzebujesz modyfikacji, naprawy po włamaniu lub stałej obsługi? Napisz do mnie.
            </p>
            <div className={styles.contactInfo}>
              <a href="mailto:design@macmas.pl" className={`${styles.contactItem} glass`} style={{ padding: '1.5rem', borderRadius: '12px' }}>
                <span className={styles.contactIcon}>✉️</span>
                <span>design@macmas.pl</span>
              </a>
              <a href="https://www.linkedin.com/in/maciek-mas%C5%82owski/" target="_blank" rel="noopener noreferrer" className={`${styles.contactItem} glass`} style={{ padding: '1.5rem', borderRadius: '12px' }}>
                <span className={styles.contactIcon}>🔗</span>
                <span>LinkedIn / Maciek Masłowski</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className="container">
          <p>&copy; {new Date().getFullYear()} MACMAS Maciek Masłowski. Wszelkie prawa zastrzeżone.</p>
        </div>
      </footer>
    </main>
  );
}
