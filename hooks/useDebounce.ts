import { useState, useEffect } from 'react';

/**
 * Hook para debouncing de um valor
 * @param value - Valor a ser debounced
 * @param delay - Delay em milissegundos para aplicar o debounce
 * @returns Valor debounced
 */
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
