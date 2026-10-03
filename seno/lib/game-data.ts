export type GamePackage = { id: string; amount: number; unit: string; price: number }

export type Game = { id: string; name: string; description: string; image: string; packages: GamePackage[] }

const artwork = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/file_0000000015f4820aad3a7637b56e3f84-WGC1XKchVlp1uO7orecqwKhbJ0S36M.png'

export const games: Game[] = [
  { id: 'pubg-global', name: 'PUBG Mobile Global', description: 'اشحن شداتك بسرعة وأمان', image: artwork, packages: [{ id: 'pubg-660', amount: 660, unit: 'UC', price: 10 }, { id: 'pubg-1800', amount: 1800, unit: 'UC', price: 25 }, { id: 'pubg-3850', amount: 3850, unit: 'UC', price: 50 }, { id: 'pubg-8100', amount: 8100, unit: 'UC', price: 100 }] },
  { id: 'free-fire-global', name: 'Free Fire Global', description: 'اشحن ألماسات فري فاير', image: artwork, packages: [{ id: 'ff-100', amount: 100, unit: 'Diamonds', price: 2 }, { id: 'ff-310', amount: 310, unit: 'Diamonds', price: 5 }, { id: 'ff-520', amount: 520, unit: 'Diamonds', price: 8 }] },
  { id: 'mobile-legends-global', name: 'Mobile Legends', description: 'اشحن الماس داخل اللعبة', image: artwork, packages: [{ id: 'ml-86', amount: 86, unit: 'Diamonds', price: 2 }, { id: 'ml-172', amount: 172, unit: 'Diamonds', price: 4 }, { id: 'ml-343', amount: 343, unit: 'Diamonds', price: 8 }] },
  { id: 'cod-mobile-global', name: 'Call of Duty Mobile', description: 'احصل على CP فوراً', image: artwork, packages: [{ id: 'cod-80', amount: 80, unit: 'CP', price: 2 }, { id: 'cod-420', amount: 420, unit: 'CP', price: 8 }, { id: 'cod-880', amount: 880, unit: 'CP', price: 15 }] },
  { id: 'roblox-global', name: 'Roblox Global', description: 'اشحن Robux لحسابك', image: artwork, packages: [{ id: 'robux-400', amount: 400, unit: 'Robux', price: 5 }, { id: 'robux-800', amount: 800, unit: 'Robux', price: 10 }] },
  { id: 'fc-mobile-global', name: 'EA SPORTS FC Mobile', description: 'اشحن نقاط FC Mobile', image: artwork, packages: [{ id: 'fc-105', amount: 105, unit: 'Points', price: 2 }, { id: 'fc-550', amount: 550, unit: 'Points', price: 10 }] },
]

export function getGame(gameId: string) { return games.find((game) => game.id === gameId) }

export const GAME_BALANCE_KEY = 'seno-game-balance'
export const GAME_ORDERS_KEY = 'seno-game-orders'
export const initialGameBalance = 100

export type GameOrder = { id: string; type: 'game'; gameId: string; gameName: string; packageId: string; package: string; quantity: number; playerId: string; unitPrice: number; total: number; currency: 'USD'; status: 'pending'; createdAt: string }

export function readGameBalance() { if (typeof window === 'undefined') return initialGameBalance; const stored = window.localStorage.getItem(GAME_BALANCE_KEY); return stored ? Number(stored) : initialGameBalance }
export function readGameOrders(): GameOrder[] { if (typeof window === 'undefined') return []; try { return JSON.parse(window.localStorage.getItem(GAME_ORDERS_KEY) ?? '[]') } catch { return [] } }
export function saveGameOrder(order: GameOrder) { const orders = readGameOrders(); window.localStorage.setItem(GAME_ORDERS_KEY, JSON.stringify([order, ...orders])) }
export function saveGameBalance(balance: number) { window.localStorage.setItem(GAME_BALANCE_KEY, String(balance)) }
