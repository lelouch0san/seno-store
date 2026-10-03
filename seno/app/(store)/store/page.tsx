'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Bell, ChevronDown, ChevronLeft, CircleUserRound, ClipboardList, Gamepad2, Gift, Home, Menu, MoreHorizontal, Search, ShoppingCart, Smartphone, Store, Wallet, X } from 'lucide-react'
import { SenoLogo } from '@/components/branding/seno-logo'

const artwork = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/file_0000000015f4820aad3a7637b56e3f84-WGC1XKchVlp1uO7orecqwKhbJ0S36M.png'

const tabs = [
  { label: 'الكل', icon: MoreHorizontal, href: '/store' },
  { label: 'الألعاب', icon: Gamepad2, href: '/store/games' },
  { label: 'التطبيقات', icon: Smartphone, href: '/store/apps' },
  { label: 'البطاقات الرقمية', icon: Gift, href: '/store/gift-cards' },
  { label: 'خدمات أخرى', icon: MoreHorizontal, href: '/store/services' },
]

const banners = [
  { title: 'شحن الألعاب', desc: 'اشحن حساباتك في جميع الألعاب الشهيرة', count: '+50 لعبة', cta: 'استكشف الألعاب', href: '/store/games', tone: 'border-red-600/80', position: 'object-[50%_20%]' },
  { title: 'شحن التطبيقات', desc: 'اشحن رصيدك في أفضل التطبيقات', count: '+30 تطبيق', cta: 'استكشف التطبيقات', href: '/store/apps', tone: 'border-amber-500/70', position: 'object-[50%_43%]' },
  { title: 'البطاقات الرقمية', desc: 'بطاقاتك الرقمية بأمان وسرعة', count: '+100 بطاقة', cta: 'تصفح البطاقات', href: '/store/gift-cards', tone: 'border-amber-500/70', position: 'object-[50%_66%]' },
  { title: 'خدمات أخرى', desc: 'خدمات متنوعة تناسب احتياجاتك', count: '+20 خدمة', cta: 'استكشف الخدمات', href: '/store/services', tone: 'border-sky-500/70', position: 'object-[50%_88%]' },
]

const products = [
  { name: 'PUBG Mobile', detail: '660 UC', price: '680 EGP', pos: 'object-[50%_65%]' },
  { name: 'Free Fire', detail: '100 Diamonds', price: '110 EGP', pos: 'object-[50%_67%]' },
  { name: 'Mobile Legends', detail: '86 Diamonds', price: '100 EGP', pos: 'object-[50%_72%]' },
  { name: 'Sahra Chat', detail: '6,000 Masa', price: '240 EGP', pos: 'object-[50%_76%]' },
]

function Header({ onMenu }: { onMenu: () => void }) {
  return <header className="flex flex-col gap-6 pt-5 sm:pt-8"><div className="flex items-center justify-between gap-3" dir="ltr"><SenoLogo className="w-40" /><div className="flex items-center gap-2 sm:gap-5"><div className="hidden items-center gap-3 rounded-full border border-red-500/60 bg-white/[0.04] px-5 py-3 text-lg sm:flex"><Wallet className="text-amber-300" />500.00 EGP<ChevronDown className="size-4 text-amber-400" /></div><button aria-label="الإشعارات" className="relative p-2 text-amber-300"><Bell /><i className="absolute right-1 top-1 size-2.5 rounded-full bg-red-500" /></button><button aria-label="الحساب" className="grid size-11 place-items-center rounded-full border border-amber-400 bg-zinc-900"><CircleUserRound className="text-amber-200" /></button></div></div><label className="flex h-16 items-center gap-4 rounded-full border border-white/35 bg-white/[0.045] px-6 text-zinc-400" dir="rtl"><input aria-label="البحث" className="min-w-0 flex-1 bg-transparent text-base text-white outline-none placeholder:text-zinc-400 sm:text-lg" placeholder="إبحث عن لعبة أو تطبيق أو بطاقة رقمية..." /><Search className="size-7 shrink-0" /></label></header>
}

