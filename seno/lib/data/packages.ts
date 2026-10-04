import { storeProducts } from '@/lib/store-products'
import { games } from '@/lib/game-data'
import type { ProductPackage } from './types'

export function getProductPackages(productId: string): ProductPackage[] { return storeProducts.find((product) => product.slug === productId)?.digitalCardPackages ?? [] }
export function getGamePackages(gameId: string) { return games.find((game) => game.id === gameId)?.packages ?? [] }
export function getAvailableProductPackages(productId: string) { return getProductPackages(productId).filter((pack) => 'available' in pack ? pack.available : pack.isAvailable) }
export function getAvailableGamePackages(gameId: string) { return getGamePackages(gameId).filter((pack) => pack.isAvailable) }
