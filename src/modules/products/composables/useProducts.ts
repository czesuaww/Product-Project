import { ref } from 'vue'
import type { Product } from '@/modules/products/types/Product'
import { MOCK_PRODUCTS } from '@/modules/products/mocks/products'

export function useProducts() {
  const products = ref<Product[]>([])
  const loading = ref(false)

  const fetchProducts = async (): Promise<void> => {
    loading.value = true
    await new Promise((resolve) => setTimeout(resolve, 400))
    products.value = MOCK_PRODUCTS
    loading.value = false
  }

  fetchProducts()

  return {
    products,
    loading,
  }
}