function CategoryTabs() {
  return <nav className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0" dir="rtl">{tabs.map(({ label, icon: Icon, href }, index) => <Link href={href} key={label} className={`flex min-w-[7.5rem] shrink-0 flex-col items-center gap-2 rounded-2xl border px-4 py-4 text-sm font-bold transition ${index === 0 ? 'border-red-500 bg-red-700/70 text-white shadow-[0_0_22px_rgba(255,20,35,.45)]' : 'border-white/10 bg-zinc-950/80 text-white hover:border-amber-500/60'}`}><Icon className={index === 0 ? 'text-white' : 'text-amber-300'} /><span>{label}</span></Link>)}</nav>
}

function CategoryBanner({ item }: { item: typeof banners[number] }) {
  return <article className={`relative min-h-44 overflow-hidden rounded-3xl border ${item.tone} bg-black`} dir="rtl"><img src={artwork} alt="" className={`absolute inset-0 size-full object-cover opacity-80 ${item.position}`} /><div className="absolute inset-0 bg-gradient-to-l from-black via-black/60 to-transparent" /><div className="relative flex min-h-44 flex-col items-start justify-center gap-2 px-6 py-5 sm:px-10"><span className="text-sm text-amber-300">{item.count}</span><h2 className="text-2xl font-black text-white sm:text-3xl">{item.title}</h2><p className="text-sm text-zinc-200 sm:text-base">{item.desc}</p><Link href={item.href} className="mt-2 rounded-full bg-red-600 px-5 py-2 text-sm font-bold text-white shadow-[0_0_18px_rgba(255,0,30,.35)]">{item.cta}<ChevronLeft className="mr-2 inline size-4" /></Link></div></article>
}

function ProductCard({ product, first }: { product: typeof products[number]; first?: boolean }) {
  return <article className="min-w-[13rem] overflow-hidden rounded-2xl border border-amber-600/60 bg-zinc-950 shadow-[0_0_16px_rgba(255,190,0,.06)] sm:min-w-0"><div className="relative h-40 overflow-hidden bg-zinc-900"><img src={artwork} alt={product.name} className={`size-full object-cover opacity-90 ${product.pos}`} />{first && <span className="absolute right-2 top-2 rounded-full bg-red-600 px-2 py-1 text-[10px] font-bold">الأكثر طلباً</span>}</div><div className="p-3" dir="rtl"><h3 className="font-bold text-white">{product.name}</h3><p className="mt-1 text-sm text-zinc-200">{product.detail}</p><div className="mt-3 flex items-center gap-2" dir="ltr"><button aria-label={`إضافة ${product.name} للسلة`} className="grid size-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-amber-300 to-orange-600 text-black"><ShoppingCart className="size-5" /></button><button className="flex-1 rounded-xl border border-amber-500 px-2 py-2 text-sm font-bold text-amber-300">{product.price}</button></div></div></article>
}


export default function StorePage() {
  return <main className="min-h-screen bg-[#050506] pb-28 text-white" dir="rtl"><div className="mx-auto max-w-5xl px-4 sm:px-6"><Header onMenu={() => {}} /><div className="flex flex-col gap-7 py-7"><CategoryTabs /><section className="grid gap-5">{banners.map((item) => <CategoryBanner key={item.title} item={item} />)}</section><section><div className="mb-4 flex items-center justify-between"><h2 className="text-2xl font-black">الأكثر طلباً <span className="text-red-500">♨</span></h2><button className="text-amber-300">عرض الكل <ChevronLeft className="inline size-4" /></button></div><div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:px-0 lg:grid-cols-4">{products.map((product, index) => <ProductCard key={product.name} product={product} first={index === 0} />)}</div></section><section className="relative overflow-hidden rounded-3xl border border-red-600 bg-black px-6 py-6 text-center shadow-[0_0_24px_rgba(255,0,30,.2)] sm:flex sm:items-center sm:justify-between sm:text-right"><img src={artwork} alt="" className="absolute inset-0 size-full object-cover object-[50%_96%] opacity-60" /><div className="relative"><h2 className="text-2xl font-black text-white">عروض وخصومات حصرية</h2><p className="mt-1 text-sm text-zinc-200">لا تفوت أفضل العروض على جميع المنتجات</p></div><button className="relative mt-4 rounded-full bg-red-600 px-6 py-3 font-bold sm:mt-0">شاهد العروض <ChevronLeft className="mr-1 inline size-4" /></button></section></div></div></main>
}
