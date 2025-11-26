<template>
  <div class="border border-gray-50/10 rounded-lg overflow-hidden">
    <div
      v-for="(item, index) in displayItems"
      :key="item.id"
      class="border-b border-gray-700 last:border-b-0"
    >
      <button
        class="w-full flex justify-between items-center p-2 bg-transparent border-none cursor-pointer text-left transition-colors duration-300 hover:bg-neutral-800"
        @click="toggleItem(index)"
      >
        <span class="font-semibold text-white text-sm">{{ item.title }}</span>
        <span
          class="transition-transform duration-300 text-gray-400"
          :class="{ 'rotate-180': openStates[index] }"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 7.5L10 12.5L15 7.5"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </span>
      </button>
      <div
        class="transition-all duration-300 ease-in-out overflow-hidden"
        :class="openStates[index] ? 'max-h-[2000px]' : 'max-h-0'"
      >
        <div class="p-3 pt-2 bg-neutral-950">
          <AccordionContentRenderer :content="item.content" />
        </div>
      </div>
    </div>

    <!-- Сообщение если ничего не найдено -->
    <div
      v-if="displayItems.length === 0"
      class="p-4 text-center text-neutral-400 text-sm"
    >
      Ничего не найдено
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import AccordionContentRenderer from './AccordionContentRenderer.vue'
import type { AccordionItem } from '@/types/accordion'

interface Props {
  items?: AccordionItem[]
}

const props = withDefaults(defineProps<Props>(), {
  items: () => []
})

// Безопасный доступ к items
const displayItems = computed(() => {
  return Array.isArray(props.items) ? props.items : []
})

// Отдельный реактивный массив для состояний открытия/закрытия
const openStates = ref<boolean[]>([])

// Инициализируем состояния
const initializeStates = () => {
  openStates.value = displayItems.value.map(item => item.isOpen || false)
}

// Следим за изменениями items
watch(displayItems, initializeStates, { immediate: true, deep: true })

const toggleItem = (index: number) => {
  if (openStates.value[index] !== undefined) {
    openStates.value[index] = !openStates.value[index]
  }
}
</script>
