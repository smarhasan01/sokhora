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
import ScrollReveal from '@/components/common/ScrollReveal';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-[#202833]">
      {/* Main Navigation Header & Horizontal Category Navigation */}
      <Header />

      <main className="flex-1">
        {/* Hero Promotional Slider (MegaMart Style) */}
        <HeroSlider />

        {/* Best Deals / Product Cards ("Grab the best deal on...") */}
        <ScrollReveal>
          <BestDealsSection />
        </ScrollReveal>

        {/* Top Categories (Circular Category Showcase) */}
        <ScrollReveal>
          <CircularCategories />
        </ScrollReveal>

        {/* Featured Brands (3 Wide Promo Cards: "Top Featured Collections") */}
        <ScrollReveal>
          <FeaturedBrands />
        </ScrollReveal>

        {/* Recommended Products Grid */}
        <ScrollReveal>
          <RecommendedProducts />
        </ScrollReveal>

        {/* Trending Products with Category Filter Tabs */}
        <ScrollReveal>
          <TrendingSection />
        </ScrollReveal>

        {/* Daily Essentials Category Showcase */}
        <ScrollReveal>
          <DailyEssentialsSection />
        </ScrollReveal>

        {/* Promotional Campaign Banner */}
        <ScrollReveal>
          <CampaignBanner />
        </ScrollReveal>

        {/* Service Benefits & Trust Pillars */}
        <ScrollReveal>
          <ServiceBenefits />
        </ScrollReveal>

        {/* Customer FAQ Accordion */}
        <ScrollReveal>
          <FaqAccordion />
        </ScrollReveal>
      </main>

      {/* Professional Deep Navy Multi-Column Footer */}
      <Footer />
    </div>
  );
}
