import { areAttachmentsValid } from './areAttachmentsValid'
import { isAttachmentValid } from './isAttachmentValid'

const imagePng = JSON.stringify({
  url: 'https://example.com/a.png',
  filename: 'a.png',
  contentType: 'image/png',
  size: 123,
})

describe('isAttachmentValid (File questions)', () => {
  it('passes a required upload that has a url', () => {
    expect(
      isAttachmentValid({
        attachmentsValue: imagePng,
        acceptedFileTypes: ['image/jpeg'],
        required: true,
      })
    ).toBe(true)
  })

  it('accepts an image/png against an `image/*` config (wildcard)', () => {
    expect(
      isAttachmentValid({
        attachmentsValue: imagePng,
        acceptedFileTypes: ['image/*'],
        required: false,
      })
    ).toBe(true)
  })

  it('rejects a type not covered by the accepted list', () => {
    expect(
      isAttachmentValid({
        attachmentsValue: imagePng,
        acceptedFileTypes: ['application/pdf'],
        required: false,
      })
    ).toBe(false)
  })
})

describe('areAttachmentsValid (Image questions)', () => {
  it('passes a mandatory image stored as a single object (not an array)', () => {
    // Regression: value is a single stringified object, previously read as an array
    expect(
      areAttachmentsValid({
        attachmentsValue: imagePng,
        acceptedFileTypes: ['image/*'],
        required: true,
      })
    ).toBe(true)
  })

  it('accepts an image/png against `image/*` when not required', () => {
    expect(
      areAttachmentsValid({
        attachmentsValue: imagePng,
        acceptedFileTypes: ['image/*'],
        required: false,
      })
    ).toBe(true)
  })

  it('is valid when empty and not required', () => {
    expect(
      areAttachmentsValid({
        attachmentsValue: '',
        acceptedFileTypes: ['image/*'],
        required: false,
      })
    ).toBe(true)
  })

  it('is invalid when empty and required', () => {
    expect(
      areAttachmentsValid({
        attachmentsValue: '',
        acceptedFileTypes: ['image/*'],
        required: true,
      })
    ).toBe(false)
  })
})
