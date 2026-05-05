import styles from './project.module.css';
import Link from 'next/link';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import { PortableText } from '@portabletext/react';
import { notFound } from 'next/navigation';

export const revalidate = 60;

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const query = `*[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    url,
    framework,
    coverImage,
    gallery,
    description
  }`;

  const project = await client.fetch(query, { slug: params.slug });

  if (!project) {
    // If we're testing with mock slugs that don't exist in Sanity yet:
    if (['zestwaterforlife', 'ptpiree', 'nierafinowane', 'motobirds'].includes(params.slug)) {
      return <MockProjectPage slug={params.slug} />;
    }
    notFound();
  }

  // Helper to get nice framework names
  const frameworkNames: Record<string, string> = {
    'wp-blocks': 'WordPress (Gutenberg)',
    'elementor': 'WordPress (Elementor)',
    'divi': 'WordPress (Divi)',
    'prestashop': 'PrestaShop',
    'shopify': 'Shopify',
    'webflow': 'Webflow',
    'nextjs': 'Next.js / React',
    'custom': 'Custom HTML/CSS/JS'
  };

  const frameworkLabel = project.framework ? frameworkNames[project.framework] || project.framework : 'Inne / Nie podano';

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <div className={`container ${styles.nav}`}>
          <Link href="/" className={styles.logo}>
            <img src="/logo.png" alt="MACMAS Logo" style={{ height: '40px', width: 'auto', display: 'block' }} />
          </Link>
          <nav>
            <Link href="/portfolio" className={styles.navLink}>Wróć do Portfolio</Link>
          </nav>
        </div>
      </header>

      <div className="container">
        <div className={styles.projectHeader}>
          <h1 className={styles.projectTitle}>{project.title}</h1>
          <div className={styles.metaInfo}>
            <div className={styles.metaItem}>
              <span>Technologia:</span> {frameworkLabel}
            </div>
            {project.url && (
              <div className={styles.metaItem}>
                <span>URL:</span> <a href={project.url} target="_blank" rel="noopener noreferrer">{new URL(project.url).hostname}</a>
              </div>
            )}
          </div>
        </div>

        <div className={styles.projectContent}>
          {/* Lewa kolumna: Zrzut ekranu lub Galeria */}
          <div>
            {project.gallery && project.gallery.length > 0 ? (
              <div className={styles.gallery}>
                {project.gallery.map((img: any, idx: number) => (
                  <a 
                    key={idx} 
                    href={urlFor(img).url()} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={styles.galleryItem}
                    title="Kliknij, aby powiększyć (Popup)"
                  >
                    <img 
                      src={urlFor(img).width(1200).url()} 
                      alt={`Zrzut ekranu ${idx + 1}`} 
                      className={styles.galleryImage} 
                    />
                  </a>
                ))}
              </div>
            ) : project.coverImage ? (
              <div className={styles.screenshotContainer} title="Najedź myszką, aby przescrollować stronę w dół">
                <img 
                  src={urlFor(project.coverImage).width(1200).url()} 
                  alt={project.title} 
                  className={styles.screenshotImage} 
                />
              </div>
            ) : (
              <div className={styles.screenshotContainer} style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                Brak zrzutów ekranu
              </div>
            )}
          </div>

          {/* Prawa kolumna: Opis i Link */}
          <div className={styles.sidebar}>
            {project.description && (
              <div className={styles.description}>
                <PortableText value={project.description} />
              </div>
            )}
            
            {project.url && (
              <a href={project.url} target="_blank" rel="noopener noreferrer" className={styles.visitBtn}>
                Odwiedź stronę na żywo
              </a>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

// Mock fallback na czas zanim klient uzupełni Sanity
function MockProjectPage({ slug }: { slug: string }) {
  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <div className={`container ${styles.nav}`}>
          <Link href="/" className={styles.logo}>
            <img src="/logo.png" alt="MACMAS Logo" style={{ height: '40px', width: 'auto', display: 'block' }} />
          </Link>
          <nav>
            <Link href="/portfolio" className={styles.navLink}>Wróć do Portfolio</Link>
          </nav>
        </div>
      </header>

      <div className="container">
        <div className={styles.projectHeader}>
          <h1 className={styles.projectTitle}>Projekt: {slug}</h1>
          <div className={styles.metaInfo}>
            <div className={styles.metaItem}><span>Technologia:</span> WordPress</div>
          </div>
        </div>

        <div className={styles.projectContent}>
          <div className={styles.screenshotContainer}>
             <div style={{height: '2000px', background: 'linear-gradient(#111, #333)', display: 'flex', justifyContent: 'center', paddingTop: '100px', color: '#666'}}>
                Tu pojawi się długi zrzut ekranu (najedź myszką aby zjechać w dół)
             </div>
          </div>

          <div className={styles.sidebar}>
            <div className={styles.description}>
              <p>Przykładowy opis projektu zanim zostanie dodany w Sanity. Ten projekt używa technologii WordPress i został stworzony z dbałością o każdy detal.</p>
            </div>
            <a href="#" className={styles.visitBtn}>Odwiedź stronę na żywo</a>
          </div>
        </div>
      </div>
    </main>
  );
}
