import CacheKey from "../../constants/cache-key"

const setActiveLang = (langName: string) => {
    localStorage.setItem(CacheKey.ACTIVE_LANG_NAME, langName)
}

const getActiveLang = () => {
    return localStorage.getItem(CacheKey.ACTIVE_LANG_NAME) as string
}


export {setActiveLang, getActiveLang}