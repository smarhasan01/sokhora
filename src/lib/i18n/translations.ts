export type Language = 'en' | 'bn';

export interface Translations {
  // Brand & General
  brandName: string;
  brandTagline: string;
  currency: string;
  freeShippingBar: string;
  promoCodeNotice: string;
  devNoticeBanner: string;
  loading: string;
  viewAll: string;
  learnMore: string;
  exploreCollections: string;
  shopNow: string;
  save: string;
  cancel: string;
  submit: string;
  close: string;
  back: string;
  continueShopping: string;
  emptyState: string;

  // Header & Navigation
  navHome: string;
  navAllProducts: string;
  navFashion: string;
  navBeauty: string;
  navKids: string;
  navScrunchies: string;
  navJewellery: string;
  navGifts: string;
  navEveryday: string;
  searchPlaceholder: string;
  searchSuggestions: string;
  account: string;
  signIn: string;
  myAccount: string;
  orders: string;
  wishlist: string;
  cart: string;
  items: string;
  switchLang: string;

  // Hero
  heroTagline: string;
  heroHeadline: string;
  heroSubtitle: string;
  heroPrimaryCta: string;
  heroSecondaryCta: string;

  // Categories Section
  categoriesTitle: string;
  categoriesSubtitle: string;
  exploreCategory: string;

  // Product Cards & Sections
  featuredTitle: string;
  featuredSubtitle: string;
  bestSellersTitle: string;
  bestSellersSubtitle: string;
  newArrivalsTitle: string;
  newArrivalsSubtitle: string;
  featuredCollectionsTitle: string;
  featuredCollectionsSubtitle: string;
  addToCart: string;
  addedToCart: string;
  outOfStock: string;
  inStock: string;
  sale: string;
  quickView: string;
  byBrand: string;

  // Promotional Banner
  promoBadge: string;
  promoTitle: string;
  promoSubtitle: string;
  promoCodeLabel: string;
  copyCode: string;
  copied: string;

  // Why SHOKHORA
  whyTitle: string;
  whySubtitle: string;
  whyDeliveryTitle: string;
  whyDeliveryDesc: string;
  whyQualityTitle: string;
  whyQualityDesc: string;
  whyPaymentTitle: string;
  whyPaymentDesc: string;
  whyExchangeTitle: string;
  whyExchangeDesc: string;

  // Testimonials
  testimonialsTitle: string;
  testimonialsSubtitle: string;
  verifiedBuyer: string;

  // Newsletter
  newsletterTitle: string;
  newsletterSubtitle: string;
  newsletterPlaceholder: string;
  newsletterButton: string;
  newsletterSuccess: string;
  newsletterNote: string;

  // Footer
  footerAbout: string;
  footerShowroom: string;
  footerPhone: string;
  footerEmail: string;
  footerFacebook: string;
  footerQuickLinks: string;
  footerCategories: string;
  footerPolicies: string;
  footerCustomerCare: string;
  footerShippingPolicy: string;
  footerReturnPolicy: string;
  footerPrivacyPolicy: string;
  footerTermsConditions: string;
  footerAboutUs: string;
  footerContactUs: string;
  footerTrackOrder: string;
  footerCopyright: string;
  footerPaymentPartners: string;

  // Shop Page
  shopTitle: string;
  shopSubtitle: string;
  filters: string;
  clearFilters: string;
  categoryFilter: string;
  brandFilter: string;
  priceFilter: string;
  availabilityFilter: string;
  inStockOnly: string;
  sortBy: string;
  sortFeatured: string;
  sortPriceLowHigh: string;
  sortPriceHighLow: string;
  sortNewest: string;
  sortPopularity: string;
  showingProducts: string;
  noProductsFound: string;
  loadMore: string;

  // Product Details
  productSku: string;
  productCategory: string;
  productBrand: string;
  productAvailability: string;
  selectSize: string;
  selectColor: string;
  quantity: string;
  buyNow: string;
  share: string;
  deliveryInfoTitle: string;
  deliveryDhaka: string;
  deliveryOutsideDhaka: string;
  cashOnDeliveryAvail: string;
  sevenDaysReturn: string;
  relatedProducts: string;

  // Cart
  cartTitle: string;
  cartEmptyTitle: string;
  cartEmptySubtitle: string;
  cartItem: string;
  cartPrice: string;
  cartQuantity: string;
  cartTotal: string;
  orderSummary: string;
  subtotal: string;
  deliveryFee: string;
  estimatedTotal: string;
  couponCode: string;
  applyCoupon: string;
  freeShippingProgress: string;
  proceedToCheckout: string;

