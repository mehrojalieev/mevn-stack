import { createRouter, createWebHistory } from "vue-router";

const routes = createRouter({
    history: createWebHistory(),
    routes:[
        {
            path: "/",
            name: "Home",
            component: () => import("../views/Home.vue"),
            meta:{
                
            }
        },
        {
            path: "/auth/",
            name: "Auth",
            component: () => import('../views/auth/Auth.vue'),
            children: [
                {
                    path: 'login',
                    name: "Login",
                    component: () => import('../views/auth/Login.vue')
                },
                {
                    path: 'register',
                    name: "Register",
                    component: () => import('../views/auth/Register.vue')
                }
            ]
        },
        {
            path: '/dashboard',
            name: "Dashboard",
            component: () => import('../views/dashboard/Dashboard.vue'),
            children: [
                {
                    path: 'admin',
                    name: "AdminDashboard",
                    component: () => import('../views/admin-dashboard/Admin.vue'),
                    children: [
                        {
                            path: 'products',
                            name: "Products",
                            component: () => import('../views/admin-dashboard/admin-routes/ManageProducts.vue')
                        },
                        {
                            path: 'users',
                            name: "Users",
                            component: () => import('../views/admin-dashboard/admin-routes/AllUsers.vue')
                        }
                    ]
                },
                {
                    path: 'user',
                    name: "UserDashboard",
                    component: () => import('../views/user-dashboard/User.vue')
                }
            ]
        },
        {
            path: "/products",
            name: "Products",
            component: () => import("../components/AllProducts.vue")
        },
        {
            path: "/cart",
            name: "Cart",
            component: () => import("../views/Cart.vue")
        },
        {
            path: "/like",
            name: "Like",
            component: () => import("../views/Like.vue")
        },

    ]
})


function isAuthenticated() {
    return localStorage.getItem("token");
}

routes.beforeEach((to, _, next) => {
        const role: any = 'admin'
        const isAuth = isAuthenticated()
        
        if(to.path.startsWith('/dashboard')){   
            if(!isAuth ){
               return next({name: 'Login'})
            }
            else if(role === 'admin' && to.path.startsWith('/dashboard/user')){
               return next({name: 'AdminDashboard'})
            }
            else if (role === "user" && to.path.startsWith("/dashboard/admin")) {
               return next({ name: "UserDashboard" });
            }
            else{
                next()
            }
        }

        else if(to.name === 'Login' && isAuth){
           return  next({name: role === 'admin' ? 'AdminDashboard' : 'UserDashboard'})
        }
        else if(to.name === "Dashboard" && isAuth){
            return next({name: role === 'admin' ? 'AdminDashboard' : 'UserDashboard'})
        }

        else{
            next()
        }
})



export default routes