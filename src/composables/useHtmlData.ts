import type { AccordionItem } from '@/types/accordion'
import {ref} from "vue";

export function useHtmlData() {
  const htmlItems = ref<AccordionItem[]>([
    {
      id: 1,
      title: 'Что такое HTML?',
      content: [
        { type: 'heading', text: '', level: 2 },
        { type: 'paragraph', text: 'HTML (HyperText Markup Language) — язык разметки, используемый для создания структуры веб-страницы.' },
        { type: 'text', text: 'Он определяет элементы (заголовки, абзацы, списки) и их расположение.' },
        { type: 'list', title: 'Теги и атрибуты', items: [
            { title: 'Теги', text: 'Основные строительные блоки HTML' },
            { title: 'Атрибуты', text: 'Дополнительная информация для тегов' },
            { text: 'Теги и атрибуты в HTML не зависят от регистра' }
          ]}
      ]
    },
    {
      id: 2,
      title: 'Что такое DOCTYPE?',
      content: [
        { type: 'paragraph', text: '<!DOCTYPE> или «доктайп» — это сокращение от «тип документа» (document type).' },
        { type: 'code', language: 'html', code: '' },
        { type: 'text', text: 'Доктайп говорит браузеру работать со страницей в стандартном режиме.' }
      ]
    }
  ])

  return { htmlItems }
}
