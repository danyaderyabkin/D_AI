<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { GridStack } from 'gridstack'
import 'gridstack/dist/gridstack.min.css'
import AccordionSection from '@/components/accordions/AccordionSection.vue'
import { useHtmlData } from '@/composables/useHtmlData'
import { useCssData } from '@/composables/useCssData'
import { useVueData } from '@/composables/useVueData'
import { useNuxtData } from '@/composables/useNuxtData'
import { useJsData } from '@/composables/useJsData'
import { useGitData } from '@/composables/useGitData'

const blocks = ref([
  { w: 4, h: 2, x: 0, y: 0, id: 'Unic1', type: 'HTML' },
  { w: 4, h: 2, x: 4, y: 0, id: 'Unic3', type: 'CSS' },
  { w: 4, h: 2, x: 8, y: 0, id: 'Unic9', type: 'Vue' },
  { w: 4, h: 2, x: 12, y: 0, id: 'Unic6', type: 'Js' },
  { w: 4, h: 2, x: 0, y: 2, id: 'Unic4', type: 'Git' },
  { w: 4, h: 2, x: 4, y: 2, id: 'Unic5', type: 'Browser' },
  { w: 4, h: 2, x: 8, y: 2, id: 'Unic8', type: 'Ts' },
  { w: 4, h: 2, x: 12, y: 2, id: 'Unic7', type: 'Nuxt' },
])

// Используем композаблы для получения данных
const { htmlItems } = useHtmlData()
const { cssItems } = useCssData()
const { vueItems } = useVueData()
const { nuxtItems } = useNuxtData()
const { jsItems } = useJsData()
const { gitItems } = useGitData()

const getAccordionProps = (type: string) => {
  const propsMap: Record<string, any> = {
    HTML: {
      items: htmlItems.value,
      placeholder: 'Поиск по HTML вопросам...'
    },
    CSS: {
      items: cssItems.value,
      placeholder: 'Поиск по CSS вопросам...'
    },
    Vue: {
      items: vueItems.value,
      placeholder: 'Поиск по Vue вопросам...'
    },
    Browser: {
      items: [],
      placeholder: 'Поиск по Browser вопросам...'
    },
    Js: {
      items: jsItems.value,
      placeholder: 'Поиск по JavaScript вопросам...'
    },
    Ts: {
      items: [],
      placeholder: 'Поиск по TypeScript вопросам...'
    },
    Git: {
      items: gitItems.value,
      placeholder: 'Поиск по Git вопросам...'
    },
    Nuxt: {
      items: nuxtItems.value,
      placeholder: 'Поиск по Nuxt вопросам...'
    }
  }
  return propsMap[type] || { items: [], placeholder: 'Поиск...' }
}

let grid: GridStack | null = null

// Функция для определения мобильного устройства
const isMobile = () => {
  return window.innerWidth <= 768 // Обычно 768px - это breakpoint для планшетов/мобильных
}

// Опции для GridStack в зависимости от устройства
const getGridStackOptions = () => {
  if (isMobile()) {
    return {
      animate: true,
      cellHeight: 'auto', // Автоматическая высота для мобильных
      float: false, // Отключаем свободное перемещение
      column: 1, // Только 1 колонка на мобильных
      margin: 6,
      resizable: false, // Отключаем изменение размера
      disableDrag: true, // Отключаем перетаскивание
      disableResize: true, // Отключаем изменение размера
      staticGrid: true, // Статичная сетка
    }
  } else {
    return {
      animate: true,
      cellHeight: '200px',
      float: true,
      column: 16,
      margin: 6,
      resizable: { handles: 'e, se, s, sw, w, nw, n, ne' },
      disableDrag: false,
      disableResize: false,
    }
  }
}

// Функция для перестройки блоков под мобильную версию
const rearrangeBlocksForMobile = () => {
  if (isMobile()) {
    blocks.value = blocks.value.map((block, index) => ({
      ...block,
      w: 1, // 1 блок в ширину
      h: 'auto', // Автоматическая высота
      x: 0, // Все в первой колонке
      y: index // Располагаем по порядку
    }))
  } else {
    // Восстанавливаем исходную расстановку для десктопа
    blocks.value = [
      { w: 4, h: 2, x: 0, y: 0, id: 'Unic1', type: 'HTML' },
      { w: 4, h: 2, x: 4, y: 0, id: 'Unic3', type: 'CSS' },
      { w: 4, h: 2, x: 8, y: 0, id: 'Unic9', type: 'Vue' },
      { w: 4, h: 2, x: 12, y: 0, id: 'Unic6', type: 'Js' },
      { w: 4, h: 2, x: 0, y: 2, id: 'Unic4', type: 'Git' },
      { w: 4, h: 2, x: 4, y: 2, id: 'Unic5', type: 'Browser' },
      { w: 4, h: 2, x: 8, y: 2, id: 'Unic8', type: 'Ts' },
      { w: 4, h: 2, x: 12, y: 2, id: 'Unic7', type: 'Nuxt' },
    ]
  }
}

const initGrid = () => {
  if (grid) {
    grid.destroy(false)
  }

  rearrangeBlocksForMobile() // Перестраиваем блоки в зависимости от устройства

  grid = GridStack.init(getGridStackOptions(), '.grid-stack')

  // Обновляем GridStack при изменении размера окна
  window.addEventListener('resize', handleResize)
}

const handleResize = () => {
  // Используем debounce для оптимизации
  clearTimeout((window as any).resizeTimer)
  ;(window as any).resizeTimer = setTimeout(() => {
    initGrid()
  }, 250)
}

onMounted(() => {
  initGrid()
})

onBeforeUnmount(() => {
  // Очищаем обработчик события при размонтировании компонента
  window.removeEventListener('resize', handleResize)
  if (grid) {
    grid.destroy(false)
  }
})
</script>

<template>
  <div class="p-4">
    <div class="grid-stack">
      <div
        v-for="block in blocks"
        :key="block.id"
        :gs-x="block.x"
        :gs-y="block.y"
        :gs-w="block.w"
        :gs-h="block.h"
        :gs-id="block.id"
        class="grid-stack-item"
      >
        <div class="grid-stack-item-content bg-neutral-900 rounded-lg p-3">
          <AccordionSection
            :title="block.type"
            :items="getAccordionProps(block.type).items"
            :placeholder="getAccordionProps(block.type).placeholder"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Дополнительные стили для мобильной версии */
@media (max-width: 768px) {
  .grid-stack {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .grid-stack-item {
    width: 100% !important;
    margin-bottom: 12px;
  }

  .grid-stack-item-content {
    min-height: auto;
    height: auto !important;
  }
}
</style>
