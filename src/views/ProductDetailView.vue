<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'
import { MOCK_PRODUCTS } from '@/modules/products/mocks/products'
import ProductModal from '@/modules/products/components/ProductModal.vue'

const route = useRoute()
const router = useRouter()

const productId = computed(() => Number(route.params.id))

const product = computed(() => MOCK_PRODUCTS.find((p) => p.id === productId.value) || null)

const handleClose = () => router.push({ name: 'home' })
</script>

<template>
  <main>
    <ProductModal :product="product" :isOpen="true" @close="handleClose" />

    <div v-if="!product" class="not-found">
      <p>Nie ma takiego produktu.</p>
      <router-link to="/">Wróć do listy produktów</router-link>
    </div>
  </main>
</template>