  // Checkout
  checkoutTitle: string;
  deliveryAddressTitle: string;
  fullName: string;
  phoneNumber: string;
  emailOptional: string;
  district: string;
  selectDistrict: string;
  area: string;
  fullAddress: string;
  deliveryNotes: string;
  paymentMethodTitle: string;
  paymentCod: string;
  paymentCodDesc: string;
  paymentBkash: string;
  paymentBkashDesc: string;
  paymentBkashInstructions: string;
  paymentNagad: string;
  paymentNagadDesc: string;
  paymentNagadInstructions: string;
  trxIdPlaceholder: string;
  placeOrder: string;
  placingOrder: string;
  checkoutDisclaimer: string;

  // Search Page
  searchPageTitle: string;
  searchResultsFor: string;
  noSearchResults: string;
  popularCategories: string;

  // Wishlist Page
  wishlistTitle: string;
  wishlistSubtitle: string;
  wishlistEmptyTitle: string;
  wishlistEmptySubtitle: string;
  moveToCart: string;
  removeFromWishlist: string;

  // Customer Account
  accountOverview: string;
  profileSettings: string;
  orderHistory: string;
  savedAddresses: string;
  logout: string;
  recentOrders: string;
  viewAllOrders: string;
  addNewAddress: string;
  noOrdersYet: string;
  noAddressesYet: string;
  demoAccountNotice: string;

  // Policies & Info
  shippingPolicyTitle: string;
  returnPolicyTitle: string;
  privacyPolicyTitle: string;
  termsConditionsTitle: string;
  aboutUsTitle: string;
  contactUsTitle: string;
  sendMessage: string;
  messageSuccess: string;

  // Shortcuts & Aliases
  allProducts: string;
  login: string;
  clearCart: string;
  emptyCart: string;
  deliveryLocation: string;
  insideDhaka: string;
  outsideDhaka: string;
  promoCode: string;
  apply: string;
  discount: string;
  total: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    // Brand & General
    brandName: 'SHOKHORA',
    brandTagline: 'Your Choice, Our Passion.',
    currency: '৳',
    freeShippingBar: 'Complimentary delivery nationwide on all orders over ৳1,500',
    promoCodeNotice: 'Use code SHOKHORA10 for 10% off your seasonal cart',
    devNoticeBanner: 'Phase 1 Frontend Prototype — Live interactive customer UI with development mock data.',
    loading: 'Loading...',
    viewAll: 'View All',
    learnMore: 'Learn More',
    exploreCollections: 'Explore Collections',
    shopNow: 'Shop Now',
    save: 'Save',
    cancel: 'Cancel',
    submit: 'Submit',
    close: 'Close',
    back: 'Back',
    continueShopping: 'Continue Shopping',
    emptyState: 'No items to display at this moment.',

    // Header & Navigation
    navHome: 'Home',
    navAllProducts: 'All Products',
    navFashion: 'Fashion',
    navBeauty: 'Beauty',
    navKids: 'Kids Accessories',
    navScrunchies: 'Hair Accessories',
    navJewellery: 'Jewellery',
    navGifts: 'Gifts & Lifestyle',
    navEveryday: 'Everyday Products',
    searchPlaceholder: 'Search lifestyle, scrunchies, jewellery, fashion...',
    searchSuggestions: 'Quick Suggestions',
    account: 'Account',
    signIn: 'Sign In',
    myAccount: 'My Account',
    orders: 'Orders',
    wishlist: 'Wishlist',
    cart: 'Bag',
    items: 'items',
    switchLang: 'বাংলা',

    // Hero
    heroTagline: 'Modern Bangladeshi Lifestyle Brand',
    heroHeadline: 'Curated Everyday Elegance & Artisan Craftsmanship',
    heroSubtitle: 'Discover handcrafted mulberry silk scrunchies, botanical skincare, minimalist jewellery, and breathable fashion thoughtfully tailored for your lifestyle.',
    heroPrimaryCta: 'Shop New Season',
    heroSecondaryCta: 'Explore Collections',

    // Categories Section
    categoriesTitle: 'Shop By Category',
    categoriesSubtitle: 'Carefully curated collections crafted with natural materials and modern aesthetics.',
    exploreCategory: 'Explore Category',

    // Product Cards & Sections
    featuredTitle: 'Featured Highlights',
    featuredSubtitle: 'Hand-picked essentials crafted with organic fabrics, pure silk, and artisan metals.',
    bestSellersTitle: 'Best Sellers',
    bestSellersSubtitle: 'Our community’s most-loved essentials, praised for timeless quality and daily comfort.',
    newArrivalsTitle: 'New Arrivals',
    newArrivalsSubtitle: 'Fresh additions to elevate your everyday routines and festive celebrations.',
    featuredCollectionsTitle: 'Signature Collections',
    featuredCollectionsSubtitle: 'Curated stories showcasing heritage craftsmanship and contemporary design.',
    addToCart: 'Add to Bag',
    addedToCart: 'Added to Bag',
    outOfStock: 'Out of Stock',
    inStock: 'In Stock',
    sale: 'SALE',
    quickView: 'Quick View',
    byBrand: 'by',

