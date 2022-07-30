import type {
  Node as SlateNode,
  Element as SlateElement,
  Text as SlateText,
} from 'slate'

export type Node = SlateNode
export type Element = SlateElement
export type Text = SlateText
export type Nodes = Array<Node>

export const isText = (node: Node): node is Text => {
  // @ts-expect-error: Yes typescript, the text property only exists on Text
  // which is the entire point of this typeguard
  return node.text
}

export const isElement = (node: Node): node is Element => {
  // @ts-expect-error: Yes typescript, the children property only exists on Element
  // which is the entire point of this typeguard
  return node.children
}
