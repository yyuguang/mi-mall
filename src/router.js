/**
 * @Description: 路由
 * @author 冷暖自知
 * @date 2020/1/24 15:38
 */

import Vue from 'vue'
import Router from 'vue-router'
import Home from './pages/home'
import Index from './pages/index'
import Product from './pages/product'
import Detail from './pages/detail'

Vue.use(Router);

export default new Router({
    routes: [{
        path: '/',
        name: 'home',
        component: Home,
        children: [
            {
                path: '/index',
                name: 'index',
                component: Index
            }, {
                path: '/product/:id',
                name: 'product',
                component: Product
            }, {
                path: '/detail/:id',
                name: 'detail',
                component: Detail
            },
        ]
    }]
});
