import './richTextViewer.scss'
import { serializeHtml } from './serializeHtml'

interface RichTextViewerProps {
  nodes: Array<any>
}

export const RichTextViewer = ({ nodes }: RichTextViewerProps): JSX.Element => {
  const serializedHtml = serializeHtml(nodes)
  console.log(serializedHtml)
  return <div dangerouslySetInnerHTML={{ __html: serializedHtml }} />
}
