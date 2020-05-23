import { Module, ActionTree, MutationTree } from 'vuex';
import axios from 'axios';
import { RootState } from '../types';

const namespaced: boolean = true;

interface accountRegisterState {
    msg: string;
}

const state: accountRegisterState = {
    msg: '',
};

const actions: ActionTree<accountRegisterState, RootState> = {
    createAccount({ commit }, account): any {
        axios.post('http://localhost:4000/accountRegister', account)
            .then((res) => {
                commit('createAccount', res.data.data.msg);
            })
            .catch(() => {
                commit('createAccount', '伺服器連接失敗');
            });
    },
};

const mutations: MutationTree<accountRegisterState> = {
    createAccount(createAccountState, msg: string) {
        state.msg = msg;
    },
};

const accountRegisterStore: Module<accountRegisterState, RootState> = {
    namespaced,
    state,
    actions,
    mutations,
};

export default accountRegisterStore;
