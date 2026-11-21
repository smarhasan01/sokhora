import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSlider from '@/components/home/HeroSlider';
import CategorySection from '@/components/home/CategorySection';
import NewArrivalsSection from '@/components/home/NewArrivalsSection';
import CampaignBanner from '@/components/home/CampaignBanner';
import TrendingSection from '@/components/home/TrendingSection';
import BestSellersSection from '@/components/home/BestSellersSection';
import CountdownBanner from '@/components/home/CountdownBanner';
import RecommendedProducts from '@/components/home/RecommendedProducts';
import DealsOfTheDay from '@/components/home/DealsOfTheDay';
import LifestyleBlogSection from '@/components/home/LifestyleBlogSection';
import FaqAccordion from '@/components/home/FaqAccordion';
import ServiceBenefits from '@/components/home/ServiceBenefits';
import NewsletterSection from '@/components/home/NewsletterSection';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-[#252525]">
      {/* 1, 2, 3: Slim Announcement Bar, Main Navigation Header & Main Category Navigation */}
      <Header />

      <main className="flex-1">
        {/* 4. Large Promotional Hero Slider */}
        <HeroSlider />

        {/* 5. Best Categories (7 Squircle Cards with Navigation Arrows) */}
        <CategorySection />

        {/* 6. For You (8 Product Cards in 4-column x 2-row Grid) */}
        <NewArrivalsSection />

        {/* 7. Promotional Campaign Banner (Up to 50% OFF on your favorite items) */}
        <CampaignBanner />

        {/* 8. Trending Products with Category Filter Tabs */}
        <TrendingSection />

        {/* 9. Best Sellers / Customer Favorites */}
        <BestSellersSection />

        {/* 10. Featured Deal Banner with Live Countdown Timer Boxes */}
        <CountdownBanner />

        {/* 11. Most Popular / Recommended Products (8 Cards with Category Tabs) */}
        <RecommendedProducts />

        {/* 12. Deals Of The Day (3 Cards with Circular Gold Discount Badges) */}
        <DealsOfTheDay />

        {/* 13. Castle Chronicles / Lifestyle Brand Stories (3 Editorial Cards) */}
        <LifestyleBlogSection />

        {/* 14. Frequently Asked Questions (Interactive Accordion) */}
        <FaqAccordion />

        {/* 15. Service Value Pillars (4 Horizontal Pillars) */}
        <ServiceBenefits />

        {/* 16. Newsletter Subscription Strip */}
        <NewsletterSection />
      </main>

      {/* 17. Deep Navy Premium Multi-column Footer */}
      <Footer />
    </div>
  );
}
