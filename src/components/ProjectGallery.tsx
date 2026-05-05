'use client';

import { useState, useEffect } from 'react';
import { urlFor } from '@/sanity/lib/image';
import Image from 'next/image';
import styles from '../app/portfolio/[slug]/project.module.css';

interface ProjectGalleryProps {
  gallery: any[];
}

export default function ProjectGallery({ gallery }: ProjectGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Zablokuj scrollowanie tła gdy modal jest otwarty
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedImage]);

  return (
    <>
      <div className={styles.gallery}>
        {gallery.map((img: any, idx: number) => (
          <div 
            key={idx} 
            className={styles.galleryItem}
            onClick={() => setSelectedImage(urlFor(img).url())}
            title="Kliknij, aby powiększyć"
          >
            <Image 
              src={urlFor(img).width(1200).url()} 
              alt={`Zrzut ekranu ${idx + 1}`} 
              className={styles.galleryImage}
              width={1200}
              height={800} // This is just a base height, styles handle it
              style={{ height: 'auto' }}
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {/* Modal / Lightbox */}
      {selectedImage && (
        <div className={styles.modalOverlay} onClick={() => setSelectedImage(null)}>
          <button className={styles.closeBtn} onClick={() => setSelectedImage(null)}>×</button>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <img 
              src={selectedImage} 
              alt="Powiększony zrzut ekranu" 
              className={styles.modalImage} 
            />
          </div>
        </div>
      )}
    </>
  );
}
