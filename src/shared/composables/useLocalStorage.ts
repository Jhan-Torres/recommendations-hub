import { ref, watch, Ref } from "vue";

export function useLocalStorage<T>(
  key: string,
  defaultValue: T,
  serializer?: {
    read: (value: string) => T;
    write: (value: T) => string;
  }
): [Ref<T>, (value: T) => void] {
  const storedValue = localStorage.getItem(key);

  const read = serializer?.read || JSON.parse;
  const write = serializer?.write || JSON.stringify;

  const storedRef = ref<T>(
    storedValue !== null ? read(storedValue) : defaultValue
  ) as Ref<T>;

  const setValue = (value: T) => {
    try {
      storedRef.value = value;
      localStorage.setItem(key, write(value));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  // Watch for changes and sync to localStorage
  watch(
    storedRef,
    (newValue) => {
      try {
        localStorage.setItem(key, write(newValue));
      } catch (error) {
        console.error(`Error syncing localStorage key "${key}":`, error);
      }
    },
    { deep: true }
  );

  return [storedRef, setValue];
}
