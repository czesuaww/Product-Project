<script setup lang="ts">
import type { Product } from '../../types/Product';

defineProps<{
    product: Product
}>();
</script>

<template>
    <article class="product-card">
        <div class="product-card__image-wrapper">
            <img v-if="product.images && product.images[0]" :src="product.images[0]" :alt="product.name"
                class="product-card__image product-card__image--primary" />
            <img v-if="product.images && product.images[1]" :src="product.images[1]" alt="product.name"
                aria-hidden="true" class="product-card__image product-card__image--secondary" />
        </div>

        <div class="product-card__content">
            <h2 class="product-card__name">
                <a href="#" class="product-card__link" @click.prevent="$emit('click', product)">
                    {{ product.name }}
                </a>
            </h2>
            <p class="product-card__price">{{ product.price }} {{ product.currency }}</p>
        </div>
    </article>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/_variables.scss' as *;

.product-card {
    position: relative;
    display: flex;
    flex-direction: column;
    background: $color-white;
    border: 1px solid $color-border;
    border-radius: 12px;
    overflow: hidden;
    transition: all 0.3s ease-in-out;
    height: 100%;
    z-index: 1;

    &:hover {
        box-shadow: 0 12px 24px $color-shadow;

        .product-card__image--primary {
            opacity: 0;
            z-index: 0;
        }

        .product-card__image--secondary {
            opacity: 1;
            z-index: 3;
        }
    }

    &__image-wrapper {
        position: relative;
        aspect-ratio: 1 / 1;
        overflow: hidden;
        background-color: $color-bg-image;
    }

    &__image {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: contain;
        transition: opacity 0.4s ease;

        &--primary {
            z-index: 2;
            opacity: 1;
        }

        &--secondary {
            z-index: 1;
            opacity: 0;
        }
    }

    &__content {
        padding: 2rem;
        display: flex;
        flex-direction: column;
        gap: 0.8rem;
    }


    &__name {
        margin: 0;
        font-size: 1.8rem;
        line-height: 1.4;
        font-weight: 600;
        color: $color-text-name;
        position: relative;
        z-index: 5;
    }

    &__price {
        margin: 0;
        font-size: 2rem;
        font-weight: 700;
        color: $color-primary;
        position: relative;
        z-index: 5;
    }

    &__link {
        color: inherit;
        text-decoration: none;
        outline: none;

        &::after {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 1;
        }

        &:focus-visible::after {
            outline: 3px solid $color-primary;
            outline-offset: -3px;
            border-radius: 12px;
        }
    }

}
</style>