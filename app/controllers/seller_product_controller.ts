import { HttpContext } from '@adonisjs/core/http'
import { SellerStore } from '../services/seller_store.js'

export default class SellerProductController {
  // Store seller products in session
  private getSellerProducts(session: any) {
    if (!session.get('sellerProducts')) {
      session.put('sellerProducts', [])
    }
    return session.get('sellerProducts')
  }

  /**
   * Show add product form with list of products
   */
  async showAddForm({ view, session }: HttpContext) {
    if (session.get('role') !== 'seller') {
      return view.render('pages/index')
    }

    const sellerProducts = this.getSellerProducts(session)
    return view.render('pages/seller-add-product', { sellerProducts })
  }

  /**
   * Handle add product submission
   */
  async addProduct({ request, session, response }: HttpContext) {
    if (session.get('role') !== 'seller') {
      return response.redirect('/')
    }

    const name = request.input('name')
    const description = request.input('description')
    const price = request.input('price')

    let imageFileName = 'pedangnaga.png'

    // Validate required inputs
    if (!name || !description || !price) {
      return response.redirect().back()
    }

    // Handle file upload
    const imageFile = request.file('image')
    
    if (imageFile) {
      try {
        // Generate unique filename (keep original extension)
        const timestamp = Date.now()
        const ext = imageFile.extname || '.jpg'
        imageFileName = `seller-product-${timestamp}${ext}`

        // Save file to public/images folder
        await imageFile.move('./public/images', { name: imageFileName })
      } catch (error) {
        console.error('Upload error:', error)
        // Still use default image if upload fails
      }
    }

    const products = this.getSellerProducts(session)
    
    // Generate unique ID
    const now = new Date()
    const dateStr = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()} ${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`
    
    const newProduct = {
      id: Date.now(),
      name,
      description,
      price: parseInt(price),
      image: imageFileName,
      addedAt: dateStr
    }

    // Add to session for seller dashboard
    products.push(newProduct)
    session.put('sellerProducts', products)
    
    // Also add to shared store so it appears in /products page
    SellerStore.add(newProduct)

    return response.redirect('/seller/add-product')
  }

  /**
   * Delete product
   */
  async deleteProduct({ request, session, response }: HttpContext) {
    if (session.get('role') !== 'seller') {
      return response.redirect('/')
    }

    const productId = request.input('productId')
    const products = this.getSellerProducts(session)
    
    const filtered = products.filter((p: any) => p.id !== parseInt(productId))
    session.put('sellerProducts', filtered)

    // Also remove from shared store
    SellerStore.remove(parseInt(productId))

    return response.redirect('/seller/add-product')
  }
}
