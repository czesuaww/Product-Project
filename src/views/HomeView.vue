<script setup lang="ts">
import { useProducts } from '@/composables/useProducts';
import ProductCard from '@/components/product/ProductCard.vue';
import { useRouter } from 'vue-router';

const router = useRouter(); // Inicjalizacja
const {
    products,
    loading,
} = useProducts();
</script>

<template>
    <div class="home-view">
        <div v-if="loading" class="home-view__loader">Ładowanie...</div>
        <div v-else class="home-view__content">
            <h1 class="home-view__title">Gitarowe produkty</h1>
            <div class="home-view__grid">
                <ProductCard v-for="product in products" :key="product.id" :product="product"
                    @click="router.push({ name: 'product-details', params: { id: product.id } })" />
            </div>
        </div>
        <!-- <ProductModal :product="selectedProduct" :is-open="isModalOpen" @close="closeModal" /> -->
    </div>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/_variables.scss' as *;

.home-view {
    max-width: 1280px;
    margin: 0 auto;
    padding: 2rem;

    &__loader {
        text-align: center;
        font-size: 2rem;
        padding: 4rem;
        color: $color-loader;
    }

    &__title {
        text-align: center;
        font-size: 2.5rem;
        color: $color-text-main;
        margin-bottom: 4rem;
        font-weight: 700;
    }

    &__grid {
        display: grid;
        gap: 20px;
        grid-template-columns: 1fr;

        @media (min-width: 600px) {
            grid-template-columns: repeat(2, 1fr);
        }

        @media (min-width: 1024px) {
            grid-template-columns: repeat(4, 1fr);
        }
    }

    &__card {
        cursor: pointer;
    }
}
</style>