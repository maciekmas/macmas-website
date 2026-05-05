'use client';

import { useState, useEffect } from 'react';
import { urlFor } from '@/sanity/lib/image';
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
            <img 
              src={urlFor(img).width(1200).url()} 
              alt={`Zrzut ekranu ${idx + 1}`} 
              className={styles.galleryImage} 
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
