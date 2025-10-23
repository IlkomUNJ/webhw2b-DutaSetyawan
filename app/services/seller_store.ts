/**
 * Global seller products store
 * Shared across all controllers
 */

let sellerProducts: any[] = []

export const SellerStore = {
  getAll() {
    return sellerProducts
  },

  add(product: any) {
    sellerProducts.push(product)
  },

  remove(productId: number) {
    sellerProducts = sellerProducts.filter((p) => p.id !== productId)
  },

  clear() {
    sellerProducts = []
  }
}
