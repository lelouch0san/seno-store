'use client'

import Link from 'next/link'
import { ChevronLeft, Gamepad2 } from 'lucide-react'
import type { Game } from '@/lib/game-data'

export function GameCard({ game }: { game: Game }) {
  return <article className="overflow-hidden rounded-3xl border border-white/10 bg-[#090d10] shadow-[0_0_20px_rgba(255,0,30,.08)] transition hover:-translate-y-1 hover:border-red-500/70">
    <div className="relative h-40 overflow-hidden bg-zinc-900"><img src={game.image} alt={game.name} className="size-full object-cover object-[50%_65%] opacity-80" /><div className="absolute inset-0 bg-gradient-to-t from-[#090d10] via-transparent to-transparent" /><Gamepad2 className="absolute bottom-4 right-4 text-amber-300" /></div>
    <div className="p-4" dir="rtl"><h2 className="text-lg font-black">{game.name}</h2><p className="mt-1 text-sm text-zinc-400">{game.description}</p><Link href={`/store/games/${game.id}`} className="mt-4 flex items-center justify-center rounded-2xl bg-red-600 px-4 py-3 text-sm font-bold text-white shadow-[0_0_18px_rgba(255,0,30,.25)]">عرض الباقات <ChevronLeft className="mr-2 size-4" /></Link></div>
  </article>
}
