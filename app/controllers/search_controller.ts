import { HttpContext } from '@adonisjs/core/http'
import { SellerStore } from '../services/seller_store.js'

// Mock product database
const PRODUCTS = [
  { id: 1, name: 'Dragon\'s Fang', price: 4500000, category: 'legendary', description: 'Ditempa dengan api naga, pedang ini dikatakan berisi esensi kekuatan kuno.', image: 'pedangnaga.png' },
  { id: 2, name: 'Moonshadow Blade', price: 3800000, category: 'mystical', description: 'Bilah yang menyerap cahaya bulan, bersinar lembut dalam kegelapan.', image: 'pedanbulan.png' },
  { id: 3, name: 'Crystal Oathkeeper', price: 5200000, category: 'rare', description: 'Sebuah pedang yang terbuat dari kristal murni dari gua-gua terdalam.', image: 'pedangkristal.png' },
  { id: 4, name: 'Whispering Shadow', price: 4100000, category: 'mystical', description: 'Ringan dan mematikan, bilah ini bergerak tanpa suara seperti bisikan.', image: 'pedangbayangan.png' },
]

export default class SearchController {
  /**
   * Show search results page
   */
  async search({ request, view }: HttpContext) {
    const keyword = request.input('keyword', '').toLowerCase()

    // Combine mock products with seller products from store
    const allProducts = [...PRODUCTS, ...SellerStore.getAll()]

    // Filter products by keyword (name only)
    let results = allProducts.filter((product) => {
      return product.name.toLowerCase().includes(keyword)
    })

    // Sort results by name (A-Z)
    results.sort((a, b) => a.name.localeCompare(b.name))

    return view.render('pages/search', {
      results,
      keyword,
    })
  }

  /**
   * Show all products (with seller products included)
   */
  async showAllProducts({ view }: HttpContext) {
    // Combine mock products with seller products from store
    const products = [...PRODUCTS, ...SellerStore.getAll()]

    // Sort by name
    products.sort((a, b) => a.name.localeCompare(b.name))

    return view.render('pages/products', { products })
  }
}
