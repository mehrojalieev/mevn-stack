import { type Ref, ref } from 'vue';

const getItem = (key: string, storage: Storage): any => {
  let value = storage.getItem(key);
  if (!value) return null;

  try {
    return JSON.parse(value)
  } catch (error) {
    return value;
  }
}

export const useStorage = (key: any, type: any = 'session'): [Ref<any>, (newValue: any) => void] => {

  const storage = type === "local" ? localStorage : sessionStorage;

  const value = ref(getItem(key, storage));

  const setItem = (newValue: any) => {
      value.value = newValue;
      storage.setItem(key, JSON.stringify(newValue));
  }
  return [value, setItem]
}