import { notFound } from 'next/navigation'
import { getGame } from '@/lib/game-data'
import { GamePackageList } from '@/components/game-package-list'

export default async function GamePage({ params }: { params: Promise<{ gameId: string }> }) { const { gameId } = await params; const game = getGame(gameId); if (!game) notFound(); return <main className="min-h-screen bg-[#050506] pb-28 text-white" dir="rtl"><div className="mx-auto max-w-5xl px-4 sm:px-6"><header className="py-8"><p className="text-sm font-bold text-amber-300">متجر الألعاب / {game.name}</p><h1 className="mt-2 text-3xl font-black sm:text-4xl">{game.name}</h1><p className="mt-2 text-zinc-400">اختر الباقة المناسبة ثم أدخل معرف اللاعب لإتمام عملية الشحن.</p></header><GamePackageList game={game} /></div></main> }
