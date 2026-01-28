import { ref } from 'vue';
import type { Product } from '@/types/Product';
import { MOCK_PRODUCTS } from '@/mocks/products';

export function useProducts() {
    const products = ref<Product[]>([]);
    const loading = ref(false);

    const fetchProducts = async () => {
        loading.value = true;
        await new Promise(resolve => setTimeout(resolve, 400));
        products.value = MOCK_PRODUCTS;
        loading.value = false;
    };

    fetchProducts();

    return {
        products,
        loading,
    };
}