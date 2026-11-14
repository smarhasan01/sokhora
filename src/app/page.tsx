import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroBanner from '@/components/home/HeroBanner';
import CategoryGrid from '@/components/home/CategoryGrid';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import PromoBanner from '@/components/home/PromoBanner';
import BestSellersSection from '@/components/home/BestSellersSection';
import NewArrivalsSection from '@/components/home/NewArrivalsSection';
import CustomerBenefits from '@/components/home/CustomerBenefits';
import Testimonials from '@/components/home/Testimonials';
import NewsletterSection from '@/components/home/NewsletterSection';

export default function HomePage() {
  return (
    <>
      {/* 1, 2, 3: Slim Announcement Bar, Clean Header with Original Logo & Search, Category Navigation */}
      <Header />

      <main className="flex-1">
        {/* 4. Premium Hero Section with Lifestyle Photograph, Clear Headline & Shopping Buttons */}
        <HeroBanner />

        {/* 5. Shop by Categories — Consistent, accurate category cards */}
        <CategoryGrid />

        {/* 6. Featured Products */}
        <FeaturedProducts />

        {/* 7. Promotional Collection Banner (Seasonal Offer & Code SHOKHORA10) */}
        <PromoBanner />

        {/* 8. Best Sellers */}
        <BestSellersSection />

        {/* 9. New Arrivals */}
        <NewArrivalsSection />

        {/* 10. Brand Story / Why SHOKHORA */}
        <CustomerBenefits />

        {/* Customer Reviews & Testimonials */}
        <Testimonials />

        {/* 11. Newsletter Section */}
        <NewsletterSection />
      </main>

      {/* 12. Professional Footer */}
      <Footer />
    </>
  );
}
