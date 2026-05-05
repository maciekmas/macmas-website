import styles from '../page.module.css';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import { PortableText } from '@portabletext/react';

const ABOUT_QUERY = `*[_type == "about"][0] {
  title,
  content,
  image
}`;

export default async function AboutPage() {
  const about = await client.fetch(ABOUT_QUERY);

  if (!about) {
    return (
      <main className={styles.main} style={{ paddingTop: '150px' }}>
        <div className="container">
          <h1>O mnie</h1>
          <p>Treść w przygotowaniu. Zapraszamy wkrótce!</p>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.main} style={{ paddingTop: '150px' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: about.image ? '1fr 1fr' : '1fr', gap: '4rem', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: '3.5rem', marginBottom: '2rem' }}>{about.title}</h1>
            <div className="glass" style={{ padding: '2rem', borderRadius: '20px', fontSize: '1.1rem', lineHeight: '1.8', color: 'rgba(255,255,255,0.8)' }}>
              <PortableText value={about.content} />
            </div>
          </div>
          
          {about.image && (
            <div style={{ position: 'relative', borderRadius: '30px', overflow: 'hidden', boxShadow: '0 0 50px rgba(211,0,0,0.2)' }}>
              <img 
                src={urlFor(about.image).width(800).url()} 
                alt="Maciek Masłowski" 
                style={{ width: '100%', display: 'block' }} 
              />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
