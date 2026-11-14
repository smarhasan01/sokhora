import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroBanner from '@/components/home/HeroBanner';
import CategoryGrid from '@/components/home/CategoryGrid';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import CustomerBenefits from '@/components/home/CustomerBenefits';
import Testimonials from '@/components/home/Testimonials';
import NewsletterSection from '@/components/home/NewsletterSection';

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <HeroBanner />
        <CategoryGrid />
        <FeaturedProducts />
        <CustomerBenefits />
        <Testimonials />
        <NewsletterSection />
      </main>
      <Footer />
    </>
  );
}
