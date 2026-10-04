'use client'

import Link from 'next/link'
import { ArrowRight, ChevronLeft, Search, ShoppingBag } from 'lucide-react'
import { useMemo, useState } from 'react'
import { SenoLogo } from '@/components/branding/seno-logo'
import { storeProducts } from '@/lib/store-products'

export type StoreCategory = 'games' | 'apps' | 'gift-cards' | 'services'
type CatalogItem = { slug: string; name: string; description: string; detail: string; imagePosition: string; available: boolean; region?: string; denominations?: string[]; serviceType?: string }

const categoryMeta: Record<StoreCategory, { search: string; badge: string; filters: string[]; layout: string }> = {
  games: { search: 'ابحث عن اللعبة...', badge: 'مركز الألعاب', filters: ['الأكثر طلبًا', 'الأحدث', 'كل الألعاب'], layout: 'games' },
  apps: { search: 'ابحث عن التطبيق...', badge: 'خدمات التطبيقات', filters: ['الأكثر استخدامًا', 'الأحدث', 'كل التطبيقات'], layout: 'apps' },
  'gift-cards': { search: 'ابحث عن بطاقة...', badge: 'بطاقات رقمية موثوقة', filters: ['كل البطاقات', 'Gaming', 'Entertainment', 'Shopping'], layout: 'gift-cards' },
  services: { search: 'ابحث عن خدمة...', badge: 'حلول رقمية مرنة', filters: ['كل الخدمات', 'الأكثر طلبًا', 'الجديدة'], layout: 'services' },
}

const artwork = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/file_0000000015f4820aad3a7637b56e3f84-WGC1XKchVlp1uO7orecqwKhbJ0S36M.png'

const catalog: Record<StoreCategory, CatalogItem[]> = {
  games: [
    { slug: 'pubg-mobile', name: 'PUBG Mobile', description: 'شحن شدات ببجي بسرعة وأمان', detail: 'UC وشحن مباشر', imagePosition: 'object-[50%_65%]', available: true },
    { slug: 'free-fire', name: 'Free Fire', description: 'اشحن جواهر فري فاير', detail: 'Diamonds', imagePosition: 'object-[50%_67%]', available: true },
    { slug: 'mobile-legends', name: 'Mobile Legends', description: 'شحن الماسات داخل اللعبة', detail: 'Diamonds', imagePosition: 'object-[50%_72%]', available: false },
    { slug: 'call-of-duty-mobile', name: 'Call of Duty Mobile', description: 'نقاط CP لحسابك', detail: 'CP', imagePosition: 'object-[50%_58%]', available: true },
  ],
  apps: [
    { slug: 'sahra-chat', name: 'Sahra Chat', description: 'اشحن عملاتك داخل التطبيق', detail: 'Masa', imagePosition: 'object-[50%_76%]', available: false },
    { slug: 'tiktok', name: 'TikTok', description: 'شحن عملات تيك توك', detail: 'Coins', imagePosition: 'object-[50%_42%]', available: true },
    { slug: 'bigo-live', name: 'Bigo Live', description: 'شحن رصيد البث المباشر', detail: 'Diamonds', imagePosition: 'object-[50%_48%]', available: true },
  ],
  'gift-cards': [
    { slug: 'google-play', name: 'Google Play', description: 'بطاقات رقمية لخدمات Google', detail: 'بطاقات رقمية', imagePosition: 'object-[50%_30%]', available: true, region: 'متاحة حسب المنطقة', denominations: ['5', '10', '25'] },
    { slug: 'apple-gift-card', name: 'Apple Gift Card', description: 'بطاقات App Store وApple', detail: 'Digital Card', imagePosition: 'object-[50%_25%]', available: true },
    { slug: 'playstation', name: 'PlayStation', description: 'بطاقات شحن بلايستيشن', detail: 'PSN Card', imagePosition: 'object-[50%_55%]', available: true },
    { slug: 'steam', name: 'Steam', description: 'بطاقات ألعاب Steam', detail: 'Steam Wallet', imagePosition: 'object-[50%_60%]', available: true },
  ],
  services: [
    { slug: 'digital-services', name: 'خدمات رقمية', description: 'خدمات رقمية متنوعة من SENO STORE', detail: 'خدمات رقمية', imagePosition: 'object-[50%_86%]', available: true, serviceType: 'خدمة رقمية' },
  ],
}

const labels: Record<StoreCategory, { title: string; subtitle: string }> = {
  games: { title: 'شحن الألعاب', subtitle: 'اشحن ألعابك المفضلة بسرعة وأمان' },
  apps: { title: 'شحن التطبيقات', subtitle: 'اشحن تطبيقاتك وخدماتك الرقمية بسهولة' },
  'gift-cards': { title: 'البطاقات الرقمية', subtitle: 'بطاقات رقمية وشحن مباشر لأشهر الخدمات' },
  services: { title: 'خدمات أخرى', subtitle: 'خدمات رقمية متنوعة' },
}

