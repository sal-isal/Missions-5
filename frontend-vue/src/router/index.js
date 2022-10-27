//import vue router
import { createRouter, createWebHistory } from 'vue-router'

//define a routes
const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import( /* webpackChunkName: "home" */ '@/views/Index.vue')
    },
    {
        path: '/contacts',
        name: 'contacts.index',
        component: () => import( /* webpackChunkName: "post.index" */ '@/views/contacts/Index.vue')
    },
    {
        path: '/contacts/create',
        name: 'contacts.create',
        component: () => import( /* webpackChunkName: "post.create" */ '@/views/contacts/Create.vue')
    },
    {
        path: '/contacts/edit/:id',
        name: 'contacts.edit',
        component: () => import( /* webpackChunkName: "post.edit" */ '@/views/contacts/Edit.vue')
    }
]

//create router
const router = createRouter({
    history: createWebHistory(),
    routes  // config routes
})

export default router