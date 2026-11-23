import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSlider from '@/components/home/HeroSlider';
import BestDealsSection from '@/components/home/BestDealsSection';
import CircularCategories from '@/components/home/CircularCategories';
import FeaturedBrands from '@/components/home/FeaturedBrands';
import RecommendedProducts from '@/components/home/RecommendedProducts';
import TrendingSection from '@/components/home/TrendingSection';
import DailyEssentialsSection from '@/components/home/DailyEssentialsSection';
import CampaignBanner from '@/components/home/CampaignBanner';
import FaqAccordion from '@/components/home/FaqAccordion';
import ServiceBenefits from '@/components/home/ServiceBenefits';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-[#202833]">
      {/* A, B, C: Top Announcement Bar, Main Navigation Header & Horizontal Category Navigation */}
      <Header />

      <main className="flex-1">
        {/* D. Hero Promotional Slider (MegaMart Style) */}
        <HeroSlider />

        {/* E. Best Deals / Horizontal Product Cards ("Grab the best deal on...") */}
        <BestDealsSection />

        {/* F. Top Categories (Circular Category Showcase) */}
        <CircularCategories />

        {/* G. Featured Brands (3 Wide Promo Cards: "Top Featured Collections") */}
        <FeaturedBrands />

        {/* H. Recommended Products Grid */}
        <RecommendedProducts />

        {/* I. Trending Products with Category Filter Tabs */}
        <TrendingSection />

        {/* J. Daily Essentials Category Showcase */}
        <DailyEssentialsSection />

        {/* K. Promotional Campaign Banner */}
        <CampaignBanner />

        {/* Service Benefits & Trust Pillars */}
        <ServiceBenefits />

        {/* L. Customer FAQ Accordion */}
        <FaqAccordion />
      </main>

      {/* M. Professional Deep Navy Multi-Column Footer */}
      <Footer />
    </div>
  );
}
