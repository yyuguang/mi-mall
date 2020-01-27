/**
 * @Description:
 * @author 冷暖自知
 * @date 2020/1/27 12:23
 */

import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations'
import actions from './action'

Vue.use(Vuex);

const state = {
    username: '',//登录用户名
    cartCount: 0//购物车商品数量
};
export default new Vuex.Store({
    state,
    mutations,
    actions
})