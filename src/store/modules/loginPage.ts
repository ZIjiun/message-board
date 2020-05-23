import { Module, ActionTree, MutationTree } from 'vuex';
import axios from 'axios';
import { RootState } from '../types';
import router from '../../router/index';

interface loginPageState {
    msg: string;
}

const state: loginPageState = {
    msg: '',
};

const namespaced: boolean = true;

const actions: ActionTree<loginPageState, RootState> = {
    login({ commit }, account): any {
        // axios.post('http://localhost:4000/login', account)
        //     .then((res) => {
        //         commit('login', res.data.data.msg);
        //         if (state.msg === 'success') {
        //             router.push({ name: 'messageBoard' });
        //             state.msg = '';
        //         }
        //     })
        //     .catch((error) => {
        //         commit('login', '伺服器連接失敗');
        //     });
        router.push({ name: 'messageBoard' });
    },
    accountRecovery({ commit }): void {
        router.push({ name: 'accountRecovery' });
    },
    accountRegister({ commit }): void {
        router.push({ name: 'accountRegister' });
    },
};

const mutations: MutationTree<loginPageState> = {
    login(loginPageState, msg: string) {
        state.msg = msg;
    },
};

const loginPageStore: Module<loginPageState, RootState> = {
    state,
    namespaced,
    actions,
    mutations,
};

export default loginPageStore;