    // Promotional Banner
    promoBadge: 'Limited Time Offer',
    promoTitle: 'Special Festive & New Season 10% Discount',
    promoSubtitle: 'Enjoy 10% off your curated cart across all lifestyle and beauty categories.',
    promoCodeLabel: 'Promo Code:',
    copyCode: 'Copy Code',
    copied: 'Copied!',

    // Why SHOKHORA
    whyTitle: 'Why Shop With SHOKHORA',
    whySubtitle: 'We combine authentic Bangladeshi craftsmanship with modern, uncompromising quality standards.',
    whyDeliveryTitle: 'Fast Delivery in Bangladesh',
    whyDeliveryDesc: '48-hour delivery within Dhaka city and 72-hour delivery across all 64 districts nationwide.',
    whyQualityTitle: 'Authentic Quality Guaranteed',
    whyQualityDesc: '100% genuine mulberry silk, organic botanicals, and hypoallergenic tested materials.',
    whyPaymentTitle: 'Flexible & Secure Payment',
    whyPaymentDesc: 'Convenient Cash on Delivery alongside manual bKash & Nagad verified payments.',
    whyExchangeTitle: 'Hassle-Free 7-Day Exchange',
    whyExchangeDesc: 'Simple and transparent exchange policy for unused items in original packaging.',

    // Testimonials
    testimonialsTitle: 'Loved by Our Customers',
    testimonialsSubtitle: 'Genuine feedback from verified patrons across Dhaka, Chittagong, and Sylhet.',
    verifiedBuyer: 'Verified Customer',

    // Newsletter
    newsletterTitle: 'Join the SHOKHORA Circle',
    newsletterSubtitle: 'Subscribe for private seasonal previews, artisan stories, and exclusive subscriber perks.',
    newsletterPlaceholder: 'Enter your email address',
    newsletterButton: 'Subscribe',
    newsletterSuccess: 'Thank you for subscribing to SHOKHORA updates!',
    newsletterNote: 'We respect your privacy. Unsubscribe at any time with a single click.',

    // Footer
    footerAbout: 'SHOKHORA (শখোরা) is a premier Bangladeshi lifestyle brand dedicated to curated everyday elegance, artisanal craftsmanship, and conscious lifestyle essentials.',
    footerShowroom: 'Road 4/A, Dhanmondi, Dhaka - 1209, Bangladesh',
    footerPhone: '01568923850',
    footerEmail: 'info.shokhora@gmail.com',
    footerFacebook: 'https://facebook.com/Shokhora',
    footerQuickLinks: 'Quick Links',
    footerCategories: 'Categories',
    footerPolicies: 'Policies & Help',
    footerCustomerCare: 'Customer Care',
    footerShippingPolicy: 'Shipping Policy',
    footerReturnPolicy: 'Return & Exchange Policy',
    footerPrivacyPolicy: 'Privacy Policy',
    footerTermsConditions: 'Terms & Conditions',
    footerAboutUs: 'About SHOKHORA',
    footerContactUs: 'Contact & Showroom',
    footerTrackOrder: 'Track Your Order',
    footerCopyright: '© 2026 SHOKHORA. All rights reserved. Registered trademark in Bangladesh.',
    footerPaymentPartners: 'Secure Payment Options',

    // Shop Page
    shopTitle: 'All Products',
    shopSubtitle: 'Explore our complete catalog of lifestyle, fashion, beauty, and accessories.',
    filters: 'Filters',
    clearFilters: 'Clear All Filters',
    categoryFilter: 'Category',
    brandFilter: 'Brand / Origin',
    priceFilter: 'Price Range',
    availabilityFilter: 'Availability',
    inStockOnly: 'In Stock Only',
    sortBy: 'Sort By',
    sortFeatured: 'Featured',
    sortPriceLowHigh: 'Price: Low to High',
    sortPriceHighLow: 'Price: High to Low',
    sortNewest: 'Newest Arrivals',
    sortPopularity: 'Popularity',
    showingProducts: 'Showing',
    noProductsFound: 'No products matched your selected criteria.',
    loadMore: 'Load More Products',

    // Product Details
    productSku: 'SKU',
    productCategory: 'Category',
    productBrand: 'Brand',
    productAvailability: 'Availability',
    selectSize: 'Select Size',
    selectColor: 'Select Color',
    quantity: 'Quantity',
    buyNow: 'Buy Now',
    share: 'Share',
    deliveryInfoTitle: 'Delivery & Shipping Information',
    deliveryDhaka: 'Inside Dhaka: ৳70 (Estimated 2-3 business days)',
    deliveryOutsideDhaka: 'Outside Dhaka: ৳130 (Estimated 3-5 business days)',
    cashOnDeliveryAvail: 'Cash on Delivery available nationwide',
    sevenDaysReturn: '7-day hassle-free exchange on eligible items',
    relatedProducts: 'You May Also Like',

