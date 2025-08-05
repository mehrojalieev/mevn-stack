import ApiInstance from "../services/api"

export const getProducts = async () => {
    await ApiInstance.get('/product/all')
}