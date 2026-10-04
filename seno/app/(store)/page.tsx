'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, CircleUserRound, Home, Menu, Search, Store, Wallet } from 'lucide-react'
import { SenoLogo } from '@/components/branding/seno-logo'
import { SidebarTrigger } from '@/components/global-sidebar'

const heroSlides = [
  { image: '/images/hero/hero-storefront.png', alt: 'شعار SENO STORE مع يد تحكم وسماعة وبطاقات رقمية', position: 'center 22%' },
  { image: '/images/hero/hero-games.png', alt: 'ألعاب وشخصيات وبطاقات ألعاب من SENO STORE', position: 'center 22%' },
]

type Category = { label: string; href: string; image: string; accent: string }
type Product = { name: string; slug: string; mark: string; tone: string; isAvailable: boolean }

const categories: Category[] = [
  { label: 'شحن الألعاب', href: '/store/games', image: '/images/category-games.png', accent: 'border-red-500/80' },
  { label: 'تطبيقات الصوت', href: '/store/apps', image: '/images/category-apps.png', accent: 'border-blue-500/80' },
  { label: 'البطاقات الرقمية', href: '/store/gift-cards', image: '/images/category-gift-cards.png', accent: 'border-fuchsia-500/80' },
  { label: 'خدمات أخرى', href: '/store/services', image: '/images/category-services.png', accent: 'border-amber-400/80' },
]

const products: Product[] = [
  { name: 'PUBG Mobile', slug: 'pubg-mobile', mark: 'PUBG MOBILE', tone: 'from-sky-950 via-blue-950 to-black', isAvailable: true },
  { name: 'Sahra Chat', slug: 'sahra-chat', mark: 'SAHRA', tone: 'from-fuchsia-950 via-purple-950 to-black', isAvailable: false },
  { name: 'Google Play', slug: 'google-play', mark: '▶ Google Play', tone: 'from-cyan-950 via-slate-900 to-black', isAvailable: true },
  { name: 'Free Fire', slug: 'free-fire', mark: 'FREE FIRE', tone: 'from-orange-950 via-red-950 to-black', isAvailable: true },
]

function HomeHeader({ onMenu }: { onMenu: () => void }) {
  return <header className="flex items-center justify-between gap-3 py-5 sm:py-7" dir="ltr">
    <Link href="/" className="flex items-center gap-2" aria-label="Seno Store home">
<SenoLogo className="w-40 sm:w-48" />
    </Link>
    <div className="flex items-center gap-2">
      <Link href="/wallet" className="flex items-center gap-2 rounded-full border border-amber-400/50 bg-white/[.035] px-3 py-2 text-sm text-white sm:px-4"><Wallet className="size-4 text-amber-300" /> <span>500.00 EGP</span></Link>
          <SidebarTrigger />
    </div>
  </header>
}

function Hero() {
  const [activeSlide, setActiveSlide] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const touchStart = useRef<number | null>(null)

  useEffect(() => {
    if (isPaused) return
    const timer = window.setInterval(() => setActiveSlide((current) => (current + 1) % heroSlides.length), 5500)
    return () => window.clearInterval(timer)
  }, [isPaused])

  useEffect(() => {
    const handleVisibility = () => setIsPaused(document.hidden)
    document.addEventListener('visibilitychange', handleVisibility)
    return () => document.removeEventListener('visibilitychange', handleVisibility)
  }, [])

  const goToSlide = (index: number) => {
    setActiveSlide(index)
    setIsPaused(true)
    window.setTimeout(() => setIsPaused(false), 7000)
  }

  const goNext = () => goToSlide((activeSlide + 1) % heroSlides.length)
  const goPrevious = () => goToSlide((activeSlide - 1 + heroSlides.length) % heroSlides.length)

  return <section className="relative aspect-[361/224] min-h-56 overflow-hidden rounded-3xl border border-red-500/80 bg-black shadow-[0_0_24px_rgba(239,68,68,.12)] sm:aspect-auto sm:min-h-64" dir="rtl" aria-roledescription="carousel" aria-label="عروض SENO STORE" tabIndex={0} onKeyDown={(event) => { if (event.key === 'ArrowLeft') goNext(); if (event.key === 'ArrowRight') goPrevious() }} onTouchStart={(event) => { touchStart.current = event.touches[0].clientX }} onTouchEnd={(event) => { if (touchStart.current === null) return; const delta = event.changedTouches[0].clientX - touchStart.current; if (Math.abs(delta) > 40) delta > 0 ? goPrevious() : goNext(); touchStart.current = null }}>
    {heroSlides.map((slide, index) => <Image key={slide.image} src={slide.image} alt={slide.alt} fill priority={index === 0} sizes="(max-width: 640px) calc(100vw - 32px), 976px" className={`object-cover transition duration-1000 ease-out ${index === activeSlide ? 'scale-[1.02] opacity-65' : 'scale-100 opacity-0'}`} style={{ objectPosition: slide.position }} />)}
    <div className="absolute inset-0 bg-gradient-to-l from-black/10 via-black/30 to-black/85" />
    <div className="relative flex h-full min-h-56 items-end p-5 sm:min-h-64 sm:p-8">
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2" role="group" aria-label="اختيار شريحة الهيرو">{heroSlides.map((slide, index) => <button key={slide.image} type="button" aria-label={`الانتقال إلى الشريحة ${index + 1}`} aria-current={index === activeSlide} onClick={() => goToSlide(index)} onFocus={() => setIsPaused(true)} className={`rounded-full transition-all ${index === activeSlide ? 'h-2.5 w-7 bg-amber-300' : 'size-2.5 bg-white/35 hover:bg-white/70'}`} />)}</div>
    </div>
  </section>
}

