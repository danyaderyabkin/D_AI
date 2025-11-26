import type { AccordionItem } from '@/types/accordion'
import {ref} from "vue";
export function useCssData() {
  const cssItems = ref<AccordionItem[]>([
    {
      id: 1,
      title: 'Что такое CSS?',
      content: [
        { type: 'paragraph', text: 'CSS (Cascading Style Sheets) — язык стилей для оформления HTML-документов.' },
        { type: 'code', language: 'css', code: '.selector {\n    color: red;\n    font-size: 16px;\n}' },
        { type: 'image', src: '/images/48721.jpg', alt: 'Пример CSS', caption: 'Визуальное представление CSS' }
      ]
    }
  ])

  return { cssItems }
}
