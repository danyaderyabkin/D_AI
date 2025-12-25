import type { AccordionItem } from '@/types/accordion'
import {ref} from "vue";
export function useCssData() {
  const cssItems = ref<AccordionItem[]>([
    {
      id: 1,
      title: 'Что такое CSS?',
      content: [
        { type: 'paragraph', text: 'CSS (Cascading Style Sheets) — это язык стилей, описывающий внешний вид HTML-документов. Он определяет, как элементы должны отображаться: цвета, шрифты, отступы, анимации.' },
        { type: 'code', language: 'css', code: '' },
        { type: 'list', title: 'Ключевые особенности', items: [
            { title: 'Каскадность', text: ' — стили применяются по приоритету (инлайн > ID > класс > тег).' },
            { title: 'Наследование ', text: 'дочерние элементы наследуют некоторые свойства родительских.' },
            { title: 'Селекторы ', text: 'позволяют точечно выбирать элементы для стилизации.' },
            { title: 'Адаптивность  ', text: 'медиазапросы (@media) помогают создавать responsive-дизайн.' },
          ]},
        { type: 'text', text: 'CSS работает в связке с HTML и JavaScript, формируя основу веб-интерфейсов.' },

      ]
    },
    {
      id: 2,
      title: 'Что такое Специфичность?',
      content: [
        { type: 'paragraph', text: 'Специфичность — это правило, по которому браузер определяет, какой стиль применить, если есть конфликтующие правила.' },
        { type: 'text', text: 'CSS работает в связке с HTML и JavaScript, формируя основу веб-интерфейсов.' },
        { type: 'list', title: 'Порядок веса', items: [
            { title: '!important', text: 'ломает каскад, лучше избегать' },
            { title: 'Inline-стили', text: '<div style="color: red">' },
            { title: 'ID', text: 'указывается через решетку - #header' },
            { title: 'Классы, атрибуты, псевдоклассы', text: '.button, [type="text"], :hover' },
            { title: 'Теги и псевдоэлементы', text: 'псевдоэлементы через двойное двоеточие - div, ::before' },
          ]},
        { type: 'list', title: 'Как считать специфичность', items: [
            { title: 'Формула: a-b-c-d', text: '' },
            { title: 'a', text: 'inline-стили (1 или 0)' },
            { title: 'b', text: 'количество ID' },
            { title: 'c', text: 'количество классов, псевдоклассов, атрибутов' },
            { title: 'd', text: 'количество тегов, псевдоэлементов' },
          ]},
        { type: 'text', text: 'Универсальный селектор (*) имеет специфичность 0000' },
        { type: 'text', text: 'Комбинаторы (+, >, ~, ) не увеличивают специфичность' },
        { type: 'text', text: 'При равной специфичности побеждает правило, которое объявлено позже в CSS' },
        { type: 'code', language: 'css', code: '/* Специфичность: 0001 */\n' +
            'p { color: black; }\n' +
            '\n' +
            '/* Специфичность: 0010 */\n' +
            '.text { color: blue; }\n' +
            '\n' +
            '/* Специфичность: 0011 */\n' +
            'p.text { color: green; }\n' +
            '\n' +
            '/* Специфичность: 0100 */\n' +
            '#main { color: red; }\n' +
            '\n' +
            '/* Специфичность: 0111 */\n' +
            '#main p.active { color: purple; }\n' +
            '\n' +
            '/* Специфичность: 1000 (inline) */\n' +
            '<div style="color: orange;">' },
      ]
    },
    {
      id: 3,
      title: 'Что такое Комбинаторы?',
      content: [
        { type: 'paragraph', text: 'Комбинаторы в CSS — это специальные символы, которые показывают отношения между элементами в дереве DOM.' },
        { type: 'list', title: 'Основные комбинаторы', items: [
            { title: 'Пробел (потомок) — A B', text: 'Выбирает все элементы B, которые находятся ВНУТРИ A (на любом уровне вложенности)' },
            { title: '> (дочерний) — A > B', text: 'Выбирает только дочерние 1 уровня, если в A есть C в котором тоже B то на него не сработает правило' },
            { title: '+ (соседний) — A + B', text: 'Выбирает элемент B, который идет сразу следующим тегом после A' },
            { title: '~ (родственный) — A ~ B', text: 'Выбирает ВСЕ элементы B, которые идут после A' },
          ]},
        { type: 'code', language: 'css', code: '.container p { color: gray; }       /* Все параграфы внутри container */\n' +
            '.container > p { border: 1px solid; } /* Только прямые дочерние параграфы */\n' +
            '.title + p { margin-top: 0; }       /* Параграф сразу после .title */\n' +
            '.title ~ p { font-size: 14px; }     /* Все параграфы после .title */' },
      ]
    }
  ])

  return { cssItems }
}
