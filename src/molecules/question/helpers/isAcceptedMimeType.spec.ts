import { isAcceptedMimeType } from './isAcceptedMimeType'

describe('isAcceptedMimeType', () => {
  it('matches an exact MIME type', () => {
    expect(isAcceptedMimeType('application/pdf', ['application/pdf'])).toBe(true)
    expect(isAcceptedMimeType('image/png', ['application/pdf'])).toBe(false)
  })

  it('expands `type/*` wildcards', () => {
    expect(isAcceptedMimeType('image/png', ['image/*'])).toBe(true)
    expect(isAcceptedMimeType('image/jpeg', ['image/*'])).toBe(true)
    expect(isAcceptedMimeType('application/pdf', ['image/*'])).toBe(false)
  })

  it('treats `*` and `*/*` as accept-anything', () => {
    expect(isAcceptedMimeType('image/png', ['*'])).toBe(true)
    expect(isAcceptedMimeType('image/png', ['*/*'])).toBe(true)
  })

  it('matches against any entry in the list', () => {
    expect(
      isAcceptedMimeType('image/png', ['application/pdf', 'image/*'])
    ).toBe(true)
  })

  it('does not match an empty contentType', () => {
    expect(isAcceptedMimeType('', ['image/*'])).toBe(false)
  })

  it('does not treat non-standard aliases as equal', () => {
    // `image/jpg` is not a real MIME type; it must not match `image/jpeg`
    expect(isAcceptedMimeType('image/jpeg', ['image/jpg'])).toBe(false)
  })
})
