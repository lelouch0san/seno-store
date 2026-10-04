import { NextResponse } from 'next/server'
import { storeProducts } from '@/lib/store-products'
import { getGame } from '@/lib/game-data'

export async function POST(request: Request) {
  const body = await request.json().catch(() => null) as { productId?: unknown; gameId?: unknown; packageId?: unknown; accountData?: unknown } | null
  if (typeof body?.gameId === 'string' || typeof body?.packageId === 'string') {
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
  const productId = typeof body?.productId === 'string' ? body.productId : ''
  const product = storeProducts.find((item) => item.slug === productId)

  if (!product) {
    return NextResponse.json({ success: false, message: 'Product not found' }, { status: 400 })
  }

  if (!product.isAvailable) {
    return NextResponse.json({ success: false, message: 'Product is currently unavailable' }, { status: 409 })
  }

  return NextResponse.json({ success: true, productId: product.slug, amount: product.price })
}
