import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Truck, Clock, ShieldCheck, MapPin } from 'lucide-react';

export default function DeliveryPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-ivory-100">
      <Header />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-sage-600 block">
            Shipping & Logistics Information
          </span>
          <h1 className="text-3xl font-serif font-bold text-charcoal-950">
            Delivery Policy
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-600">
            Transparent, safe, and reliable nationwide shipping across 64 districts.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-taupe-200 shadow-sm space-y-8 text-xs sm:text-sm text-charcoal-700 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-charcoal-950 flex items-center gap-2">
              <Truck className="w-5 h-5 text-sage-600" />
              1. Delivery Coverage & Courier Partners
            </h2>
            <p>
              SHOKHORA ships to all 64 districts in Bangladesh including metropolitan areas,
              district sadars, and upazilas. We partner with premier logistics providers (Steadfast,
              RedX, Paperfly) to ensure prompt delivery directly to your doorstep.
            </p>
          </section>

          <section className="space-y-3 border-t border-taupe-100 pt-6">
            <h2 className="text-base sm:text-lg font-bold text-charcoal-950 flex items-center gap-2">
              <Clock className="w-5 h-5 text-sage-600" />
              2. Delivery Timelines
            </h2>
            <ul className="list-disc list-inside space-y-1.5 text-charcoal-600">
              <li><strong>Inside Dhaka City:</strong> Delivered within 24 to 48 hours of order confirmation.</li>
              <li><strong>Dhaka Suburbs (Savar, Gazipur, Narayanganj):</strong> Delivered within 48 hours.</li>
              <li><strong>Outside Dhaka (All other 63 districts):</strong> Delivered within 48 to 72 hours.</li>
            </ul>
          </section>

          <section className="space-y-3 border-t border-taupe-100 pt-6">
            <h2 className="text-base sm:text-lg font-bold text-charcoal-950 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-sage-600" />
              3. Delivery Charges & Free Shipping
            </h2>
            <p>
              Standard Inside Dhaka delivery fee is <strong>৳70</strong>. Outside Dhaka fee is <strong>৳130</strong>.
              Orders with a subtotal of <strong>৳2,000 or more</strong> qualify automatically for <strong>FREE Delivery</strong> anywhere in Bangladesh.
            </p>
          </section>

          <section className="space-y-3 border-t border-taupe-100 pt-6">
            <h2 className="text-base sm:text-lg font-bold text-charcoal-950 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-sage-600" />
              4. Package Inspection upon Arrival
            </h2>
            <p>
              Customers opting for Cash on Delivery are welcome to inspect the external condition of the package in front of the courier representative before handing over payment.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
