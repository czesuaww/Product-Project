<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'
import { MOCK_PRODUCTS } from '@/modules/products/mocks/products'
import ProductModal from '@/modules/products/components/ProductModal.vue'
import type { Product } from '@/modules/products/types/Product'

const route = useRoute()
const router = useRouter()

const productId = computed<number>(() => Number(route.params.id))

const product = computed<Product | null>(
  () => MOCK_PRODUCTS.find((p) => p.id === productId.value) || null,
)

const handleClose = (): void => {
  router.push({ name: 'home' })
}
</script>

<template>
  <main>
    <ProductModal :product="product" :isOpen="true" @close="handleClose" />

    <div v-if="!product" class="not-found">
      <p class="not-found__text">Nie ma takiego produktu.</p>
      <router-link to="/" class="not-found__link"> Wróć do listy produktów </router-link>
    </div>
  </main>
</template>
<style lang="scss" scoped>
@use '@/assets/scss/_variables.scss' as *;

.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  text-align: center;

  &__text {
    color: $color-text-dark;
    font-size: 2.2rem;
    margin-bottom: 1.5rem;
  }

  &__link {
    color: $color-primary;
    text-decoration: none;
    font-weight: 600;
    font-size: 1.6rem;
    border-bottom: 2px solid transparent;
    transition: border-color 0.3s ease;

    &:hover {
      border-color: $color-primary;
    }
  }
}
</style>
