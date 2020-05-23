import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import LoginPage from '../components/LoginPage.vue';
import AccountRecovery from '../components/AccountRecovery.vue';
import AccountRegister from '../components/AccountRegister.vue';
import messageBoard from '../components/MessageBoard.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'loginpage',
        component: LoginPage,
    },
    {
        path: '/accountrecovery',
        name: 'accountRecovery',
        component: AccountRecovery,
    },
    {
        path: '/accountregister',
        name: 'accountRegister',
        component: AccountRegister,
    },
    {
        path: '/messageBoard',
        name: 'messageBoard',
        component: messageBoard,
    },
    {
        path: '*',
        name: 'loginpage',
        component: LoginPage,
    },
];

const router = new VueRouter({
    routes,
});

export default router;
