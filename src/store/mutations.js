/**
 * @Description:
 * @author 冷暖自知
 * @date 2020/1/27 12:23
 */

export default {
    saveUserName(state, username) {
        state.username = username;
    },
    saveCartCount(state, count) {
        state.cartCount = count;
    }
}