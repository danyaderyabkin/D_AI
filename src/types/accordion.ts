export interface AccordionItem {
  id: string | number
  title: string
  content: AccordionContent[]
  isOpen?: boolean
}

export type AccordionContent =
  | { type: 'heading'; text: string; level?: 1 | 2 | 3 }
  | { type: 'paragraph'; text: string }
  | { type: 'text'; text: string }
  | { type: 'list'; title: string; items: { title?: string; text: string }[] }
  | { type: 'image'; src: string; alt?: string; caption?: string }
  | { type: 'code'; language: string; code: string }
