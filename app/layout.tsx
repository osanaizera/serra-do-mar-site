import './globals.css';
import type { Metadata } from 'next';
import Header from './components/Header';
import Footer from './components/Footer';

export const metadata: Metadata = {
  title: 'Serra do Mar Engenharia | Geotecnia & Infraestrutura',
  description: 'Geotecnia e infraestrutura que dão base segura para projetos em expansão. Decisões com previsibilidade e autoridade técnica.',
  keywords: ['geotecnia', 'infraestrutura', 'engenharia geotécnica', 'fundações', 'sondagem SPT', 'Serra do Mar Engenharia'],
  robots: { index: true, follow: true },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://serradomar-engenharia.vercel.app'),
  openGraph: {
    type: 'website',
    url: '/',
    title: 'Serra do Mar Engenharia | Geotecnia & Infraestrutura',
    description: 'A base técnica para expansões seguras em infraestrutura e geotecnia.',
    images: ['/assets/hero.jpg'],
    locale: 'pt_BR',
    siteName: 'Serra do Mar Engenharia',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Serra do Mar Engenharia | Geotecnia & Infraestrutura',
    description: 'A base técnica para expansões seguras em infraestrutura e geotecnia.',
    images: ['/assets/hero.jpg'],
  },
  icons: {
    icon: '/assets/logo-transparente.png',
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://serradomar-engenharia.vercel.app/#organization",
      "name": "Serra do Mar Engenharia",
      "description": "Engenharia geotécnica e infraestrutura para projetos de alta criticidade.",
      "url": "https://serradomar-engenharia.vercel.app",
      "logo": "https://serradomar-engenharia.vercel.app/assets/logo.jpg",
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://serradomar-engenharia.vercel.app/#localbusiness",
      "name": "Serra do Mar Engenharia",
      "description": "Geotecnia e infraestrutura para expansões seguras.",
      "url": "https://serradomar-engenharia.vercel.app",
      "logo": "https://serradomar-engenharia.vercel.app/assets/logo.jpg",
      "image": "https://serradomar-engenharia.vercel.app/assets/hero.jpg",
      "priceRange": "$$",
      "telephone": "+55-00-00000-0000",
      "email": "contato@serradomar.com.br",
      "address": { "@type": "PostalAddress", "addressCountry": "BR" },
      "openingHours": "Mo-Fr 08:00-18:00",
      "member": [
        { "@type": "Person", "name": "Cássio Hister Bellan", "jobTitle": "Diretor Técnico" },
        { "@type": "Person", "name": "Lucas França", "jobTitle": "Comunicação e Coordenação" },
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://serradomar-engenharia.vercel.app/#website",
      "url": "https://serradomar-engenharia.vercel.app",
      "name": "Serra do Mar Engenharia",
      "publisher": { "@id": "https://serradomar-engenharia.vercel.app/#organization" },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800&family=Inter:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
