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
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#191817]">
      {/* 1, 2, 3: Slim Announcement Bar, Header with Original Logo & Search, Category Navigation */}
      <Header />

      <main className="flex-1">
        {/* 4. Editorial Magazine Hero Section */}
        <HeroBanner />

        {/* 5. Shop by Category — Curated arch-top category cards */}
        <CategoryGrid />

        {/* 6. Best Sellers — Product cards with real product images and Add to Bag */}
        <BestSellersSection />

        {/* 7. Promotional Seasonal Banner with Coupon Code SHOKHORA10 */}
        <PromoBanner />

        {/* 8. New Arrivals */}
        <NewArrivalsSection />

        {/* 9. Featured Collections — 3 Large Signature Editorial Lookbook Banners */}
        <FeaturedCollections />

        {/* 10. Why Shop With SHOKHORA — 4 Pillars of Excellence */}
        <CustomerBenefits />

        {/* 11. Customer Reviews & Community Stories */}
        <Testimonials />

        {/* 12. VIP Newsletter Subscription */}
        <NewsletterSection />
      </main>

      {/* Professional Editorial Footer */}
      <Footer />
    </div>
  );
}
