'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Bell, ChevronLeft, CircleUserRound, Gamepad2, Gift, Home, Menu, Mic2, Search, Store, Wallet, Zap } from 'lucide-react'
import { SenoLogo } from '@/components/branding/seno-logo'

const heroImage = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/file_000000000ad4820abc10f3931c57ed2e-78YYVVT1FDlr4sxreXzsP79byxbL4Z.png'

type Category = { label: string; href: string; icon: typeof Gamepad2; accent: string }
type Product = { name: string; slug: string; mark: string; tone: string }

const categories: Category[] = [
  { label: 'شحن الألعاب', href: '/store/games', icon: Gamepad2, accent: 'border-red-500/80 text-red-300' },
  { label: 'تطبيقات الصوت', href: '/store/apps', icon: Mic2, accent: 'border-blue-500/80 text-blue-300' },
  { label: 'البطاقات الرقمية', href: '/store/gift-cards', icon: Gift, accent: 'border-fuchsia-500/80 text-fuchsia-300' },
  { label: 'خدمات أخرى', href: '/store/services', icon: Zap, accent: 'border-amber-400/80 text-amber-300' },
]

const products: Product[] = [
  { name: 'PUBG Mobile', slug: 'pubg-mobile', mark: 'PUBG MOBILE', tone: 'from-sky-950 via-blue-950 to-black' },
  { name: 'Sahra Chat', slug: 'sahra-chat', mark: 'SAHRA', tone: 'from-fuchsia-950 via-purple-950 to-black' },
  { name: 'Google Play', slug: 'google-play', mark: '▶ Google Play', tone: 'from-cyan-950 via-slate-900 to-black' },
  { name: 'Free Fire', slug: 'free-fire', mark: 'FREE FIRE', tone: 'from-orange-950 via-red-950 to-black' },
]

function HomeHeader({ onMenu }: { onMenu: () => void }) {
  return <header className="flex items-center justify-between gap-3 py-5 sm:py-7" dir="ltr">
    <Link href="/" className="flex items-center gap-2" aria-label="Seno Store home">
<SenoLogo className="w-40 sm:w-48" />
    </Link>
    <div className="flex items-center gap-2">
      <Link href="/wallet" className="flex items-center gap-2 rounded-full border border-amber-400/50 bg-white/[.035] px-3 py-2 text-sm text-white sm:px-4"><Wallet className="size-4 text-amber-300" /> <span>500.00 EGP</span></Link>
      <button aria-label="الإشعارات" className="relative grid size-10 place-items-center rounded-full border border-white/10 text-amber-200"><Bell className="size-5" /><i className="absolute right-1 top-1 size-2 rounded-full bg-red-500" /></button>
      
    </div>
  </header>
}

function Hero() {
  return <section className="relative overflow-hidden rounded-3xl border border-red-500/80 bg-black shadow-[0_0_24px_rgba(239,68,68,.12)]" dir="rtl">
    <img src={heroImage} alt="عروض Seno Store للألعاب والبطاقات الرقمية" className="absolute inset-0 size-full object-cover object-[center_22%] opacity-60" />
    <div className="relative flex min-h-56 items-end bg-gradient-to-l from-black/5 via-black/25 to-black/80 p-5 sm:min-h-64 sm:p-8">
      <div className="max-w-sm"><p className="mb-2 text-sm text-zinc-300">SENO STORE BY REDLINE</p><h1 className="text-3xl font-black leading-tight text-white sm:text-4xl">كل ما تحتاجه<br /><span className="text-amber-300">في مكان واحد</span></h1><p className="mt-3 text-sm text-zinc-200">شحن الألعاب - التطبيقات - البطاقات الرقمية</p><Link href="/store" className="mt-5 inline-flex items-center gap-2 rounded-full bg-red-600 px-5 py-2.5 text-sm font-bold text-white shadow-[0_0_18px_rgba(239,68,68,.4)]">تسوق الآن <ChevronLeft className="size-4" /></Link></div>
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2"><i className="size-2.5 rounded-full bg-red-500" /><i className="size-2.5 rounded-full bg-white/30" /><i className="size-2.5 rounded-full bg-white/30" /></div>
    </div>
  </section>
}

function Categories() {
  return <section dir="rtl"><div className="mb-4 flex items-center justify-between"><h2 className="text-xl font-black text-white sm:text-2xl">الأقسام</h2><Link href="/store" className="text-sm font-bold text-red-400">عرض الكل</Link></div><div className="grid grid-cols-2 gap-3 sm:grid-cols-4">{categories.map(({ label, href, icon: Icon, accent }) => <Link href={href} key={href} className={`flex min-h-32 flex-col items-center justify-center gap-4 rounded-2xl border bg-white/[.02] p-3 text-center transition hover:-translate-y-0.5 hover:bg-white/[.05] ${accent}`}><Icon className="size-10" strokeWidth={1.6} /><span className="text-sm font-bold text-white">{label}</span></Link>)}</div></section>
}

function ProductCard({ product }: { product: Product }) {
  return <Link href={`/product/${product.slug}`} className="group overflow-hidden rounded-2xl border border-white/10 bg-[#0b0c0f] transition hover:-translate-y-1 hover:border-amber-400/60" dir="rtl"><div className={`flex h-32 items-center justify-center bg-gradient-to-br ${product.tone} p-3`}><span className="text-center text-xl font-black text-white drop-shadow-[0_0_10px_rgba(255,0,0,.45)]">{product.mark}</span></div><div className="flex items-center justify-between gap-2 p-3"><h3 className="text-sm font-bold text-white">{product.name}</h3><span className="grid size-8 place-items-center rounded-full border border-amber-400/60 text-amber-300 transition group-hover:bg-amber-300 group-hover:text-black"><ChevronLeft className="size-4" /></span></div></Link>
}


export default function Page() {
  return <main className="min-h-screen bg-[#050506] pb-24 text-white" dir="rtl"><div className="mx-auto max-w-5xl px-4 sm:px-6"><HomeHeader onMenu={() => {}} /><div className="flex flex-col gap-8 pb-8"><Hero /><label className="flex h-14 items-center gap-3 rounded-full border border-white/15 bg-white/[.035] px-5 text-zinc-400" aria-label="البحث عن منتج أو فئة"><Search className="size-6 shrink-0" /><input className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-zinc-500" placeholder="ابحث عن منتج أو فئة..." /></label><Categories /><section dir="rtl"><div className="mb-4 flex items-center justify-between"><h2 className="flex items-center gap-2 text-xl font-black text-white sm:text-2xl">أشهر المنتجات <span className="text-red-500">♨</span></h2><Link href="/store" className="text-sm font-bold text-red-400">عرض الكل</Link></div><div className="grid grid-cols-2 gap-3 sm:grid-cols-4">{products.map((product) => <ProductCard key={product.slug} product={product} />)}</div></section></div></div></main>
}
