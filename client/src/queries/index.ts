import {useQuery} from "@tanstack/vue-query"
import * as productApi from '../api/productApi'


export const useProducts = () => useQuery({
    queryKey: ['all-products'],
    queryFn: productApi.getProducts
    })


