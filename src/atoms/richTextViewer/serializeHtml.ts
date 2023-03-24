import DOMPurify, { sanitize } from 'dompurify'
import escapeHtml from 'escape-html'
import { Nodes, Node, isText, isElement } from '../../types'
import richTextClasses from './richTextViewer.module.scss'

const generateClassAttribute = (node: Node): string | undefined => {
  const classes = Object.entries(node)
    .map(([prop]) => {
      switch (prop) {
        case 'bold':
        case 'italic':
        case 'underline':
        case 'strikethrough':
          return richTextClasses[prop]
        default:
          return undefined
      }
    })
    .filter((c) => c)
  if (classes.length > 0) {
    return `class="${classes.join(' ')}"`
  }
  return undefined
}

const serializeNode = (node: Node): string => {
  if (isText(node)) {
    const classAttribute = generateClassAttribute(node)
    if (classAttribute === undefined) {
      return escapeHtml(node.text)
    } else {
      return `<span ${classAttribute}>${escapeHtml(node.text)}</span>`
    }
  } else if (isElement(node)) {
    // @ts-expect-error: Not sure why typescript complains here, type is supposed
    // to be defined in Elements
    const type = node.type || 'div'

    // @ts-expect-error: Not sure why typescript complains here, type is supposed
    // to be defined in Elements
    if (node.type === 'a') {
      return `<${type} href="${
        // @ts-expect-error
        node?.url
      }" target="_blank" rel="noopener noreferrer">${serializeHtml(
        node.children
      )}</${type}>`
    }

    return `<${type}>${serializeHtml(node.children)}</${type}>`
  }
  return ''
}

export const serializeHtml = (nodes: Nodes | string): string => {
  const nodesArray = Array.isArray(nodes) ? nodes : (JSON.parse(nodes) as Nodes)
  return nodesArray.map((node) => serializeNode(node)).join('')
}

export const generatePureHtml = (content: Nodes | string): string => {
  let isSlate = true
  try {
    Array.isArray(content) ? content : JSON.parse(content)
  } catch (e) {
    isSlate = false
  }

  DOMPurify.addHook('uponSanitizeElement', (node, data) => {
    if (data.tagName === 'iframe') {
      const src = node.getAttribute('src') ?? ''
      const isYoutube = src.startsWith('https://www.youtube.com/embed/')
      const isVimeo = src.startsWith('https://player.vimeo.com/video/')
      if (!isYoutube && !isVimeo) {
        return node.parentNode?.removeChild(node)
      }
    }
  })

  // See https://github.com/cure53/DOMPurify/issues/317
  const purifiedMessage = sanitize(
    isSlate ? serializeHtml(content) : (content as string),
    {
      ADD_TAGS: ['iframe'],
      ADD_ATTR: ['target', 'allow', 'allowfullscreen', 'frameborder', 'scrolling'],
    }
  )
  return purifiedMessage
}


