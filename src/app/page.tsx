import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroBanner from '@/components/home/HeroBanner';
import CategoryGrid from '@/components/home/CategoryGrid';
import BestSellersSection from '@/components/home/BestSellersSection';
import PromoBanner from '@/components/home/PromoBanner';
import NewArrivalsSection from '@/components/home/NewArrivalsSection';
import FeaturedCollections from '@/components/home/FeaturedCollections';
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

        {/* 5. Shop by Category — Consistent, accurate category cards */}
        <CategoryGrid />

        {/* 6. Best Sellers — Product cards with real images, prices, wishlist, and Add to Cart */}
        <BestSellersSection />

        {/* 7. Promotional Banner for Seasonal Offers (Coupon SHOKHORA10) */}
        <PromoBanner />

        {/* 8. New Arrivals */}
        <NewArrivalsSection />

        {/* 9. Featured Collections */}
        <FeaturedCollections />

        {/* 10. Why Shop With SHOKHORA — Delivery, Secure Payment, Authentic Quality & 7-Day Exchange */}
        <CustomerBenefits />

        {/* 11. Customer Reviews */}
        <Testimonials />

        {/* 12. Newsletter Section */}
        <NewsletterSection />
      </main>

      {/* 12 (cont): Professional Footer */}
      <Footer />
    </>
  );
}
