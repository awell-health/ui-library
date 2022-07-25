import escapeHtml from 'escape-html'

const serializeReducer = (acc = [], node: any) => {
  const className = Object.entries(node).reduce(
    (classNames, [prop, value]): any => {
      switch (prop) {
        case 'align':
          return [...classNames, `align-${value}`]
        case 'indent':
          return [...classNames, `indent-${value}`]
        case 'lineHeight':
          return [
            ...classNames,
            `line-height-${String(value).replace('.', '_')}`,
          ]
        case 'fontSize':
          return [...classNames, `font-size-${value}`]
        case 'bold':
        case 'italic':
        case 'underline':
        case 'strikethrough':
          return [...classNames, prop]
        default:
          return classNames
      }
    },
    []
  )

  const classAttribute = className.length
    ? ` class="${className.join(' ')}"`
    : ''

  if (node.hasOwnProperty('text')) {
    return classAttribute
      ? `${acc}<span${classAttribute}>${escapeHtml(node.text)}</span>`
      : `${acc}${escapeHtml(node.text)}`
  }

  const children = node.children.reduce(serializeReducer, '')

  switch (node.type) {
    case 'h1':
      return `${acc}<h1${classAttribute}>${children}</h1>`
    case 'h2':
      return `${acc}<h2${classAttribute}>${children}</h2>`
    case 'h3':
      return `${acc}<h2${classAttribute}>${children}</h2>`
    case 'ul':
      return `${acc}<ul${classAttribute}>${children}</ul>`
    case 'ol':
      return `${acc}<ol${classAttribute}>${children}</ol>`
    case 'li':
      return `${acc}<li${classAttribute}>${children}</li>`
    case 'lic':
      return `${acc}<span${classAttribute}>${children}</span>`
    case 'hr':
      return `${acc}<hr />`
    case 'p':
      return `${acc}<p${classAttribute}>${children}</p>`
    case 'a':
      return `${acc}<a href="${escapeHtml(
        node.url
      )}"${classAttribute}>${children}</a>`
    case 'media_embed':
      return `${acc}<embed type="video/webm"
       src="${escapeHtml(node.url)}"
       width="250"
       height="200">`
    default:
      return `${acc}${children}`
  }
}

export const serializeHtml = (nodes: Array<any> | string) => {
  if (Array.isArray(nodes)) {
    return nodes.reduce(serializeReducer, '')
  }
  return JSON.parse(nodes).reduce(serializeReducer, '')
}
