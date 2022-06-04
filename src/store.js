import Vue from "vue";
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex);

export default new Vuex.Store({
    plugins: [createPersistedState({
        storage: window.sessionStorage,
    })],
    state: {
        token: '',
        userId: '',
        userRole: '',
        educationalInstitution: '',
    },
    mutations: {
        setToken(state, newToken) {
            state.token = newToken
        },
        setUserId(state, newUserId) {
            state.userId = newUserId
        },
        setUserRole(state, newUserRole) {
            state.userRole = newUserRole;
        },
        setEducationalInstitution(state, newEducationalInstitution) {
            state.educationalInstitution = newEducationalInstitution;
        }
    },
    actions: {
        setToken(context) {
            const token = sessionStorage.getItem('token');
            context.commit('setToken', token);
        },
        setUserId(context) {
            const userId = sessionStorage.getItem('userId');
            context.commit('setUserId', userId);
        },
        setUserRole(context) {
            const userRole = sessionStorage.getItem('userRole');
            context.commit('setUserRole', userRole);
        },
        setEducationalInstitution(context) {
            const eduIns = sessionStorage.getItem('educationalInstitutionId');
            context.commit('setEducationalInstitution', eduIns);
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
        },
        getEducationalInstitution(state) {
            return state.educationalInstitution;
        }
    }
});