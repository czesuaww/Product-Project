import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import type { Product } from '@/types/Product';
import { MOCK_PRODUCTS } from '@/mocks/products';

export function useProducts() {
    const products = ref<Product[]>([]);
    const loading = ref(false);

    const route = useRoute();
    const router = useRouter();

    const selectedProduct = computed(() => {
        const id = route.params.id;
        console.log(id, 'id')
        if (!id) return null;
        return products.value.find(p => String(p.id) === String(id)) || null;
    });

    const isModalOpen = computed(() => !!route.params.id);

    const fetchProducts = async () => {
        loading.value = true;
        await new Promise(resolve => setTimeout(resolve, 800));
        products.value = MOCK_PRODUCTS;
        loading.value = false;
    };

    const openModal = (product: Product) => router.push({ name: 'product-details', params: { id: product.id } });

    const closeModal = () => router.push({ name: 'home' });

    fetchProducts();

    return {
        products,
        loading,
        selectedProduct, // teraz to Computed
        isModalOpen,     // teraz to Computed
        openModal,
        closeModal
    };
}