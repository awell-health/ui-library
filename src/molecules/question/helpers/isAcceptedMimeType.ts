/**
 * Checks whether a file's `contentType` is allowed by an `accept`-style list of MIME types.
 *
 * Unlike a plain `acceptedFileTypes.includes(contentType)`, this understands wildcards the same
 * way the HTML `accept` attribute does:
 *  - `*` or `*​/*` matches anything
 *  - `image/*` matches `image/png`, `image/jpeg`, … (any subtype)
 *  - an exact type (`application/pdf`) matches only itself
 *
 * Note: this does not normalise non-standard aliases (e.g. `image/jpg` is not `image/jpeg`) — those
 * should be corrected in the form configuration.
 */
export const isAcceptedMimeType = (
  contentType: string,
  acceptedFileTypes: string[]
): boolean => {
  if (contentType === '') return false

  return acceptedFileTypes.some((accepted) => {
    if (accepted === '*' || accepted === '*/*') return true
    if (accepted === contentType) return true
    // Wildcard subtype, e.g. "image/*" -> matches any "image/…"
    if (accepted.endsWith('/*')) {
      const prefix = accepted.slice(0, accepted.indexOf('/') + 1)
      return contentType.startsWith(prefix)
    }
    return false
  })
}
