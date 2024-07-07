export const useTimezone = (): string => {
  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone

  return userTimezone
}
