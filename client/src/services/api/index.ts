import axios from "axios"

const ApiInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers:{
        "Content-type": "application/json"
    }
})


ApiInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token") && localStorage.getItem("token")
    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
},
(error) => {
    return Promise.reject(error)
}
)


// ApiInstance.interceptors.response.use((response) => {
//     return response;
// },
// (error) => {
//     if(error.response.status === 401){
//         localStorage.removeItem("token")
//     }
//     return Promise.reject(error)
// }
// )

export default ApiInstance