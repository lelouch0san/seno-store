export type StoreProduct = {
  name: string
  slug: string
  detail: string
  oldPrice: number
  price: number
  discountPercentage: number
  category: 'شحن الألعاب' | 'تطبيقات الصوت' | 'البطاقات الرقمية' | 'خدمات أخرى'
  imagePosition: string
  isAvailable: boolean
}

export const storeProducts: StoreProduct[] = [
  { name: 'PUBG Mobile', slug: 'pubg-mobile', detail: '660 UC', oldPrice: 800, price: 680, discountPercentage: 15, category: 'شحن الألعاب', imagePosition: '50% 65%', isAvailable: true },
  { name: 'Free Fire', slug: 'free-fire', detail: '100 Diamonds', oldPrice: 140, price: 110, discountPercentage: 21, category: 'شحن الألعاب', imagePosition: '50% 67%', isAvailable: true },
  { name: 'Mobile Legends', slug: 'mobile-legends', detail: '86 Diamonds', oldPrice: 125, price: 100, discountPercentage: 20, category: 'شحن الألعاب', imagePosition: '50% 72%', isAvailable: true },
  { name: 'Sahra Chat', slug: 'sahra-chat', detail: '6,000 Masa', oldPrice: 300, price: 240, discountPercentage: 20, category: 'تطبيقات الصوت', imagePosition: '50% 76%', isAvailable: false },
]

export const discountedProducts = storeProducts.filter((product) => product.oldPrice > product.price && product.discountPercentage > 0)
