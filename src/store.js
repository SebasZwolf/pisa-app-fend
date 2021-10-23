import Vue from "vue";
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        token: '',
        userId: '',
        userRole: '',
    },
    mutations: {
        setToken(state, newToken) {
            state.token = newToken
        },
        setUserId(state, newUserId) {
            state.userId = newUserId
        },
        setUserRole(state, newUserRole) {
            state.userRole = newUserRole
        }
    },
    actions: {
        setToken(context, newToken) {
            context.commit('setToken', newToken);
        },
        setUserId(context, newUserId) {
            context.commit('setUserId', newUserId);
        },
        setUserRole(context, newUserRole) {
            context.commit('setUserRole', newUserRole);
        }
    },
    getters: {
        getToken(state) {
            return state.token;
        },
        getUserId(state) {
            return state.userId;
        },
        getUserRole(state) {
            return state.userRole;
        }
    }
});