    // Cart
    cartTitle: 'Your Shopping Bag',
    cartEmptyTitle: 'Your shopping bag is empty',
    cartEmptySubtitle: 'Explore our curated collections and add your favourite pieces to your bag.',
    cartItem: 'Product',
    cartPrice: 'Price',
    cartQuantity: 'Quantity',
    cartTotal: 'Total',
    orderSummary: 'Order Summary',
    subtotal: 'Subtotal',
    deliveryFee: 'Delivery Fee',
    estimatedTotal: 'Estimated Total',
    couponCode: 'Coupon Code',
    applyCoupon: 'Apply',
    freeShippingProgress: 'Add more to unlock free delivery',
    proceedToCheckout: 'Proceed to Checkout',

    // Checkout
    checkoutTitle: 'Secure Checkout',
    deliveryAddressTitle: 'Delivery Information',
    fullName: 'Full Name',
    phoneNumber: 'Phone Number (e.g. 017XXXXXXXX)',
    emailOptional: 'Email Address (Optional)',
    district: 'District',
    selectDistrict: 'Select District (All 64 Districts)',
    area: 'Area / Thana / Upazila',
    fullAddress: 'Full Street Address (House, Road, Area)',
    deliveryNotes: 'Delivery Notes / Special Instructions',
    paymentMethodTitle: 'Select Payment Method',
    paymentCod: 'Cash on Delivery (COD)',
    paymentCodDesc: 'Pay in cash directly to the delivery rider upon receiving your parcel.',
    paymentBkash: 'bKash Manual Payment',
    paymentBkashDesc: 'Send Money to our merchant number and provide your Transaction ID below.',
    paymentBkashInstructions: 'bKash Personal / Merchant: 01568923850 (Send Money / Payment)',
    paymentNagad: 'Nagad Manual Payment',
    paymentNagadDesc: 'Send Money to our Nagad merchant number and provide your Transaction ID.',
    paymentNagadInstructions: 'Nagad Personal / Merchant: 01568923850 (Send Money / Payment)',
    trxIdPlaceholder: 'Enter bKash/Nagad Transaction ID (TrxID)',
    placeOrder: 'Confirm Order (Place Demo Order)',
    placingOrder: 'Processing your order...',
    checkoutDisclaimer: 'Notice: This is Phase 1 frontend demonstration. Orders are stored locally in your browser session for testing and workflow verification.',

    // Search Page
    searchPageTitle: 'Product Search',
    searchResultsFor: 'Search Results for',
    noSearchResults: 'No products found matching your search term.',
    popularCategories: 'Popular Categories to Explore',

    // Wishlist Page
    wishlistTitle: 'My Wishlist',
    wishlistSubtitle: 'Saved items you love, ready whenever you wish to add them to your bag.',
    wishlistEmptyTitle: 'Your wishlist is currently empty',
    wishlistEmptySubtitle: 'Explore our latest collections and click the heart icon to save items here.',
    moveToCart: 'Move to Bag',
    removeFromWishlist: 'Remove',

    // Customer Account
    accountOverview: 'Account Overview',
    profileSettings: 'Profile Settings',
    orderHistory: 'Order History',
    savedAddresses: 'Saved Addresses',
    logout: 'Log Out',
    recentOrders: 'Recent Orders',
    viewAllOrders: 'View All Orders',
    addNewAddress: 'Add New Address',
    noOrdersYet: 'You have not placed any orders yet.',
    noAddressesYet: 'No saved delivery addresses found.',
    demoAccountNotice: 'Customer Account Mode: Displays your local customer order history, active addresses, and saved wishlist items.',

    // Policies & Info
    shippingPolicyTitle: 'Shipping & Delivery Policy',
    returnPolicyTitle: 'Return & Exchange Policy',
    privacyPolicyTitle: 'Privacy & Data Protection Policy',
    termsConditionsTitle: 'Terms of Service & Conditions',
    aboutUsTitle: 'About SHOKHORA',
    contactUsTitle: 'Contact Us & Showroom',
    sendMessage: 'Send Us a Message',
    messageSuccess: 'Thank you! Your message has been sent to our customer care team.',

