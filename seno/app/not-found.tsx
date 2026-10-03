import Link from 'next/link'
import { SenoLogo } from '@/components/branding/seno-logo'

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-[#050506] px-6 text-center text-white" dir="rtl">
      <div className="flex max-w-md flex-col items-center gap-5">
        <SenoLogo className="w-52" />
        <p className="text-sm text-amber-300">404</p>
        <h1 className="text-2xl font-black">الصفحة غير موجودة</h1>
        <Link href="/" className="rounded-xl bg-red-600 px-6 py-3 font-bold">العودة للرئيسية</Link>
      </div>
    </main>
  )
}
