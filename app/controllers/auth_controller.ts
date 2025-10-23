import { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  /**
   * Show login page
   */
  async showLogin({ view }: HttpContext) {
    return view.render('pages/login')
  }

  /**
   * Handle login form submission
   */
  async login({ request, session, response }: HttpContext) {
    const role = request.input('role')

    // Validate role is either 'user' or 'seller'
    if (!['user', 'seller'].includes(role)) {
      return response.redirect().back()
    }

    // Set the role in session
    session.put('role', role)
    session.put('isLoggedIn', true)

    // Initialize mock seller products if seller role
    if (role === 'seller') {
      const mockProducts = [
        {
          id: 1,
          name: "Dragon's Fang",
          description: 'Ditempa dengan api naga, pedang ini dikatakan berisi esensi kekuatan kuno.',
          price: 3500000,
          image: 'pedangnaga.png',
          addedAt: '21/10/2025 10:30'
        },
        {
          id: 2,
          name: 'Moonshadow Blade',
          description: 'Bilah yang menyerap cahaya bulan, bersinar lembut dalam kegelapan.',
          price: 2800000,
          image: 'pedanbulan.png',
          addedAt: '21/10/2025 10:25'
        },
        {
          id: 3,
          name: 'Crystal Oathkeeper',
          description: 'Sebuah pedang yang terbuat dari kristal murni dari gua-gua terdalam.',
          price: 5200000,
          image: 'pedangkristal.png',
          addedAt: '21/10/2025 10:20'
        },
        {
          id: 4,
          name: 'Whispering Shadow',
          description: 'Ringan dan mematikan, bilah ini bergerak tanpa suara seperti bisikan.',
          price: 4500000,
          image: 'pedangbayangan.png',
          addedAt: '21/10/2025 10:15'
        }
      ]
      session.put('sellerProducts', mockProducts)
    }

    // Redirect to home page
    return response.redirect('/')
  }

  /**
   * Handle logout
   */
  async logout({ session, response }: HttpContext) {
    session.forget('role')
    session.forget('isLoggedIn')

    return response.redirect('/')
  }
}
