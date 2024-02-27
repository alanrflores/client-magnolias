import { useState } from "react";

export type LocalStorageState = string | null;

const useLocalStorage = (
  key: string,
  initialValue: string | null
): [
  LocalStorageState,
  React.Dispatch<React.SetStateAction<LocalStorageState>>
] => {
  const [storedValue, setStoredValue] = useState<LocalStorageState>(() => {
    try {
      if (typeof window !== "undefined") {
        const item = window.localStorage.getItem(key);
        return item ? item : initialValue;
      } else {
        return initialValue;
      }
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (
    value: LocalStorageState | ((val: LocalStorageState) => LocalStorageState)
  ): void => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      if (typeof valueToStore === "string" && typeof window !== "undefined") {
        setStoredValue(valueToStore);
        window.localStorage.setItem(key, valueToStore);
      } else {
        console.error("El valor a almacenar en el Local Storage debe ser una cadena.");
      }
    } catch (error) {
      console.error("Error al intentar establecer el valor en el Local Storage:", error);
    }
  }

  return [storedValue, setValue];
};

export default useLocalStorage;