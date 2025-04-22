import { defineStore } from "pinia";
import { ref } from "vue";
import { getActiveLang } from "../../utils/cache/local-storage";
import { createPinia } from 'pinia'

const store = createPinia()

export const useUserStore = defineStore("user", () => {
    const language = ref<string>(getActiveLang() || 'uz')

    const setLanguage = (newLanguage: string) => {
        language.value = newLanguage
    }

    const getLanguage = () => {
        return  language.value
    }

    return {setLanguage, getLanguage}
})

export function useUserStoreHook(){
    return useUserStore(store)
}