import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import _ from 'lodash'
const Index = () => import('@/pages/index/index.vue');
const Login = () => import('@/pages/login/index.vue');
const Regstry = () => import('@/pages/regstry/index.vue');
const EssayDetail = () => import('@/pages/essayDetail/index.vue')
const ProductDetail = () => import('@/pages/productDetail/index.vue')
const address = () => import('@/pages/address/index.vue')
const addressEdit = () => import('@/pages/addressEdit/index.vue')
const memberCenter = () => import('@/pages/memberCenter/index.vue')
const createOrder = () => import('@/pages/createOrder/index.vue')
const orderList = () => import('@/pages/orderList/index.vue')
const changePassword = () => import('@/pages/changePassword/index.vue')
const orderDetail = () => import('@/pages/orderDetail/index.vue')
const information = () => import('@/pages/information/index.vue')
const search = () => import('@/pages/search/index.vue')
const form = () => import('@/pages/form/index.vue')

const routes = [
    {
        path: '/',
        name: "index",
        component: Index
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/essayDetail',
        name: 'essayDetail',
        component: EssayDetail
    },
    {
        path: '/productDetail',
        name: 'productDetail',
        component: ProductDetail
    },
    {
        path: '/regstry',
        name: 'regstry',
        component: Regstry
    },
    {
        path: '/address',
        name: 'address',
        meta: {
            login: true
        },
        component: address
    },
    {
        path: '/addressEdit',
        name: 'addressEdit',
        meta: {
            login: true
        },
        component: addressEdit
    },
    {
        path: '/memberCenter',
        name: 'memberCenter',
        meta: {
            login: true
        },
        component: memberCenter
    },
    {
        path: '/createOrder/',
        name: 'createOrder',
        component: createOrder
    },
    {
        path: '/orderList',
        name: 'orderList',
        meta: {
            login: true
        },
        component: orderList
    },
    {
        path: '/changePassword',
        name: 'changePassword',
        meta: {
            login: true
        },
        component: changePassword
    },
    {
        path: '/orderDetail',
        name: "orderDetail",
        meta: {
            login: true
        },
        component: orderDetail
    },
    {
        path: '/information',
        name: "information",
        meta: {
            login: true
        },
        component: information
    },
    {
        path: '/search',
        name: "search",
        component: search
    },
    {
        path: '/form',
        name: "form",
        component: form
    },
];

const router = createRouter({
    history: createWebHashHistory('/webmin/'),
    routes
})

router.beforeEach((to, from) => {
    const { login } = to.meta
    if (login) {
        const storage = localStorage.getItem('siteData');
        const data = JSON.parse(storage);
        const loginInfo = data.loginInfo;
        if (_.isEmpty(loginInfo)) {
            return {
                name: 'login'
            }
        }
        return true
    }
    return true
})

export default router;