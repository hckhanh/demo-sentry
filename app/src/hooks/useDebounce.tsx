import { useEffect, useState } from 'react'

export default function useDebounce<T>(value: T, delay: number): T {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(
    () => {
      // Update the debounced value after the specified delay
      const handler = setTimeout(() => {
        setDebouncedValue(value)
      }, delay)

      // Cancel the timer on cleanup
      return () => {
        clearTimeout(handler)
      }
    },
    [value, delay], // Recompute debounce function if these inputs change
  )

  return debouncedValue
}
