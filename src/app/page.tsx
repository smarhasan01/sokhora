import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSlider from '@/components/home/HeroSlider';
import CategorySection from '@/components/home/CategorySection';
import FeaturedCategoriesSection from '@/components/home/FeaturedCategoriesSection';
import NewArrivalsSection from '@/components/home/NewArrivalsSection';
import BestSellersSection from '@/components/home/BestSellersSection';
import CampaignBanner from '@/components/home/CampaignBanner';
import TrendingSection from '@/components/home/TrendingSection';
import RecommendedProducts from '@/components/home/RecommendedProducts';
import SpecialOffersSection from '@/components/home/SpecialOffersSection';
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

        {/* 5. Shop by Categories */}
        <CategorySection />

        {/* 6. Featured / Best Categories */}
        <FeaturedCategoriesSection />

        {/* 7. New Arrivals */}
        <NewArrivalsSection />

        {/* 8. Best Sellers */}
        <BestSellersSection />

        {/* 9. Promotional Campaign Banner */}
        <CampaignBanner />

        {/* 10. Trending Products with Category Filters */}
        <TrendingSection />

        {/* 11. Recommended Products */}
        <RecommendedProducts />

        {/* 12. Special Offers */}
        <SpecialOffersSection />

        {/* 13. Lifestyle / Brand Stories Section */}
        <LifestyleBlogSection />

        {/* 14. FAQ Accordion */}
        <FaqAccordion />

        {/* 15. Service Benefits */}
        <ServiceBenefits />

        {/* 16. Newsletter Subscription */}
        <NewsletterSection />
      </main>

      {/* 17. Premium Footer */}
      <Footer />
    </div>
  );
}