    allProducts: 'All Products',
    login: 'Sign In',
    clearCart: 'Clear Bag',
    emptyCart: 'Your shopping bag is empty',
    deliveryLocation: 'Delivery Location',
    insideDhaka: 'Inside Dhaka',
    outsideDhaka: 'Outside Dhaka',
    promoCode: 'Promo Code',
    apply: 'Apply',
    discount: 'Discount',
    total: 'Total',
  },

  bn: {
    // Brand & General
    brandName: 'শখোরা',
    brandTagline: 'আপনার পছন্দ, আমাদের ভালোবাসা।',
    currency: '৳',
    freeShippingBar: '৳১,৫০০ টাকার অধিক অর্ডারে সারা বাংলাদেশে ফ্রি ডেলিভারি',
    promoCodeNotice: '১০% বিশেষ ছাড় উপভোগ করতে ব্যবহার করুন কোড: SHOKHORA10',
    devNoticeBanner: 'ফেজ ১ ফ্রন্টএন্ড প্রোটোটাইপ — ডেমো ডেটাসেট সহ সম্পূর্ণ কার্যকরী ইন্টারফেস।',
    loading: 'লোড হচ্ছে...',
    viewAll: 'সবগুলো দেখুন',
    learnMore: 'বিস্তারিত জানুন',
    exploreCollections: 'কালেকশন দেখুন',
    shopNow: 'কেনাকাটা করুন',
    save: 'সংরক্ষণ করুন',
    cancel: 'বাতিল',
    submit: 'পাঠান',
    close: 'বন্ধ করুন',
    back: 'ফিরে যান',
    continueShopping: 'আরও কেনাকাটা করুন',
    emptyState: 'এই মুহূর্তে প্রদর্শনের মতো কোনো পণ্য নেই।',

    // Header & Navigation
    navHome: 'হোম',
    navAllProducts: 'সকল পণ্য',
    navFashion: 'পোশাক',
    navBeauty: 'বিউটি ও রূপচর্চা',
    navKids: 'কিডস এক্সেসরিজ',
    navScrunchies: 'হেয়ার এক্সেসরিজ',
    navJewellery: 'জুয়েলারি',
    navGifts: 'উপহার ও লাইফস্টাইল',
    navEveryday: 'দৈনন্দিন পণ্য',
    searchPlaceholder: 'স্ক্রাঞ্চি, জুয়েলারি, রূপচর্চা কিংবা পোশাক খুঁজুন...',
    searchSuggestions: 'জনপ্রিয় অনুসন্ধান',
    account: 'অ্যাকাউন্ট',
    signIn: 'লগইন করুন',
    myAccount: 'আমার অ্যাকাউন্ট',
    orders: 'অর্ডার সমূহ',
    wishlist: 'পছন্দের তালিকা',
    cart: 'শপিং ব্যাগ',
    items: 'টি পণ্য',
    switchLang: 'English',

    // Hero
    heroTagline: 'আধুনিক বাংলাদেশি লাইফস্টাইল ব্র্যান্ড',
    heroHeadline: 'দৈনন্দিন আভিজাত্য ও ঐতিহ্যের নান্দনিক প্রকাশ',
    heroSubtitle: 'হাতে তৈরি মালবেরি সিল্ক স্ক্রাঞ্চি, ভেষজ স্কিনকেয়ার, মিনিমালিস্ট গহনা এবং আরামদায়ক পোশাকের অনন্য সম্ভার—যা আপনার ব্যক্তিত্বের সাথে মানানসই।',
    heroPrimaryCta: 'নতুন কালেকশন দেখুন',
    heroSecondaryCta: 'কালেকশন সমূহ',

    // Categories Section
    categoriesTitle: 'ক্যাটাগরি অনুযায়ী কেনাকাটা',
    categoriesSubtitle: 'প্রাকৃতিক উপাদান এবং আধুনিক নান্দনিকতায় তৈরি আমাদের নির্বাচিত পণ্য সম্ভার।',
    exploreCategory: 'ক্যাটাগরি দেখুন',

    // Product Cards & Sections
    featuredTitle: 'বিশেষ নির্বাচিত পণ্য',
    featuredSubtitle: 'অর্গানিক ফেব্রিক, খাঁটি সিল্ক ও নিখুঁত কারুকাজে তৈরি আমাদের নির্বাচিত পণ্যসমূহ।',
    bestSellersTitle: 'সবচেয়ে জনপ্রিয় পণ্য (বেস্ট সেলার)',
    bestSellersSubtitle: 'গ্রাহকদের পছন্দের শীর্ষে থাকা পণ্যসমূহ, যা টেকসই মান ও নিখুঁত সৌন্দর্যে অনন্য।',
    newArrivalsTitle: 'নতুন আগমন (নিউ অ্যারাইভালস)',
    newArrivalsSubtitle: 'আপনার দৈনন্দিন স্টাইল ও উৎসবের সাজে যোগ করতে নতুন কালেকশন।',
    featuredCollectionsTitle: 'সিগনেচার কালেকশন',
    featuredCollectionsSubtitle: 'ঐতিহ্যবাহী কারুশিল্প ও আধুনিক ডিজাইনের মেলবন্ধন।',
    addToCart: 'ব্যাগে যোগ করুন',
    addedToCart: 'ব্যাগে যোগ হয়েছে',
    outOfStock: 'স্টক শেষ',
    inStock: 'স্টকে আছে',
    sale: 'অফার',
    quickView: 'একনজরে দেখুন',
    byBrand: 'ব্র্যান্ড:',

    // Promotional Banner
    promoBadge: 'সীমিত সময়ের অফার',
    promoTitle: 'বিশেষ সিজনাল কালেকশনে পাচ্ছেন ফ্ল্যাট ১০% ডিসকাউন্ট',
    promoSubtitle: 'লাইফস্টাইল ও রূপচর্চার সকল ক্যাটাগরিতে উপভোগ করুন আকর্ষণীয় ক্যাশব্যাক ও ছাড়।',
    promoCodeLabel: 'প্রোমো কোড:',
    copyCode: 'কোড কপি করুন',
    copied: 'কপি করা হয়েছে!',

    // Why SHOKHORA
    whyTitle: 'কেন শখোরা থেকে কেনাকাটা করবেন?',
    whySubtitle: 'আমরা ঐতিহ্যবাহী কারুশিল্পের সাথে আধুনিক মানের অপূর্ব সমন্বয় নিশ্চিত করি।',
    whyDeliveryTitle: 'দ্রুত হোম ডেলিভারি',
    whyDeliveryDesc: 'ঢাকা সিটির ভেতরে ৪৮ ঘণ্টার মধ্যে এবং সারাদেশে ৬৪ জেলায় ৭২ ঘণ্টার মধ্যে ডেলিভারি।',
    whyQualityTitle: '১০০% খাঁটি মানের নিশ্চয়তা',
    whyQualityDesc: 'খাঁটি মালবেরি সিল্ক, অর্গানিক বোটানিক্যাল উপাদান ও নিরাপদ অ্যালার্জি-মুক্ত উপকরণ।',
    whyPaymentTitle: 'সহজ ও নিরাপদ পেমেন্ট',
    whyPaymentDesc: 'ক্যাশ অন ডেলিভারি এবং যাচাইকৃত বিকাশ ও নগদ পেমেন্টের সুব্যবস্থা।',
    whyExchangeTitle: 'সহজ ৭ দিনের এক্সচেঞ্জ সুবিধা',
    whyExchangeDesc: 'পণ্য পছন্দ না হলে বা সাইজ পরিবর্তন করতে চাইলে ৭ দিনের ভেতর সহজ এক্সচেঞ্জ পলিসি।',

    // Testimonials
    testimonialsTitle: 'গ্রাহকদের সন্তুষ্টি ও ভালোবাসা',
    testimonialsSubtitle: 'ঢাকা, চট্টগ্রাম ও সিলেট সহ সারাদেশের সম্মানিত গ্রাহকদের বাস্তব অভিজ্ঞতা।',
    verifiedBuyer: 'যাচাইকৃত ক্রেতা',

    // Newsletter
    newsletterTitle: 'শখোরা পরিবারের সাথে যুক্ত থাকুন',
    newsletterSubtitle: 'নতুন কালেকশন ও স্পেশাল অফারের খবর সবার আগে পেতে আপনার ইমেইল দিয়ে সাবস্ক্রাইব করুন।',
    newsletterPlaceholder: 'আপনার ইমেইল অ্যাড্রেস লিখুন',
    newsletterButton: 'সাবস্ক্রাইব',
    newsletterSuccess: 'শখোরা নিউজলেটারে সাবস্ক্রাইব করার জন্য ধন্যবাদ!',
    newsletterNote: 'আমরা আপনার তথ্যের সুরক্ষা নিশ্চিত করি। যেকোনো সময় আনসাবস্ক্রাইব করতে পারবেন।',

    // Footer
    footerAbout: 'শখোরা (SHOKHORA) একটি আধুনিক বাংলাদেশি লাইফস্টাইল ব্র্যান্ড যা গুণগত মানসম্পন্ন স্ক্রাঞ্চি, পোশাক, কসমেটিক্স, গহনা ও কিউরেটেড উপহার নিয়ে কাজ করে।',
    footerShowroom: 'রোড ৪/এ, ধানমন্ডি, ঢাকা - ১২০৯, বাংলাদেশ',
    footerPhone: '01568923850',
    footerEmail: 'info.shokhora@gmail.com',
    footerFacebook: 'https://facebook.com/Shokhora',
    footerQuickLinks: 'প্রয়োজনীয় লিংক',
    footerCategories: 'ক্যাটাগরি সমূহ',
    footerPolicies: 'পলিসি ও সহায়তা',
    footerCustomerCare: 'গ্রাহক সেবা',
    footerShippingPolicy: 'ডেলিভারি পলিসি',
    footerReturnPolicy: 'রিটার্ন ও এক্সচেঞ্জ পলিসি',
    footerPrivacyPolicy: 'প্রাইভেসি পলিসি',
    footerTermsConditions: 'শর্তাবলী ও নিয়মাবলী',
    footerAboutUs: 'শখোরা সম্পর্কে',
    footerContactUs: 'যোগাযোগ ও শোরুম',
    footerTrackOrder: 'অর্ডার ট্র্যাক করুন',
    footerCopyright: '© ২০২৬ শখোরা (SHOKHORA)। সর্বস্বত্ব সংরক্ষিত।',
    footerPaymentPartners: 'নিরাপদ পেমেন্ট পদ্ধতি',

    // Shop Page
    shopTitle: 'সকল পণ্য কালেকশন',
    shopSubtitle: 'আমাদের লাইফস্টাইল, ফ্যাশন, বিউটি ও এক্সেসরিজ কালেকশন ব্রাউজ করুন।',
    filters: 'ফিল্টার',
    clearFilters: 'ফিল্টার মুছুন',
    categoryFilter: 'ক্যাটাগরি',
    brandFilter: 'ব্র্যান্ড / প্রস্তুতকারক',
    priceFilter: 'মূল্য সীমা',
    availabilityFilter: 'লভ্যতা',
    inStockOnly: 'শুধু স্টকে থাকা পণ্য',
    sortBy: 'বাছাই করুন',
    sortFeatured: 'নির্বাচিত',
    sortPriceLowHigh: 'মূল্য: কম থেকে বেশি',
    sortPriceHighLow: 'মূল্য: বেশি থেকে কম',
    sortNewest: 'নতুন আগমন',
    sortPopularity: 'জনপ্রিয়তা',
    showingProducts: 'প্রদর্শিত হচ্ছে',
    noProductsFound: 'নির্বাচিত ফিল্টারের সাথে কোনো পণ্য মেলেনি।',
    loadMore: 'আরও পণ্য দেখুন',

    // Product Details
    productSku: 'এসকেইউ (SKU)',
    productCategory: 'ক্যাটাগরি',
    productBrand: 'ব্র্যান্ড',
    productAvailability: 'স্টক অবস্থা',
    selectSize: 'সাইজ নির্বাচন করুন',
    selectColor: 'কালার নির্বাচন করুন',
    quantity: 'পরিমাণ',
    buyNow: 'এখনই কিনুন',
    share: 'শেয়ার করুন',
    deliveryInfoTitle: 'ডেলিভারি ও শিপিং তথ্য',
    deliveryDhaka: 'ঢাকার ভেতরে: ৳৭০ (আনুমানিক ২-৩ কার্যদিবস)',
    deliveryOutsideDhaka: 'ঢাকার বাইরে: ৳১৩০ (আনুমানিক ৩-৫ কার্যদিবস)',
    cashOnDeliveryAvail: 'সারাদেশে ক্যাশ অন ডেলিভারি সুবিধা রয়েছে',
    sevenDaysReturn: '৭ দিনের সহজ এক্সচেঞ্জ গ্যারান্টি',
    relatedProducts: 'সম্পর্কিত অন্যান্য পণ্য',

    // Cart
    cartTitle: 'আপনার শপিং ব্যাগ',
    cartEmptyTitle: 'আপনার শপিং ব্যাগটি খালি',
    cartEmptySubtitle: 'আমাদের কালেকশন ব্রাউজ করুন এবং পছন্দের পণ্য ব্যাগে যোগ করুন।',
    cartItem: 'পণ্য',
    cartPrice: 'মূল্য',
    cartQuantity: 'পরিমাণ',
    cartTotal: 'মোট',
    orderSummary: 'অর্ডারের বিবরণ',
    subtotal: 'সাবটোটাল',
    deliveryFee: 'ডেলিভারি চার্জ',
    estimatedTotal: 'সর্বমোট প্রদেয়',
    couponCode: 'কুপন কোড',
    applyCoupon: 'প্রয়োগ করুন',
    freeShippingProgress: 'ফ্রি ডেলিভারি পেতে আরও যোগ করুন',
    proceedToCheckout: 'চেকআউটে এগিয়ে যান',

    // Checkout
    checkoutTitle: 'নিরাপদ চেকআউট',
    deliveryAddressTitle: 'ডেলিভারি ঠিকানা ও তথ্য',
    fullName: 'আপনার পূর্ণ নাম',
    phoneNumber: 'সচল মোবাইল নম্বর (যেমন: 017XXXXXXXX)',
    emailOptional: 'ইমেইল অ্যাড্রেস (ঐচ্ছিক)',
    district: 'জেলা',
    selectDistrict: 'জেলা নির্বাচন করুন (৬৪ জেলা)',
    area: 'থানা / উপজেলা / এলাকা',
    fullAddress: 'সম্পূর্ণ ঠিকানা (বাসা নম্বর, রোড নম্বর, এলাকা)',
    deliveryNotes: 'ডেলিভারি সংক্রান্ত নির্দেশনা (ঐচ্ছিক)',
    paymentMethodTitle: 'পেমেন্ট পদ্ধতি নির্বাচন করুন',
    paymentCod: 'ক্যাশ অন ডেলিভারি (পণ্য পেয়ে মূল্য পরিশোধ)',
    paymentCodDesc: 'ডেলিভারি রাইডারের কাছ থেকে পার্সেল বুঝে পেয়ে নগদ টাকা পরিশোধ করুন।',
    paymentBkash: 'বিকাশ ম্যানুয়াল পেমেন্ট',
    paymentBkashDesc: 'আমাদের মার্চেন্ট নম্বরে বিকাশ সেন্ড মানি করে নিচে TrxID প্রদান করুন।',
    paymentBkashInstructions: 'বিকাশ পার্সোনাল / মার্চেন্ট নম্বর: 01568923850 (Send Money / Payment)',
    paymentNagad: 'নগদ ম্যানুয়াল পেমেন্ট',
    paymentNagadDesc: 'আমাদের নগদ মার্চেন্ট নম্বরে টাকা পাঠিয়ে নিচে TrxID প্রদান করুন।',
    paymentNagadInstructions: 'নগদ পার্সোনাল / মার্চেন্ট নম্বর: 01568923850 (Send Money / Payment)',
    trxIdPlaceholder: 'বিকাশ/নগদ ট্রানজেকশন আইডি (TrxID) লিখুন',
    placeOrder: 'অর্ডার নিশ্চিত করুন (ডেমো অর্ডার)',
    placingOrder: 'অর্ডার প্রসেস হচ্ছে...',
    checkoutDisclaimer: 'বিজ্ঞপ্তি: এটি ফেজ ১ ফ্রন্টএন্ড প্রোটোটাইপ। অর্ডারটি টেস্ট করার জন্য ব্রাউজারের লোকাল স্টোরেজে সেভ থাকবে।',

    // Search Page
    searchPageTitle: 'পণ্য অনুসন্ধান',
    searchResultsFor: 'অনুসন্ধানের ফলাফল:',
    noSearchResults: 'আপনার অনুসন্ধানের সাথে কোনো পণ্য মেলেনি।',
    popularCategories: 'জনপ্রিয় ক্যাটাগরি সমূহ',

    // Wishlist Page
    wishlistTitle: 'পছন্দের তালিকা (উইশলিস্ট)',
    wishlistSubtitle: 'আপনার পছন্দের পণ্যগুলো এখানে সংরক্ষিত রয়েছে, যেকোনো সময় ব্যাগে যোগ করুন।',
    wishlistEmptyTitle: 'আপনার পছন্দের তালিকাটি খালি',
    wishlistEmptySubtitle: 'আমাদের ক্যাটালগ ঘুরে দেখে হার্ট আইকনে ক্লিক করে প্রিয় পণ্য সংরক্ষণ করুন।',
    moveToCart: 'ব্যাগে নিন',
    removeFromWishlist: 'মুছে ফেলুন',

    // Customer Account
    accountOverview: 'অ্যাকাউন্ট বিবরণ',
    profileSettings: 'প্রোফাইল সেটিংস',
    orderHistory: 'অর্ডারের ইতিহাস',
    savedAddresses: 'সংরক্ষিত ঠিকানা',
    logout: 'লগআউট',
    recentOrders: 'সাম্প্রতিক অর্ডার',
    viewAllOrders: 'সকল অর্ডার দেখুন',
    addNewAddress: 'নতুন ঠিকানা যোগ করুন',
    noOrdersYet: 'আপনার কোনো পূর্ববর্তী অর্ডার নেই।',
    noAddressesYet: 'কোনো সংরক্ষিত ডেলিভারি ঠিকানা পাওয়া যায়নি।',
    demoAccountNotice: 'কাস্টমার অ্যাকাউন্ট মোড: আপনার ব্রাউজারের অর্ডার হিস্ট্রি এবং ডেলিভারি অ্যাড্রেস প্রদর্শিত হচ্ছে।',

    // Policies & Info
    shippingPolicyTitle: 'ডেলিভারি ও শিপিং পলিসি',
    returnPolicyTitle: 'রিটার্ন ও এক্সচেঞ্জ পলিসি',
    privacyPolicyTitle: 'গোপনীয়তা ও প্রাইভেসী নীতি',
    termsConditionsTitle: 'শর্তাবলী ও নিয়মাবলী',
    aboutUsTitle: 'শখোরা সম্পর্কে',
    contactUsTitle: 'যোগাযোগ ও শোরুম',
    sendMessage: 'আমাদের বার্তা পাঠান',
    messageSuccess: 'ধন্যবাদ! আপনার বার্তাটি আমাদের গ্রাহক সেবা টিমের কাছে পৌঁছে গেছে।',

    allProducts: 'সকল পণ্য',
    login: 'লগইন',
    clearCart: 'ব্যাগ খালি করুন',
    emptyCart: 'আপনার শপিং ব্যাগটি খালি',
    deliveryLocation: 'ডেলিভারির এলাকা',
    insideDhaka: 'ঢাকা সিটি',
    outsideDhaka: 'ঢাকার বাইরে',
    promoCode: 'প্রোমো কোড',
    apply: 'প্রয়োগ',
    discount: 'ছাড়',
    total: 'মোট',
  },
};
