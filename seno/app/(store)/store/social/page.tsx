import type { Metadata } from 'next'
import { StoreCategoryPage } from '@/components/store-category-page'

export const metadata: Metadata = { title: 'خدمات السوشيال | Seno Store', description: 'خدمات رقمية احترافية لحساباتك.' }
export default function SocialPage() { return <StoreCategoryPage category="social" /> }
