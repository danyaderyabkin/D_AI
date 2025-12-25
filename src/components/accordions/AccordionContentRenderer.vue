<template>
  <div class="space-y-2">
    <template v-for="(contentItem, index) in content" :key="index">
      <!-- Заголовок -->
      <component
        v-if="contentItem.type === 'heading' && hasContent(contentItem)"
        :is="`h${contentItem.level || 2}`"
        class="text-white font-semibold text-lg mb-2"
      >
        {{ contentItem.text }}
      </component>

      <!-- Параграф -->
      <p
        v-else-if="contentItem.type === 'paragraph' && hasContent(contentItem)"
        class="text-gray-300 text-sm"
      >
        {{ contentItem.text }}
      </p>

      <!-- Простой текст -->
      <div
        v-else-if="contentItem.type === 'text' && hasContent(contentItem)"
        class="text-gray-400 text-xs"
      >
        {{ contentItem.text }}
      </div>

      <!-- Список -->
      <div v-else-if="contentItem.type === 'list' && hasContent(contentItem)">
        <h4 v-if="contentItem.title" class="mb-2 font-semibold text-white text-sm">{{ contentItem.title }}</h4>
        <ul class="list-disc pl-5 space-y-1">
          <li
            v-for="(item, itemIndex) in contentItem.items"
            :key="itemIndex"
            class="text-gray-300 text-xs"
          >
            <strong v-if="item.title" class="text-white">{{ item.title }}:</strong> {{ item.text }}
          </li>
        </ul>
      </div>

      <!-- Изображение -->
      <div
        v-else-if="contentItem.type === 'image' && hasContent(contentItem)"
        class="my-3"
      >
        <img
          :src="contentItem.src"
          :alt="contentItem.alt || 'Image'"
          class="w-full max-w-[400px] h-auto rounded-lg"
        />
        <div
          v-if="contentItem.caption"
          class="text-gray-400 text-xs text-center mt-2"
        >
          {{ contentItem.caption }}
        </div>
      </div>

      <!-- Код -->
      <div
        v-else-if="contentItem.type === 'code' && hasContent(contentItem)"
        class="my-3"
      >
        <pre class="bg-neutral-900 rounded-lg p-4 overflow-x-auto"><code class="text-xs text-green-400">{{ contentItem.code }}</code></pre>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { AccordionContent } from '@/types/accordion'

interface Props {
  content: AccordionContent[]
}

defineProps<Props>()

// Функция проверки наличия контента
const hasContent = (contentItem: AccordionContent): boolean => {
  switch (contentItem.type) {
    case 'heading':
    case 'paragraph':
    case 'text':
      return !!contentItem.text && contentItem.text.length > 0

    case 'list':
      return !!contentItem.items && contentItem.items.length > 0

    case 'image':
      return !!contentItem.src && contentItem.src.length > 0

    case 'code':
      return !!contentItem.code && contentItem.code.length > 0

    default:
      return false
  }
}
</script>
