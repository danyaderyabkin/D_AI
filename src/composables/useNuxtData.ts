import type { AccordionItem } from '@/types/accordion'
import {ref} from "vue";
export function useNuxtData() {
  const nuxtItems = ref<AccordionItem[]>([
    {
      id: 1,
      title: 'Что такое рендеринг в Nuxt?',
      content: [
        { type: 'paragraph', text: 'Nuxt предоставляет четыре стратегии рендеринга для разных нужд производительности' },
        { type: 'code', language: 'css', code: '' },
        { type: 'list', title: 'Ключевые особенности SSR(Server-Side Rendering)', items: [
            { title: '', text: 'Сервер рендерит HTML для первоначальной загрузки' },
            { title: '', text: 'Клиент "гидратирует" приложение' },
            { title: '', text: 'Плюсы: SEO, быстрая первоначальная загрузка' },
            { title: '', text: 'Минусы: нагрузка на сервер' },
          ]},
        { type: 'list', title: 'Ключевые особенности SSG(Static Site Generation)', items: [
            { title: '', text: 'HTML генерируется на этапе сборки' },
            { title: '', text: 'Плюсы: максимальная производительность, кеширование' },
            { title: '', text: 'Минусы: динамический контент требует перестройки' },
          ]},
        { type: 'list', title: 'Ключевые особенности SPA(Single Page Application)', items: [
            { title: '', text: 'Только клиентский рендеринг' },
            { title: '', text: 'Плюсы: быстрая навигация после загрузки' },
            { title: '', text: 'Минусы: плохой SEO, медленная первоначальная загрузка' },
          ]},
      ]
    },
    {
      id: 2,
      title: 'Что такое гидратация в Nuxt?',
      content: [
        { type: 'paragraph', text: 'Гидратация в Nuxt — это процесс, при котором статичный HTML, сгенерированный на сервере, превращается в интерактивное веб-приложение.' },
        { type: 'paragraph', text: 'Ошибка гидратации (hydration mismatch) в Nuxt возникает, когда HTML, сгенерированный на сервере, не точно соответствует тому, что Vue пытается отобразить на клиенте. ' },
        { type: 'code', language: 'css', code: '' },
      ]
    },
  ])

  return { nuxtItems }
}
