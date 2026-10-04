export type DigitalCardPackage = {
  id: string
  denomination: number
  denominationCurrency: string
  sellingPrice: number
  sellingCurrency: string
  region?: string
  oldPrice?: number
  discount?: number
  available: boolean
}

export type StoreProduct = {
  name: string
  slug: string
  detail: string
  oldPrice: number
  price: number
  discountPercentage: number
  category: 'شحن الألعاب' | 'تطبيقات الصوت' | 'البطاقات الرقمية' | 'خدمات أخرى'
  imagePosition: string
  imageUrl?: string
  digitalCardPackages?: DigitalCardPackage[]
  isAvailable: boolean
}

export const storeProducts: StoreProduct[] = [
  { name: 'PUBG Mobile', slug: 'pubg-mobile', detail: '660 UC', oldPrice: 800, price: 680, discountPercentage: 15, category: 'شحن الألعاب', imagePosition: '50% 65%', isAvailable: true },
  { name: 'Free Fire', slug: 'free-fire', detail: '100 Diamonds', oldPrice: 140, price: 110, discountPercentage: 21, category: 'شحن الألعاب', imagePosition: '50% 67%', isAvailable: true },
  { name: 'Mobile Legends', slug: 'mobile-legends', detail: '86 Diamonds', oldPrice: 125, price: 100, discountPercentage: 20, category: 'شحن الألعاب', imagePosition: '50% 72%', isAvailable: false },
  { name: 'Sahra Chat', slug: 'sahra-chat', detail: '6,000 Masa', oldPrice: 300, price: 240, discountPercentage: 20, category: 'تطبيقات الصوت', imagePosition: '50% 76%', isAvailable: false },
  { name: 'Call of Duty Mobile', slug: 'call-of-duty-mobile', detail: 'CP', oldPrice: 100, price: 100, discountPercentage: 0, category: 'شحن الألعاب', imagePosition: '50% 58%', isAvailable: true },
  { name: 'TikTok', slug: 'tiktok', detail: 'Coins', oldPrice: 100, price: 100, discountPercentage: 0, category: 'تطبيقات الصوت', imagePosition: '50% 42%', isAvailable: true },
  { name: 'Bigo Live', slug: 'bigo-live', detail: 'Diamonds', oldPrice: 100, price: 100, discountPercentage: 0, category: 'تطبيقات الصوت', imagePosition: '50% 48%', isAvailable: true },
  { name: 'Google Play', slug: 'google-play', detail: 'بطاقات رقمية', oldPrice: 600, price: 550, discountPercentage: 8, category: 'البطاقات الرقمية', imagePosition: '50% 30%', imageUrl: '/images/category-gift-cards.png', isAvailable: true, digitalCardPackages: [{ id: 'google-play-us-5', denomination: 5, denominationCurrency: '$', sellingPrice: 280, sellingCurrency: 'EGP', region: 'USA', available: true }, { id: 'google-play-us-10', denomination: 10, denominationCurrency: '$', sellingPrice: 550, sellingCurrency: 'EGP', region: 'USA', oldPrice: 600, discount: 8, available: true }, { id: 'google-play-us-25', denomination: 25, denominationCurrency: '$', sellingPrice: 1300, sellingCurrency: 'EGP', region: 'USA', available: true }, { id: 'google-play-us-50', denomination: 50, denominationCurrency: '$', sellingPrice: 2550, sellingCurrency: 'EGP', region: 'USA', available: false }, { id: 'google-play-us-100', denomination: 100, denominationCurrency: '$', sellingPrice: 5000, sellingCurrency: 'EGP', region: 'USA', available: false }] },
  { name: 'Apple Gift Card', slug: 'apple-gift-card', detail: 'Digital Card', oldPrice: 100, price: 100, discountPercentage: 0, category: 'البطاقات الرقمية', imagePosition: '50% 25%', isAvailable: true },
  { name: 'PlayStation', slug: 'playstation', detail: 'PSN Card', oldPrice: 100, price: 100, discountPercentage: 0, category: 'البطاقات الرقمية', imagePosition: '50% 55%', isAvailable: true },
  { name: 'Steam', slug: 'steam', detail: 'Steam Wallet', oldPrice: 100, price: 100, discountPercentage: 0, category: 'البطاقات الرقمية', imagePosition: '50% 60%', isAvailable: true },
  { name: 'خدمات رقمية', slug: 'digital-services', detail: 'خدمات رقمية', oldPrice: 100, price: 100, discountPercentage: 0, category: 'خدمات أخرى', imagePosition: '50% 86%', isAvailable: true },
]

export const discountedProducts = storeProducts.filter((product) => product.oldPrice > product.price && product.discountPercentage > 0)