function Categories() {
  return <section dir="rtl"><div className="mb-4 flex items-center justify-between"><h2 className="text-xl font-black text-white sm:text-2xl">الأقسام</h2><Link href="/store" className="text-sm font-bold text-red-400">عرض الكل</Link></div><div className="grid grid-cols-2 gap-3 sm:grid-cols-4">{categories.map(({ label, href, image, accent }) => <Link href={href} key={href} className={`group relative isolate flex min-h-32 overflow-hidden rounded-2xl border bg-black text-center transition hover:-translate-y-0.5 ${accent}`}><img src={image} alt="" aria-hidden="true" className="absolute inset-0 size-full object-cover object-center opacity-75 transition duration-300 group-hover:scale-105 group-hover:opacity-90" /><span className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/10" /><span className="relative mt-auto w-full p-3 text-sm font-bold text-white drop-shadow-[0_2px_8px_rgba(0,0,0,.9)]">{label}</span></Link>)}</div></section>
}

function ProductCard({ product }: { product: Product }) {
  const card = <article className="group overflow-hidden rounded-2xl border border-white/10 bg-[#0b0c0f] transition hover:-translate-y-1 hover:border-amber-400/60" dir="rtl"><div className="relative flex h-32 items-center justify-center bg-gradient-to-br p-3"><div className={`absolute inset-0 bg-gradient-to-br ${product.tone}`} /><span className="relative text-center text-xl font-black text-white drop-shadow-[0_0_10px_rgba(255,0,0,.45)]">{product.mark}</span>{!product.isAvailable && <span className="absolute left-2 top-2 rounded-full bg-zinc-700 px-2 py-1 text-[10px] font-black text-white">منتج غير متوفر</span>}</div><div className="flex items-center justify-between gap-2 p-3"><h3 className="text-sm font-bold text-white">{product.name}</h3>{product.isAvailable ? <span className="grid size-8 place-items-center rounded-full border border-amber-400/60 text-amber-300 transition group-hover:bg-amber-300 group-hover:text-black"><ChevronLeft className="size-4" /></span> : <button type="button" onClick={() => window.alert('هذا المنتج غير متوفر حاليًا')} className="rounded-lg border border-zinc-600 px-2 py-1 text-xs font-bold text-zinc-400">غير متوفر</button>}</div></article>
  return product.isAvailable ? <Link href={`/product/${product.slug}`}>{card}</Link> : card
}


export default function Page() {
  return <main className="min-h-screen bg-[#050506] pb-24 text-white" dir="rtl"><div className="mx-auto max-w-5xl px-4 sm:px-6"><HomeHeader onMenu={() => {}} /><div className="flex flex-col gap-8 pb-8"><Hero /><label className="flex h-14 items-center gap-3 rounded-full border border-white/15 bg-white/[.035] px-5 text-zinc-400" aria-label="البحث عن منتج أو فئة"><Search className="size-6 shrink-0" /><input className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-zinc-500" placeholder="ابحث عن منتج أو فئة..." /></label><Categories /><section dir="rtl"><div className="mb-4 flex items-center justify-between"><h2 className="flex items-center gap-2 text-xl font-black text-white sm:text-2xl">أشهر المنتجات <span className="text-red-500">♨</span></h2><Link href="/store" className="text-sm font-bold text-red-400">عرض الكل</Link></div><div className="grid grid-cols-2 gap-3 sm:grid-cols-4">{products.map((product) => <ProductCard key={product.slug} product={product} />)}</div></section></div></div></main>
}
