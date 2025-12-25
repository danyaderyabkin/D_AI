<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { GridStack } from 'gridstack'
import 'gridstack/dist/gridstack.min.css'
import AccordionSection from '@/components/accordions/AccordionSection.vue'
import { useHtmlData } from '@/composables/useHtmlData'
import { useCssData } from '@/composables/useCssData'
import { useVueData } from '@/composables/useVueData'
import { useNuxtData } from '@/composables/useNuxtData'
import { useJsData } from '@/composables/useJsData'


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
    // Добавьте другие типы по мере необходимости
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
      items: [],
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

const gridStackOptions = {
  animate: true,
  cellHeight: '200px',
  float: true,
  column: 16,
  margin: 6,
  resizable: { handles: 'e, se, s, sw, w, nw, n, ne' },
  disableDrag: false,
  disableResize: false,
}

const initGrid = () => {
  if (grid) {
    grid.destroy(false)
  }
  grid = GridStack.init(gridStackOptions, '.grid-stack')
}

onMounted(() => {
  initGrid()
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
