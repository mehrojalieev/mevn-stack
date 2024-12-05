import { createRouter, createWebHistory } from "vue-router";

const routes = createRouter({
    history: createWebHistory(),
    routes:[
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
                            component: () => import('../views/admin-dashboard/admin-routes/AllProducts.vue')
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
        }
    ]
})


routes.beforeEach((to, _, next) => {
        const role = 'admin'
        if(to.name === 'Dashboard'){
            if(role === 'admin'){
                next({name: 'AdminDashboard'})
            }
            else if(role === 'user'){
                next({name: 'UserDashboard'})
            }
            else{
                if(to.path.startsWith('/dashboard/admin') && role !== 'admin'){
                    next({name: 'Login'})
                }
                else if(to.path.startsWith("/dashboard/user") && role !== 'user'){
                    next({name: 'Login'})
                }
                else{
                    next()
                }
            }
        }
        else{
            next()
        }
})



export default routes