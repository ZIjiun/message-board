<template lang='pug'>
    .account-recovery
        p.title 請輸入你的電子郵件
        el-input.email-input(
            placeholder="example@xxx.com"
            v-model="email"
        )
        p.message-show {{msg}}
        el-button.confirm(
            plain
            type="primary"
            @click="confirmEmail(email)"
        ) 確定
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State, Action, namespace } from 'vuex-class';
import { mapGetters, mapActions } from 'vuex';

const accountRecoveryStore = namespace('accountRecoveryStore');

@Component
export default class accountRecovery extends Vue {
    @accountRecoveryStore.State(state => state.msg) msg: string;

    @accountRecoveryStore.Action('confirmEmail') confirmEmail: string;

    private email: string = '';
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
    src: local("蘋方體"),
         local("微軟正黑體");
}

@font-face {
    font-family: CustomFont;
    unicode-range: U+0041-005A, U+0061-007A, U+0030-0039;
    src: local(Consolas);
}

.account-recovery {
    margin: 200px auto;
    width: 350px;
    height: 350px;
    border: 1px solid #AAAAAA;
    border-radius: 4px;
    .title {
        display: inline-block;
        font-size: 20px;
        margin-top: 90px;
    }
    .email-input {
        width: 260px;
        margin-top: 30px;
    }
    .message-show {
        font-size: 16px;
        margin-top: 5px;
        height: 25px;
        color: #F56C6C;
        font-weight: 500;
    }
    .confirm {
        margin-left: 190px;
        margin-top: 35px;
        padding: 6px 15px;
        font-size: 16px;
    }
}
</style>
