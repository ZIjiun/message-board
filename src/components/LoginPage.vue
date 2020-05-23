<template lang='pug'>
    .login-page
        .title 請輸入你的信箱與密碼
        .login-panel
            el-input.email-input(
                placeholder="Email"
                v-model="account.email"
            )
            el-input.password-input(
                show-password
                placeholder="Password"
                v-model="account.password"
            )
        p.message-show {{msg}}
        .forget-password
            el-button(
                type="text"
                @click="accountRecovery"
            ) 忘記密碼
        .footer
            .container
                el-button.register(
                    type="text"
                    @click="accountRegister"
                ) 註冊帳號
                el-button.login(
                    plain type="primary"
                    @click="login(account)"
                ) 登入
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State, Action, namespace } from 'vuex-class';
import { mapGetters, mapActions } from 'vuex';

const loginPageStore = namespace('loginPageStore');

interface accountInfo {
    email : string,
    password: string,
}

@Component
export default class LoginPage extends Vue {
    @loginPageStore.State(state => state.msg) msg: string;

    @loginPageStore.Action('login') login: any;

    @loginPageStore.Action('accountRecovery') accountRecovery: any;

    @loginPageStore.Action('accountRegister') accountRegister: any;

    private account: accountInfo = {
        email: '',
        password: '',
    }
}
</script>

<style scoped lang='scss'>
* {
    margin: 0;
    padding: 0;
    font-family: CustomFont;
}

@font-face {
    font-family: CustomFont;
    unicode-range: U+4E00-9FFF;
    src: local("蘋方體"), local("微軟正黑體");
}

@font-face {
    font-family: CustomFont;
    unicode-range: U+0041-005A, U+0061-007A, U+0030-0039;
    src: local(Consolas);
}
.login-page {
    margin: 200px auto;
    width: 350px;
    height: 350px;
    border: 1px solid #aaaaaa;
    border-radius: 4px;
    .title {
        margin-top: 50px;
        font-size: 20px;
    }
    .login-panel {
        margin-top: 20px;
        width: 350px;
        .email-input {
            margin-bottom: 10px;
            width: 210px;
        }
        .password-input {
            width: 210px;
        }
    }
    .message-show {
        font-size: 16px;
        margin-top: 10px;
        height: 25px;
        color: #F56C6C;
        font-weight: 500;
    }
    .forget-password {
        display: inline-block;
        margin-top: 10px;
        width: 212px;
        text-align: left;
        button {
            font-size: 16px;
            margin-left: 2px;
            margin-top: 10px;
        }
    }
    .footer {
        display: inline-block;
        margin: 0 auto;
        width: 212px;
        height: 100px;
        .container {
            display: inline-block;
            margin-top: 20px;
            width: 212px;
            height: 50px;
            text-align: left;
            .register {
                margin-left: 2px;
                font-size: 16px;
            }
            .login {
                margin-left: 70px;
                padding: 6px 15px;
                font-size: 16px;
            }
        }
    }
}
</style>
