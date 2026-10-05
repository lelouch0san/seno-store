export type CatalogStatus = 'active' | 'inactive' | 'archived'
export type PricingModel = 'direct' | 'package' | 'quantity' | 'percentage' | 'fixed-denomination'

export type ProductType = {
  id: string
  nameAr: string
  nameEn: string
  slug: string
  descriptionAr: string
  descriptionEn: string
  icon: string
  status: CatalogStatus
  sortOrder: number
  supportsPackages: boolean
  requiresCustomerInput: boolean
  pricingModel: PricingModel
  configurationSchema?: Record<string, unknown>
  createdAt: string
  updatedAt: string
}

export type Service = {
  id: string
  nameAr: string
  nameEn: string
  slug: string
  type: 'social-media' | 'subscription' | 'digital-currency' | 'withdrawal' | 'other'
  descriptionAr: string
  descriptionEn: string
  status: CatalogStatus
  sortOrder: number
  productTypeId: string
  supportsPackages: boolean
  requiresCustomerInput: boolean
  configurationSchema?: Record<string, unknown>
  createdAt: string
  updatedAt: string
}

const now = '2026-01-01T00:00:00.000Z'
const typeSeeds: Array<[string, string, string, boolean, boolean, PricingModel]> = [
  ['شحن الألعاب', 'Game Top-Up', 'game-top-up', true, true, 'package'],
  ['تطبيقات الصوت', 'Voice / Chat Top-Up', 'voice-chat-top-up', true, true, 'package'],
  ['البطاقات الرقمية', 'Digital Gift Cards', 'gift-cards', true, false, 'package'],
  ['مفاتيح الألعاب', 'Game Keys', 'game-keys', false, false, 'direct'],
  ['الاشتراكات', 'Subscriptions', 'subscriptions', true, true, 'package'],
  ['العملات الرقمية', 'Digital Currency', 'digital-currency', true, true, 'package'],
  ['خدمات السوشيال ميديا', 'Social Media Services', 'social-media', true, true, 'quantity'],
  ['أكواد سينو رصيد', 'Seno Balance Codes', 'seno-balance-codes', true, false, 'fixed-denomination'],
  ['خدمات السحب', 'Withdrawal Services', 'withdrawal-services', false, true, 'direct'],
  ['خدمات رقمية أخرى', 'Other Digital Services', 'other-digital-services', true, false, 'direct'],
]

export const productTypes: ProductType[] = typeSeeds.map(([nameAr, nameEn, slug, supportsPackages, requiresCustomerInput, pricingModel], index) => ({ id: slug, nameAr, nameEn, slug, descriptionAr: '', descriptionEn: '', icon: 'package', status: 'active', sortOrder: index + 1, supportsPackages, requiresCustomerInput, pricingModel, createdAt: now, updatedAt: now }))

export const services: Service[] = [
  { id: 'instagram-followers', nameAr: 'متابعين إنستجرام', nameEn: 'Instagram Followers', slug: 'instagram-followers', type: 'social-media', descriptionAr: 'خدمة زيادة المتابعين', descriptionEn: 'Follower growth service', status: 'active', sortOrder: 1, productTypeId: 'social-media', supportsPackages: true, requiresCustomerInput: true, createdAt: now, updatedAt: now },
  { id: 'capcut-pro', nameAr: 'اشتراك CapCut Pro', nameEn: 'CapCut Pro', slug: 'capcut-pro', type: 'subscription', descriptionAr: 'اشتراكات CapCut', descriptionEn: 'CapCut subscriptions', status: 'active', sortOrder: 2, productTypeId: 'subscriptions', supportsPackages: true, requiresCustomerInput: true, createdAt: now, updatedAt: now },
]

export const getProductTypes = (options?: { includeArchived?: boolean }) => options?.includeArchived ? productTypes : productTypes.filter((item) => item.status !== 'archived')
export const getActiveProductTypes = () => productTypes.filter((item) => item.status === 'active')
export const getProductTypeById = (id: string) => productTypes.find((item) => item.id === id)
export const getServices = (options?: { includeArchived?: boolean }) => options?.includeArchived ? services : services.filter((item) => item.status !== 'archived')
export const getActiveServices = () => services.filter((item) => item.status === 'active')
export const getServiceById = (id: string) => services.find((item) => item.id === id)
export const pricingModelLabels: Record<PricingModel, string> = { direct: 'سعر مباشر', package: 'سعر حسب الباقة', quantity: 'حسب الكمية', percentage: 'حسب النسبة', 'fixed-denomination': 'فئة سعر ثابتة' }
export const serviceTypeLabels: Record<Service['type'], string> = { 'social-media': 'خدمة سوشيال ميديا', subscription: 'خدمة اشتراكات', 'digital-currency': 'خدمة عملات رقمية', withdrawal: 'خدمة سحب', other: 'خدمة رقمية أخرى' }

export type { ProductType as CatalogProductType }
