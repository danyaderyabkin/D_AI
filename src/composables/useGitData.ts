import type { AccordionItem } from '@/types/accordion'
import {ref} from "vue";
export function useGitData() {
  const gitItems = ref<AccordionItem[]>([
    {
      id: 1,
      title: 'Что такое GitFlow?',
      content: [
        { type: 'paragraph', text: 'GitFlow — это набор правил для организации веток в Git, чтобы упростить работу над проектом (особенно в команде).' },
        { type: 'code', language: 'css', code: '' },
        { type: 'list', title: 'Основные ветки в GitFlow', items: [
            { title: 'main (или master)', text: 'Содержит стабильную версию кода (то, что работает в продакшене)' },
            { title: 'develop', text: 'Основная ветка для разработки. В неё сливаются все фичи.' },
            { title: 'feature', text: 'Ветки для разработки новых функций. Создаются от develop, вливаются обратно через merge.' },
            { title: 'release', text: 'Ветка для подготовки релиза (тестирование, фикс багов). После тестов сливается в main и develop.' },
            { title: 'hotfix', text: 'Срочные исправления в main (минуя develop). После фикса сливаются в main и develop.' },
          ]},
        { type: 'paragraph', text: 'Плюсы GitFlow: Четкое разделение этапов разработки. Удобно для проектов с релизами (например, мобильные приложения).' },
        { type: 'paragraph', text: 'Минусы GitFlow: Сложнее для маленьких проектов. Много веток = нужно следить за их актуальностью.' },
      ]
    },
    {
      id: 2,
      title: 'Основные Git-команды',
      content: [
        { type: 'paragraph', text: 'GitFlow — это набор правил для организации веток в Git, чтобы упростить работу над проектом (особенно в команде).' },
        { type: 'code', language: 'css', code: '' },
        { type: 'list', title: 'Основные команды', items: [
            { title: 'git init', text: 'Создать новый репозиторий' },
            { title: 'git clone [url]', text: 'Склонировать удаленный репозиторий' },
            { title: 'git add [файл]', text: 'Добавить файл в индекс (staging)' },
            { title: 'git commit -m "сообщение"', text: 'Закоммитить изменения' },
            { title: 'git status', text: 'Показать изменения и состояние файлов' },
            { title: 'git push', text: 'Отправить коммиты в удаленный репозиторий' },
            { title: 'git pull', text: 'Забрать изменения с удаленного репозитория' },
            { title: 'git branch', text: 'Показать список веток' },
            { title: 'git checkout [ветка]', text: 'Переключиться на ветку' },
            { title: 'git log', text: 'Показать историю коммитов' },
          ]},
      ]
    },
    {
      id: 3,
      title: 'Отличие git merge от git rebase',
      content: [
        { type: 'paragraph', text: 'merge - Создаёт новый коммит, который объединяет изменения из исходной ветки в целевую. Этот коммит явно указывает на то, что произошло объединение веток.' },
        { type: 'paragraph', text: 'rebase - Перемещает коммиты из исходной ветки в целевую. Это приводит к линейной истории, где изменения из исходной ветки выглядят так, как если бы они были выполнены непосредственно в целевой ветке.' },
      ]
    },
  ])

  return { gitItems }
}
