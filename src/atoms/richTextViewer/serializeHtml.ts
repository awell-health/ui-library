import escapeHtml from 'escape-html'
import { Nodes, Node, isText, isElement } from '../../types'

const generateClassAttribute = (node: Node): string | undefined => {
  const classes = Object.entries(node)
    .map(([prop, value]) => {
      switch (prop) {
        case 'align':
          return `align-${value}`
        case 'indent':
          return `indent-${value}`
        case 'lineHeight':
          return `line-height-${String(value).replace('.', '_')}`
        case 'fontSize':
          return `font-size-${value}`
        case 'bold':
        case 'italic':
        case 'underline':
        case 'strikethrough':
          return prop
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
    return `<${type}>${serializeHtml(node.children)}</${type}>`
  }
  return ''
}

export const serializeHtml = (nodes: Nodes | string) => {
  const nodesArray = Array.isArray(nodes) ? nodes : (JSON.parse(nodes) as Nodes)
  return nodesArray.map((node) => serializeNode(node)).join('')
}
