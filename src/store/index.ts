import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { RootState } from './types';
import loginPageStore from './modules/loginPage';
import accountRecoveryStore from './modules/accountRecovery';
import accountRegisterStore from './modules/accountRegister';

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
    modules: {
        loginPageStore,
        accountRecoveryStore,
        accountRegisterStore,
    },
};

export default new Vuex.Store<RootState>(store);
