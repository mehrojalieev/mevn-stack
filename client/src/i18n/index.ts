import {createI18n} from "vue-i18n"

import uz from "./uz.json";
import ru from "./ru.json";
import en from "./en.json";


const i18n = createI18n({
    locale: "uz",
    fallbackLocale: "uz",
    messages: {uz, ru, en},
    legacy: false
})


export default i18n