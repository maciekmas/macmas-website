'use client'

import dynamic from 'next/dynamic'

// Ładowanie komponentu Studio (który importuje konfigurację Sanity) wyłącznie po stronie klienta
const Studio = dynamic(() => import('./Studio'), { ssr: false })

export default function StudioWrapper() {
  return <Studio />
}
