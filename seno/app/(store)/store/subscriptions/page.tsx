import type { Metadata } from 'next'
import { StoreCategoryPage } from '@/components/store-category-page'

export const metadata: Metadata = { title: 'الاشتراكات | Seno Store', description: 'اشتراكات ترفيه وإنتاجية رقمية.' }
export default function SubscriptionsPage() { return <StoreCategoryPage category="subscriptions" /> }
