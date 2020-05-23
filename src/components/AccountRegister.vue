<template lang='pug'>
    .account-register
        .title 建立你的帳戶
        .register-panel
            p.lastname-text 姓氏
            el-input.lastname(
                v-model="account.lastName"
            )
            p.firstname-text 名字
            el-input.firstname(
                v-model="account.firstName"
            )
            p.email-text 電子郵件
            el-input.email(
                v-model="account.email"
            )
            p.password-text 密碼
            el-input.password(
                show-password
                v-model="account.password"
            )
            p.confirm-password-text 確認密碼
            el-input.conform-password(
                show-password
                v-model="account.confirmPassword"
            )
        .footer
            span.message-show {{msg}}
            el-button.submit-button(
                plain
                type="primary"
                @click="createAccount(account)"
            ) 確定
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State, Action, namespace } from 'vuex-class';

const accountRegisterStore = namespace('accountRegisterStore');

interface accountInfo {
    lastName: string,
    firstName: string,
    email: string,
    password: string,
    confirmPassword: string
}

@Component
export default class accountRegister extends Vue {
    @accountRegisterStore.State(state => state.msg) msg: string;

    @accountRegisterStore.Action('createAccount') createAccount: any;

    private account: accountInfo = {
        lastName: '',
        firstName: '',
        email: '',
        password: '',
        confirmPassword: '',
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

.account-register {
    margin: 200px auto;
    width: 480px;
    height: 350px;
    border: 1px solid #aaaaaa;
    border-radius: 4px;
    .title {
        margin-top: 45px;
        font-size: 20px;
    }
    .register-panel {
        margin: 0 auto;
        margin-top: 20px;
        width: 410px;
        height: 170px;
        text-align: left;
        .lastname-text {
            display: inline-block;
        }
        .lastname {
            width: 160px;
            margin-left: 5px;
        }
        .firstname-text {
            display: inline-block;
            margin-left: 8px;
        }
        .firstname {
            width: 160px;
            margin-left: 5px;
        }
        .email-text {
            margin-top: 30px;
            display: inline-block;
        }
        .email {
            width: 332px;
            margin-top: 20px;
            margin: 5px;
        }
        .password-text{
            display: inline-block;
            margin-top: 28px;
        }
        .password {
            margin-left: 5px;
            width: 140px;
            margin-top: 20px;
        }
        .confirm-password-text {
            margin-left: 7px;
            display: inline-block;
        }
        .conform-password {
            width: 144px;
            margin-top: 20px;
            margin-left: 8px;
        }
    }
    .footer {
        width: 405px;
        height: 56px;
        margin-left: 74px;
        .message-show {
            display: inline-block;
            font-size: 16px;
            margin-top: 5px;
            width: 250px;
            height: 25px;
            color: #F56C6C;
            font-weight: 500;
            text-align: left;
        }
        .submit-button {
            margin-top: 20px;
            padding: 6px 15px;
            font-size: 16px;
        }
    }
}
</style>>
