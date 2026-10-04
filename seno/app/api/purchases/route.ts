import { NextResponse } from 'next/server'
import { storeProducts } from '@/lib/store-products'

export async function POST(request: Request) {
  const body = await request.json().catch(() => null) as { productId?: unknown } | null
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
