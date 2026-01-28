<script setup lang="ts">
import type { Product } from '@/modules/products/types/Product'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Navigation, Pagination, A11y } from 'swiper/modules'
import { useProductModal } from '@/modules/products/composables/useProductModal'
import { formatPrice } from '@/utils/formatters'

const props = defineProps<{
  product: Product | null
  isOpen: boolean
}>()

const emit = defineEmits<{ (e: 'close'): void }>()

const { modalContainer } = useProductModal(
  () => props.isOpen,
  () => emit('close'),
)

const modules = [Navigation, Pagination, A11y]

const swiperA11yConfig = {
  enabled: true,
  prevSlideMessage: 'Poprzednie zdjęcie',
  nextSlideMessage: 'Następne zdjęcie',
  firstSlideMessage: 'To jest pierwsze zdjęcie',
  lastSlideMessage: 'To jest ostatnie zdjęcie',
  paginationBulletMessage: 'Przejdź do zdjęcia {{index}}',
}
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="isOpen && product"
        class="modal"
        ref="modalContainer"
        tabindex="-1"
        @click.self="emit('close')"
      >
        <div class="modal__container">
          <button class="modal__close-btn" @click="emit('close')" aria-label="Zamknij popup">
            &times;
          </button>

          <div class="modal__content">
            <div class="modal__image-section">
              <swiper
                :modules="modules"
                :slides-per-view="1"
                :space-between="20"
                navigation
                :pagination="{ clickable: true }"
                :a11y="swiperA11yConfig"
                class="product-swiper"
              >
                <swiper-slide v-for="(img, index) in product.images.slice(2)" :key="index">
                  <img
                    :src="img"
                    :alt="'Zdjęcie produktu ' + (index + 1)"
                    tabindex="0"
                    class="modal__swiper-img"
                  />
                </swiper-slide>
              </swiper>
            </div>

            <div class="modal__info-section">
              <h2 class="modal__title">{{ product.name }}</h2>
              <p class="modal__id">Id produktu: {{ product.id }}</p>
              <p class="modal__code">Kod produktu: {{ product.code }}</p>
              <p class="modal__price">{{ formatPrice(product.price) }} {{ product.currency }}</p>
              <p class="modal__delivery">Dostawa: {{ product.deliveryTime }}</p>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="scss">
@use '@/assets/scss/_variables.scss' as *;

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: $color-overlay;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  padding: 1rem;
  backdrop-filter: blur(4px);
  box-sizing: border-box;

  @media (min-width: 480px) {
    padding: 2rem;
  }

  &__container {
    background: $color-white;
    position: relative;
    border-radius: 16px;
    box-shadow: $shadow-modal;
    width: 100%;
    max-width: 800px;
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
    overflow-y: auto;
    box-sizing: border-box;
  }

  &__close-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    background: $color-white;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    border: none;
    font-size: 3rem;
    z-index: 100;
    color: $color-text-dark;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: $shadow-btn;
    transition: transform 0.2s;
    cursor: pointer;

    &:hover {
      transform: scale(1.1);
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    width: 100%;
    box-sizing: border-box;

    @media (min-width: 768px) {
      display: grid;
      grid-template-columns: 1fr 1fr;
    }
  }

  &__image-section {
    background: $color-bg-light;
    padding: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    box-sizing: border-box;
    min-width: 0;

    @media (min-width: 768px) {
      padding: 4rem;
    }
  }

  &__swiper-img {
    width: 100%;
    height: auto;
    max-height: 250px;
    object-fit: contain;

    @media (min-width: 768px) {
      max-height: 400px;
    }
  }

  &__info-section {
    padding: 2.5rem;
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
    box-sizing: border-box;
    min-width: 0;

    @media (min-width: 768px) {
      padding: 4rem;
      justify-content: center;
      gap: 30px;
    }
  }

  &__title {
    margin: 0;
    font-size: 2.4rem;
    color: $color-text-main;
    line-height: 1.2;
    overflow-wrap: break-word;

    @media (min-width: 768px) {
      font-size: 3.2rem;
    }
  }

  &__code,
  &__id {
    color: $color-text-muted;
    font-size: 1.2rem;
    margin-bottom: 0.5rem;

    @media (min-width: 768px) {
      font-size: 1.5rem;
    }
  }

  &__price {
    font-size: 2.8rem;
    font-weight: 800;
    color: $color-primary;
    margin: 0.5rem 0;

    @media (min-width: 768px) {
      font-size: 3.6rem;
    }
  }

  &__delivery {
    font-size: 1.4rem;
    color: $color-delivery-text;
    font-weight: 500;
    background: $color-delivery-bg;
    padding: 0.8rem 1.6rem;
    border-radius: 8px;
    width: fit-content;
  }
}

.product-swiper {
  width: 100%;
  height: auto;
  position: relative;
}

.swiper-button-prev,
.swiper-button-next {
  color: $color-primary;
}
</style>
