import {createI18n} from "vue-i18n"
import uz from "./uz.json";
import ru from "./ru.json";
import en from "./en.json";
import { ref } from "vue";

import { getActiveLang, setActiveLang } from "../utils/cache/local-storage";

const activeLangName: any  = ref(getActiveLang() || "uz")

const i18n = createI18n({
    locale: activeLangName.value,
    fallbackLocale: activeLangName.value,
    messages: {uz, ru, en},
    legacy: false
})

export const changeLocale = (language: string) => {
    i18n.global.locale.value = language
    setActiveLang(language)
}


export default i18n