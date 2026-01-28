import { ref, watch, nextTick, onMounted, onUnmounted } from 'vue'
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap'

export function useProductModal(isOpen: () => boolean, onClose: () => void) {
  const modalContainer = ref<HTMLElement | null>(null)

  const { activate, deactivate } = useFocusTrap(modalContainer, {
    initialFocus: () => modalContainer.value as HTMLElement,
    fallbackFocus: '.modal__close-btn',
  })

  const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && isOpen()) onClose()
  }

  watch(isOpen, async (newVal) => {
    if (newVal) {
      await nextTick()
      activate()
    } else {
      deactivate()
    }
  })

  onMounted(() => window.addEventListener('keydown', handleKeydown))
  onUnmounted(() => window.removeEventListener('keydown', handleKeydown))

  return { modalContainer }
}
