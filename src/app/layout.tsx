import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/lib/context/AuthContext';
import { CartProvider } from '@/lib/context/CartContext';
import { WishlistProvider } from '@/lib/context/WishlistContext';
import CartDrawer from '@/components/cart/CartDrawer';

export const metadata: Metadata = {
  title: 'SHOKHORA (শখোরা) — Your Choice, Our Passion',
  description:
    'Premium Bangladeshi multi-category lifestyle brand offering fashion, cosmetics, hair accessories, scrunchies, jewellery, and curated gifts.',
  keywords: [
    'Shokhora',
    'Bangladeshi Lifestyle Brand',
    'Silk Scrunchies Bangladesh',
    'Fashion Clothing Dhaka',
    'Kids Hair Accessories',
    'Organic Cosmetics BD',
    'Handmade Jewellery Bangladesh',
  ],
  authors: [{ name: 'SHOKHORA' }],
  metadataBase: new URL('https://shokhora.com'),
  openGraph: {
    title: 'SHOKHORA (শখোরা) — Your Choice, Our Passion',
    description: 'Modern Bangladeshi lifestyle brand offering curated everyday elegance.',
    url: 'https://shokhora.com',
    siteName: 'SHOKHORA',
    images: [
      {
        url: '/images/Cover Photo.jpg',
        width: 1200,
        height: 630,
        alt: 'SHOKHORA Lifestyle',
      },
    ],
    locale: 'en_BD',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/images/Logo-01.png" type="image/png" />
      </head>
      <body className="min-h-screen flex flex-col bg-ivory-100 text-charcoal-900 selection:bg-taupe-200 selection:text-charcoal-950">
        <AuthProvider>
          <WishlistProvider>
            <CartProvider>
              {children}
              <CartDrawer />
            </CartProvider>
          </WishlistProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
