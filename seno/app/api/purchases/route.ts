import { NextResponse } from 'next/server'
import { storeProducts } from '@/lib/store-products'
import { getGame } from '@/lib/game-data'
import { getSenoBalanceCodeProduct } from '@/lib/seno-balance-codes'

export async function POST(request: Request) {
  const body = await request.json().catch(() => null) as { productId?: unknown; packageId?: unknown; gameId?: unknown; accountData?: unknown } | null
  if (typeof body?.gameId === 'string') {
    const game = typeof body.gameId === 'string' ? getGame(body.gameId) : undefined
    const selectedPackage = game?.packages.find((item) => item.id === body.packageId)
    if (!game || !selectedPackage) return NextResponse.json({ success: false, message: 'Game or package not found' }, { status: 400 })
    if (!game.isAvailable) return NextResponse.json({ success: false, message: 'Game is currently unavailable' }, { status: 409 })
    if (!selectedPackage.isAvailable) return NextResponse.json({ success: false, message: 'Package is currently unavailable' }, { status: 409 })
    if (!body.accountData || typeof body.accountData !== 'object') return NextResponse.json({ success: false, message: 'Account data is required' }, { status: 400 })
    const accountData = body.accountData as Record<string, unknown>
    if (game.requiredFields.some((field) => typeof accountData[field.id] !== 'string' || !(accountData[field.id] as string).trim())) return NextResponse.json({ success: false, message: 'Required account data is missing' }, { status: 400 })
    return NextResponse.json({ success: true, gameId: game.id, packageId: selectedPackage.id, amount: selectedPackage.price, currency: selectedPackage.currency })
  }
  if (body?.senoCode === true) {
    const productId = typeof body.productId === 'string' ? body.productId : ''
    const product = getSenoBalanceCodeProduct(productId)
    if (!product || !product.active) return NextResponse.json({ success: false, message: 'SENO code not found' }, { status: 400 })
    if (!product.available) return NextResponse.json({ success: false, message: 'SENO code is currently unavailable' }, { status: 409 })
    return NextResponse.json({ success: true, orderId: `SNO-${crypto.randomUUID().slice(0, 8).toUpperCase()}`, productId: product.id, sku: product.sku, amount: product.price, denomination: product.denomination, currency: product.currency, fulfillmentStatus: 'pending_whatsapp', whatsappPurchase: true })
  }

  const productId = typeof body?.productId === 'string' ? body.productId : ''
  const product = storeProducts.find((item) => item.slug === productId)
  const digitalPackage = product?.digitalCardPackages?.find((item) => item.id === body?.packageId)

  if (!product) {
    return NextResponse.json({ success: false, message: 'Product not found' }, { status: 400 })
  }

  if (!product.isAvailable || (product.digitalCardPackages && (!digitalPackage || !digitalPackage.available))) {
    return NextResponse.json({ success: false, message: 'Product is currently unavailable' }, { status: 409 })
  }

  return NextResponse.json({ success: true, orderId: `SNO-${crypto.randomUUID().slice(0, 8).toUpperCase()}`, productId: product.slug, packageId: digitalPackage?.id, amount: digitalPackage?.sellingPrice ?? product.price, currency: digitalPackage?.sellingCurrency ?? 'EGP', deliveryType: digitalPackage ? 'digital' : undefined, fulfillmentStatus: digitalPackage ? 'pending_delivery' : undefined })
}
