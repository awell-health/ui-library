/**
 * Checks whether a file's `contentType` is allowed by an `accept`-style list of MIME types.
 *
 * Unlike a plain `acceptedFileTypes.includes(contentType)`, this understands wildcards the same
 * way the HTML `accept` attribute does:
 *  - `*` or `*​/*` matches anything
 *  - `image/*` matches `image/png`, `image/jpeg`, … (any subtype)
 *  - an exact type (`application/pdf`) matches only itself
 *
 * Matching is case-insensitive and tolerant of surrounding whitespace, mirroring how browsers
 * treat the `accept` attribute.
 *
 * Note: this expects MIME types (not file extensions like `.pdf`), and does not normalise
 * non-standard aliases (e.g. `image/jpg` is not `image/jpeg`) — those should be corrected in the
 * form configuration.
 */
export const isAcceptedMimeType = (
  contentType: string,
  acceptedFileTypes: string[]
): boolean => {
  const normalizedContentType = (contentType ?? '').trim().toLowerCase()
  if (normalizedContentType === '') return false

  return acceptedFileTypes.some((accepted) => {
    const normalized = (accepted ?? '').trim().toLowerCase()
    if (normalized === '') return false
    if (normalized === '*' || normalized === '*/*') return true
    if (normalized === normalizedContentType) return true
    // Wildcard subtype, e.g. "image/*" -> matches any "image/…"
    if (normalized.endsWith('/*')) {
      const prefix = normalized.slice(0, normalized.indexOf('/') + 1)
      return normalizedContentType.startsWith(prefix)
    }
    return false
  })
}
