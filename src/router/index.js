// import vue router
import { createRouter, createWebHistory } from "vue-router";

// import axios
import axios from 'axios'

// defaul base url / endpoint api
axios.defaults.baseURL = "http://localhost:8000";

// define a routes
const routes = [
    {
        path: '/',
        name: 'home',
        component:() => import("@/views/home/index"),
    },
    {
        path: '/post',
        name: 'post',
        component:() => import("@/views/post/index"),
    },
    {
        path: '/tag/:slug',
        name: 'detail_tag',
        component:() => import("@/views/tag/show"),
    },
    {
        path: '/category/:slug',
        name: 'detail_category',
        component:() => import("@/views/category/show"),
    },
    {
        path: '/event',
        name: 'event',
        component:() => import("@/views/event/index"),
    },
    {
        path: '/event/:slug',
        name: 'detail_event',
        component:() => import("@/views/event/show"),
    },
    {
        path: '/photo',
        name: 'photo',
        component:() => import("@/views/photo/index"),
    },
    {
        path: '/video',
        name: 'video',
        component:() => import("@/views/video/index"),
    },
    {
        path: '/contact',
        name: 'contact',
        component:() => import("@/views/contact/index"),
    },
    {
        path: '/:slug',
        name: 'detail_post',
        component:() => import("@/views/post/show"),
    },
]

// create router
const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router