import type { Metadata } from "next";
import { Inter, Outfit, Syne, Montserrat, Playfair_Display, Roboto, Open_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { client } from "@/sanity/lib/client";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const syne = Syne({ subsets: ["latin"], variable: "--font-syne" });
const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const roboto = Roboto({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-roboto" });
const openSans = Open_Sans({ subsets: ["latin"], variable: "--font-open-sans" });

const FONT_QUERY = `*[_type == "settings"][0] { headingFont, bodyFont }`;

export const metadata: Metadata = {
  title: "MACMAS | Portfolio & Usługi IT",
  description: "Profesjonalna obsługa stron, naprawa po włamaniach i modyfikacje stron internetowych. Maciek Masłowski.",
  icons: {
    icon: "/logo.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await client.fetch(FONT_QUERY);
  
  const headingFontClass = {
    'Syne': syne.variable,
    'Outfit': outfit.variable,
    'Montserrat': montserrat.variable,
    'Playfair_Display': playfair.variable,
    'Inter': inter.variable
  }[settings?.headingFont as string] || syne.variable;

  const bodyFontClass = {
    'Inter': inter.variable,
    'Outfit': outfit.variable,
    'Roboto': roboto.variable,
    'Open_Sans': openSans.variable
  }[settings?.bodyFont as string] || inter.variable;

  return (
    <html
      lang="pl"
      className={`${headingFontClass} ${bodyFontClass} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" style={{ 
        fontFamily: `var(--font-${(settings?.bodyFont || 'inter').toLowerCase().replace('_', '-')})`
      }}>
        <style dangerouslySetInnerHTML={{ __html: `
          h1, h2, h3, h4, h5, h6 { 
            font-family: var(--font-${(settings?.headingFont || 'syne').toLowerCase().replace('_', '-')}), sans-serif !important; 
          }
        `}} />
        <Header />
        <div style={{ flex: 1 }}>{children}</div>
        <Footer />
      </body>
    </html>
  );
}
