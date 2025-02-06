// Helper function to validate the email format using regex
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[\w-+.]+@([\w-]+\.)+[\w-]{2,}$/
  return emailRegex.test(email)
}
