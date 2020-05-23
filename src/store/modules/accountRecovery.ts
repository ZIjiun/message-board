import { Module, ActionTree, MutationTree } from 'vuex';
import axios from 'axios';
import { RootState } from '../types';

const namespaced: boolean = true;

interface accountRecoveryState {
    msg: string;
}

const state: accountRecoveryState = {
    msg: '',
};

const actions: ActionTree<accountRecoveryState, RootState> = {
    confirmEmail({ commit }, email): any {
        axios.post('http://localhost:4000/accountRecovery', { email })
            .then((res) => {
                commit('confirmEmail', res.data.data.msg);
            })
            .catch((error) => {
                commit('confirmEmail', '伺服器連接失敗');
            });
    },
};

const mutations: MutationTree<accountRecoveryState> = {
    confirmEmail(confirmEmailState, msg: string) {
        state.msg = msg;
    },
};

const accountRecoveryStore: Module<accountRecoveryState, RootState> = {
    namespaced,
    state,
    actions,
    mutations,
};

export default accountRecoveryStore;
