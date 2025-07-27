// Shared utilities
export const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date)
}

export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

export const debounce = (fn: Function, delay: number) => {
  let timeoutId: NodeJS.Timeout
  return (...args: any[]) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn.apply(null, args), delay)
  }
}
