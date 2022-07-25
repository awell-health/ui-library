import './richTextViewer.scss'
import { serializeHtml } from './serializeHtml'

interface RichTextViewerProps {
  nodes: Array<any>
}

export const RichTextViewer = ({ nodes }: RichTextViewerProps): JSX.Element => {
  const serializedHtml = serializeHtml(nodes)
  // fixme consider using parser, I'm not fond of using dangerouslySetInnerHTML here
  return <div dangerouslySetInnerHTML={{ __html: serializedHtml }} />
}
