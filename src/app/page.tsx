import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSlider from '@/components/home/HeroSlider';
import BrandShowcase from '@/components/home/BrandShowcase';
import PromoBannerGrid from '@/components/home/PromoBannerGrid';
import CategorySection from '@/components/home/CategorySection';
import NewProductsSection from '@/components/home/NewProductsSection';
import BestSellersSection from '@/components/home/BestSellersSection';
import RecommendedProducts from '@/components/home/RecommendedProducts';
import TrendingSection from '@/components/home/TrendingSection';
import CampaignBanner from '@/components/home/CampaignBanner';
import FaqAccordion from '@/components/home/FaqAccordion';
import LifestyleBlogSection from '@/components/home/LifestyleBlogSection';
import ServiceBenefits from '@/components/home/ServiceBenefits';
import NewsletterSection from '@/components/home/NewsletterSection';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-[#191C1F]">
      {/* 1, 2, 3: Top Announcement Bar, Main Navigation & Search, Category Navigation */}
      <Header />

      <main className="flex-1">
        {/* 4. Large Promotional Hero Slider */}
        <HeroSlider />

        {/* 5. Brand/Partner Showcase */}
        <BrandShowcase />

        {/* 6. Promotional Banner Grid (1 Large Left + 2 Stacked Right) */}
        <PromoBannerGrid />

        {/* 7. Shop by Categories */}
        <CategorySection />

        {/* 8. New Arrivals Product Section (with Sort By & Pagination) */}
        <NewProductsSection />

        {/* 9. Best Sellers Product Section */}
        <BestSellersSection />

        {/* 10. Recommended Products */}
        <RecommendedProducts />

        {/* 11. Special Offers / Trending Products (Split Card + Ranking Items) */}
        <TrendingSection />

        {/* 12. Promotional Campaign Banner ("Save Big on Selected Items") */}
        <CampaignBanner />

        {/* 13. FAQ Accordion */}
        <FaqAccordion />

        {/* 14. Lifestyle / Blog Section */}
        <LifestyleBlogSection />

        {/* 15. Service Benefits Section (4 Value Pillars) */}
        <ServiceBenefits />

        {/* 16. Newsletter Subscription */}
        <NewsletterSection />
      </main>

      {/* 17. Complete Professional Footer */}
      <Footer />
    </div>
  );
}
