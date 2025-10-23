import { HttpContext } from '@adonisjs/core/http'

export default class WishlistController {
  /**
   * Show wishlist page
   */
  async index({ session, view }: HttpContext) {
    // Get wishlist from session
    const wishlist = session.get('wishlist', [])

    // Mock product data to display
    const PRODUCTS = {
      1: { id: 1, name: 'Dragon\'s Fang', price: 4500000, image: 'pedangnaga.png' },
      2: { id: 2, name: 'Moonshadow Blade', price: 3800000, image: 'pedanbulan.png' },
      3: { id: 3, name: 'Crystal Oathkeeper', price: 5200000, image: 'pedangkristal.png' },
      4: { id: 4, name: 'Whispering Shadow', price: 4100000, image: 'pedangbayangan.png' },
    }

    // Map wishlist IDs to product details
    const items = wishlist.map((id: number) => PRODUCTS[id as keyof typeof PRODUCTS]).filter(Boolean)

    return view.render('pages/wishlist', { wishlist: items, count: items.length })
  }

  /**
   * Add product to wishlist
   */
  async add({ request, session, response }: HttpContext) {
    const productId = request.input('productId')

    if (!productId) {
      return response.status(400).json({ error: 'Product ID required' })
    }

    // Get current wishlist
    const wishlist = session.get('wishlist', [])

    // Add if not already in wishlist
    if (!wishlist.includes(parseInt(productId))) {
      wishlist.push(parseInt(productId))
      session.put('wishlist', wishlist)
    }

    return response.redirect().back()
  }

  /**
   * Remove product from wishlist
   */
  async remove({ request, session, response }: HttpContext) {
    const productId = parseInt(request.input('productId'))

    // Get current wishlist
    const wishlist = session.get('wishlist', [])

    // Remove from wishlist
    const index = wishlist.indexOf(productId)
    if (index > -1) {
      wishlist.splice(index, 1)
      session.put('wishlist', wishlist)
    }

    return response.redirect().back()
  }

  /**
   * Clear entire wishlist
   */
  async clear({ session, response }: HttpContext) {
    session.forget('wishlist')
    return response.redirect('/wishlist')
  }
}
