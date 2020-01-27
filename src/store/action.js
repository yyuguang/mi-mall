/**
 * @Description:
 * @author 冷暖自知
 * @date 2020/1/27 12:23
 */

export default {
    saveUserName(context, username) {
        context.commit('saveUserName', username);
    },
    saveCartCount(context, count) {
        context.commit('saveCartCount', count);
    }
}