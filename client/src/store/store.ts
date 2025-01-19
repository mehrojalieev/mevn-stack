import {defineStore} from "pinia"

export const useStore = defineStore("products", {
    state: () => ({
        cart_data: [],
        like_cart: []
    }),
    actions:{
        ProductAddToCart(product: any){            
            const productExistIndex = this.cart_data.findIndex((f: any) => f._id === product._id)
           
            if(productExistIndex === -1){
                (this.cart_data as any[]).push({...product, count: 1})
            }
            else{
                (this.cart_data as any[])[productExistIndex].count += 1;
            }
        },
        RemoveProductFromCart(product: any){
            const productExistIndex = this.cart_data.findIndex((f: any) => f._id === product._id)
            
            if(productExistIndex !== -1){
                (this.cart_data as any[])[productExistIndex].count -= 1;
                if((this.cart_data as any[])[productExistIndex].count === 0){
                    this.cart_data.splice(productExistIndex, 1)
                }
            }
        },
        ProductAddToLike(product: any){
            if(!this.like_cart.some((item: any) => item._id === product._id)){
                (this.like_cart as any[]).push(product)
            }
        },
        RemoveProductFromLike(product: any){
            this.like_cart = this.like_cart.filter((item: any) => item._id !== product._id)
        }

    },
    persist: true
    // {
    //     enabled: true,
    //     strategies:[
    //         {
    //             key: "products",
    //             storage: localStorage,
    //             paths: ["cart_data", "like_cart"]
    //         }
    //     ]
    // }
})