export function StoreCategoryPage({ category }: { category: StoreCategory }) {
  const [query, setQuery] = useState('')
  const { title, subtitle } = labels[category]
  const meta = categoryMeta[category]
  const items = useMemo(() => catalog[category].filter((item) => `${item.name} ${item.description}`.toLowerCase().includes(query.toLowerCase())).map((item) => ({ ...item, available: storeProducts.find((product) => product.slug === item.slug)?.isAvailable ?? item.available })), [category, query])
  return <main className="min-h-screen bg-[#050506] pb-32 text-white" dir="rtl"><div className="mx-auto max-w-6xl px-4 sm:px-6"><header className="flex items-center justify-between gap-4 py-6"><Link href="/store" className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-zinc-200"><ArrowRight className="size-4" /> العودة إلى المتجر</Link><SenoLogo className="w-36" /></header><nav className="mb-6 flex flex-wrap gap-2 text-sm"><Link href="/" className="text-zinc-400 hover:text-amber-300">الرئيسية</Link><span className="text-zinc-600">/</span><Link href="/store" className="text-zinc-400 hover:text-amber-300">المتجر</Link><span className="text-zinc-600">/</span><span className="text-amber-300">{title}</span></nav><section className="rounded-3xl border border-red-600/70 bg-gradient-to-l from-red-950/70 via-[#0b1014] to-black p-6 shadow-[0_0_28px_rgba(255,0,30,.13)] sm:p-10"><p className="text-sm text-amber-300">{meta.badge}</p><h1 className="mt-2 text-3xl font-black sm:text-5xl">{title}</h1><p className="mt-3 text-zinc-300 sm:text-lg">{subtitle}</p></section><div className="my-6 flex h-14 items-center gap-3 rounded-2xl border border-white/15 bg-white/[0.04] px-4"><Search className="size-5 text-amber-300" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={meta.search} className="min-w-0 flex-1 bg-transparent text-white outline-none placeholder:text-zinc-500" /></div><div className="mb-6 flex gap-2 overflow-x-auto pb-1" role="group" aria-label="فلاتر المنتجات">{meta.filters.map((filter, index) => <button key={filter} type="button" className={`shrink-0 rounded-full border px-4 py-2 text-sm transition ${index === 0 ? 'border-red-500 bg-red-600/20 text-amber-200 shadow-[0_0_14px_rgba(255,0,30,.2)]' : 'border-white/10 bg-white/[0.03] text-zinc-400 hover:border-amber-500/50 hover:text-white'}`}>{filter}</button>)}</div>{items.length ? <section className={`grid grid-cols-2 gap-3 sm:grid-cols-3 ${category === 'apps' ? 'lg:grid-cols-5' : category === 'gift-cards' ? 'lg:grid-cols-3' : 'lg:grid-cols-4'}`}>{items.map((item) => <Link href={`/product/${item.slug}`} key={item.slug} className="group overflow-hidden rounded-2xl border border-amber-600/50 bg-zinc-950 shadow-[0_0_18px_rgba(255,190,0,.05)] transition hover:-translate-y-1 hover:border-red-500"><div className="relative h-36 overflow-hidden bg-zinc-900 sm:h-48"><img src={artwork} alt={item.name} className={`size-full object-cover opacity-90 transition group-hover:scale-105 ${item.imagePosition}`} /><span className="absolute right-2 top-2 rounded-full bg-emerald-600/90 px-2 py-1 text-[10px] font-bold">متاح</span></div><div className="p-4"><p className="text-xs text-amber-300">{item.detail}</p><h2 className="mt-1 font-black">{item.name}</h2><p className="mt-2 min-h-10 text-xs leading-5 text-zinc-400">{item.description}</p><span className="mt-4 flex items-center justify-between rounded-xl border border-red-500/60 px-3 py-2 text-sm font-bold text-red-200">عرض المنتج <ChevronLeft className="size-4" /></span></div></Link>)}</section> : <section className="rounded-3xl border border-white/10 bg-zinc-950/70 p-10 text-center"><ShoppingBag className="mx-auto size-12 text-amber-300" /><h2 className="mt-4 text-xl font-black">لا توجد منتجات متاحة حالياً</h2><p className="mt-2 text-zinc-400">نعمل على إضافة منتجات جديدة لهذا القسم قريباً.</p><Link href="/store" className="mt-6 inline-flex rounded-xl bg-red-600 px-6 py-3 font-bold">العودة إلى المتجر</Link></section>}<p className="mt-6 text-center text-xs text-zinc-500">المنتجات والأسعار يتم تحديثها من كتالوج المتجر.</p></div></main>
}

export { labels }
