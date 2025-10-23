/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import AuthController from '../app/controllers/auth_controller.js'
import SearchController from '../app/controllers/search_controller.js'
import WishlistController from '../app/controllers/wishlist_controller.js'
import SellerProductController from '../app/controllers/seller_product_controller.js'

router.on('/').render('pages/index')
router.get('/products', [SearchController, 'showAllProducts'])
router.on('/contact').render('pages/contact')

// Auth routes
router.get('/login', [AuthController, 'showLogin'])
router.post('/login', [AuthController, 'login'])
router.get('/logout', [AuthController, 'logout'])

// Search routes
router.get('/search', [SearchController, 'search'])

// Wishlist routes (for both user and seller)
router.get('/wishlist', [WishlistController, 'index'])
router.post('/wishlist/add', [WishlistController, 'add'])
router.post('/wishlist/remove', [WishlistController, 'remove'])
router.get('/wishlist/clear', [WishlistController, 'clear'])

// Seller routes
router.get('/seller/add-product', [SellerProductController, 'showAddForm'])
router.post('/seller/add-product', [SellerProductController, 'addProduct'])
router.post('/seller/delete-product', [SellerProductController, 'deleteProduct'])
// Seller wishlist uses same route as user wishlist