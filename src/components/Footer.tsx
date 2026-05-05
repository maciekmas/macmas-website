import { client } from '@/sanity/lib/client';
import styles from '../app/page.module.css';

const SETTINGS_QUERY = `*[_type == "settings"][0] {
  footerText
}`;

export default async function Footer() {
  const settings = await client.fetch(SETTINGS_QUERY);
  const footerText = settings?.footerText || "MACMAS Maciek Masłowski. Wszelkie prawa zastrzeżone.";

  return (
    <footer className={styles.footer}>
      <div className="container">
        <p>&copy; {new Date().getFullYear()} {footerText}</p>
      </div>
    </footer>
  );
}
