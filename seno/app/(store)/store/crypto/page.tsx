import type { Metadata } from 'next'
import { StoreCategoryPage } from '@/components/store-category-page'

export const metadata: Metadata = { title: 'العملات الرقمية | Seno Store', description: 'واجهة اختيار باقات العملات الرقمية.' }
export default function CryptoPage() { return <StoreCategoryPage category="crypto" /> }
