<template>
  <div>
    <div class="flex justify-between items-center mb-4">
      <p class="font-semibold text-white">{{ title }}</p>

      <!-- Поиск внутри компонента -->
      <div class="relative w-48">
        <input
          v-model="searchQuery"
          type="text"
          :placeholder="placeholder"
          class="w-full pl-3 pr-6 py-1 bg-neutral-900 border border-neutral-800 rounded-md text-white placeholder-neutral-400 focus:outline-none  text-xs"
        >
        <button
          v-if="searchQuery"
          @click.prevent="searchQuery = ''"
          class="absolute right-0 px-2 h-full text-xs text-gray-300 hover:text-white"
        >
          ×
        </button>
      </div>
    </div>

    <BaseAccordion :items="filteredItems" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import BaseAccordion from './BaseAccordion.vue'
import type { AccordionItem } from '@/types/accordion'

interface Props {
  title?: string
  items: AccordionItem[]
  placeholder?: string
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Поиск...'
})

const searchQuery = ref('')

// Фильтрация элементов аккордеона по поисковому запросу
const filteredItems = computed(() => {
  const items = props.items || []

  if (!searchQuery.value.trim()) {
    return items
  }

  const query = searchQuery.value.toLowerCase().trim()

  return items.filter(item => {
    // Поиск в заголовке
    if (item.title.toLowerCase().includes(query)) {
      return true
    }

    // Поиск в контенте
    return item.content.some(content => {
      // Для текстовых типов контента
      if (content.type !== 'code' && 'text' in content && content.text.toLowerCase().includes(query)) {
        return true
      }

      // Для списков - поиск по заголовку списка и элементам
      if (content.type === 'list') {
        // Поиск по заголовку списка
        if (content.title && content.title.toLowerCase().includes(query)) {
          return true
        }

        // Поиск по элементам списка
        if (content.items && content.items.some(item =>
          (item.title && item.title.toLowerCase().includes(query)) ||
          item.text.toLowerCase().includes(query)
        )) {
          return true
        }
      }

      return false
    })
  })
})
</script>
