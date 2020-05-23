<template lang='pug'>
    .message-board
        .message
            .title
                span.title-text 留言標題:
                el-input.title-input(
                    v-model="title"
                )
            .content
                span.content-text 留言內容:
                el-input.content-input(
                    v-model="content"
                    type="textarea"
                    :rows="4"
                )
            el-button.submit-button(
                plain
                type="primary"
                v-if="!messageReplying"
                @click="addMessage"
            ) 新增留言
            el-button.reply-button(
                plain
                type="primary"
                v-else @click="addReplyMessage"
            ) 回覆留言
        .head-title
            span.title 標題
            span.time 時間
            span.content 內容
        .list-items
            .list-border(v-for="(item, index) in items" :key="index")
                .list-item
                    .item-modifying(v-if="item.modifying")
                        el-input.editedTitle(
                            v-model="editedTitle"
                            type="textarea"
                            autosize
                        )
                        span.time {{item.time}}
                        el-input.editedContent(
                            type="textarea"
                            autosize
                            v-model="editedContent"
                        )
                        .list-option
                            el-button.confirm-edit(
                                plain
                                type="success"
                                @click="confirmEdit(index)"
                            ) 確定
                    .item-not-modifying(v-else)
                        span.title {{item.title}}
                        span.time {{item.time}}
                        span.content {{item.content}}
                        .list-option
                            el-button.list-modify(
                                plain
                                type="warning"
                                @click="modifyMessage(index)"
                                :disabled="messageModifying"
                            ) 修改
                            el-button.list-reply(
                                plain
                                plan
                                type="primary"
                                @click="replyMessage(index)"
                                :disabled="messageModifying"
                            ) 回覆
                            el-button.list-delete(
                                plain
                                type="danger"
                                @click="deleteMessage"
                                :disabled="messageModifying"
                            ) 刪除
                            el-dialog(
                                title='提示'
                                :visible.sync='dialogVisible'
                                width='25%'
                            )
                                p.dialog-message 確定要刪除這一則留言嗎?
                                span.dialog-footer(
                                    slot='footer'
                                )
                                    el-button.cancel-dialog(
                                        @click="dialogVisible = false"
                                    ) 取 消
                                    el-button.confirm-dialog(
                                        type='primary'
                                        plain
                                        @click="confirmDialog(index)"
                                    ) 確 定
                    .judge-area
                        el-button.agree(
                            plain
                            type="primary"
                            v-if="!item.isAgree"
                            @click="agreeMessage(index)"
                            :disabled="messageModifying"
                        ) 給他讚 !
                        el-button.disagree(
                            plain
                            type="primary"
                            v-else
                            @click="disagreeMessage(index)"
                            :disabled="messageModifying"
                        ) 收回讚
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State, Action, namespace } from 'vuex-class';
import _ from 'lodash';

const MessageBoardStore = namespace('MessageBoardStore');
const STORAGE_KEY: string = 'messages';

interface itemInfo {
    title: string,
    time: string,
    content: string,
    modifying: boolean,
    isAgree: boolean
}

@Component
export default class accountRegister extends Vue {
    private title: string = '';

    private editedTitle: string = '';

    private time: string = '';

    private content: string = '';

    private editedContent: string = '';

    private modifying: boolean = false;

    private isAgree: boolean = false;

    private messageModifying: boolean = false;

    private messageReplying: boolean = false;

    private items: itemInfo[] = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]');

    private editedItem: itemInfo = {} as itemInfo;

    private index: number = 0;

    private dialogVisible: boolean = false;

    addMessage(): void {
        this.items.push({
            title: this.title,
            time: accountRegister.getCurrentTime(),
            content: this.content,
            modifying: false,
            isAgree: false,
        });
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(this.items));
        this.title = '';
        this.content = '';
    }

    modifyMessage(index: number): void {
        this.items[index].modifying = true;
        this.editedTitle = this.items[index].title;
        this.editedContent = this.items[index].content;
        this.messageModifying = true;
    }

    replyMessage(index: number): void {
        this.messageReplying = true;
        this.title = `Re:${this.items[index].title}`;
        this.content = `${this.items[index].content}(引述內容)`;
        this.index = index;
    }

    deleteMessage(index: number): void {
        this.dialogVisible = true;
    }

    confirmDialog(index: number): void {
        _.pullAt(this.items, index);
        this.items.sort();
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(this.items));
        this.dialogVisible = false;
    }

    confirmEdit(index: number): void {
        this.messageModifying = false;
        this.editedItem = {
            ...this.items[index],
            title: this.editedTitle,
            time: accountRegister.getCurrentTime(),
            content: this.editedContent,
            modifying: false,
        };
        Vue.set(this.items, index, this.editedItem);
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(this.items));
    }

    addReplyMessage(): void {
        this.messageReplying = false;
        this.items.push({
            ...this.items[this.index],
            title: this.title,
            time: accountRegister.getCurrentTime(),
            content: this.content,
        });
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(this.items));
        this.title = '';
        this.content = '';
    }

    agreeMessage(index: number) {
        this.editedItem = {
            ...this.items[index],
            isAgree: true,
        };
        Vue.set(this.items, index, this.editedItem);
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(this.items));
    }

    disagreeMessage(index: number) {
        this.editedItem = {
            ...this.items[index],
            isAgree: false,
        };
        Vue.set(this.items, index, this.editedItem);
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(this.items));
    }

    static getCurrentTime(): string {
        const time: number = _.now();
        const now: Date = new Date();
        now.setTime(time);
        const year: number = now.getFullYear();
        let month: any = now.getMonth() + 1;
        let day: any = now.getDate();
        let hour: any = now.getHours();
        let minute: any = now.getMinutes();
        if (month.toString().length === 1) {
            month = `0${month}`;
        }
        if (day.toString().length === 1) {
            day = `0${day}`;
        }
        if (hour.toString().length === 1) {
            hour = `0${hour}`;
        }
        if (minute.toString().length === 1) {
            minute = `0${minute}`;
        }
        const dateTime: string = `${year}/${month}/${day} ${hour}:${minute}`;
        return dateTime;
    }
}
</script>

<style scoped lang='scss'>
* {
    padding: 0;
    margin: 0;
    font-family: CustomFont;
}

@font-face {
    font-family: CustomFont;
    unicode-range: U+4E00-9FFF;
    src: local("蘋方體"),local("微軟正黑體");
}

@font-face {
    font-family: CustomFont;
    unicode-range: U+0041-005A, U+0061-007A, U+0030-0039;
    src: local(Consolas);
}

.message-board {
    .message {
        width: 815px;
        margin: 60px auto;
        border: 1px solid #AAAAAA;
        border-radius: 4px;
        .title {
            .title-text {
                display: inline-block;
                font-size: 18px;
                width: 100px;
                vertical-align: top;
                margin-top: 20px;
                border: none;
            }
            .title-input {
                width: 300px;
                margin-top: 20px;
                font-size: 16px;
            }
        }
        .content {
            .content-text {
                display: inline-block;
                font-size: 18px;
                width: 100px;
                vertical-align: top;
                margin-top: 20px;
                border: none;
              }
            .content-input {
                width: 300px;
                height: 100px;
                margin-top: 20px;
                font-size: 16px;
                /deep/ .el-textarea__inner {
                    resize: none;
                }
            }
        }
        .submit-button {
            margin-top: 30px;
            margin-left: 302px;
            margin-bottom: 18px;
            padding: 6px 15px;
            font-size: 16px;
        }
        .reply-button {
            margin-top: 30px;
            margin-left: 305px;
            margin-bottom: 18px;
            padding: 6px 15px;
            font-size: 16px;
        }
    }
    .head-title {
        width: 815px;
        height: 35px;
        margin: 0 auto;
        text-align: left;
        font-size: 20px;
        padding-left: 35px;
        .title {
            padding: 6px 15px;
            border-bottom: 1.5px solid #FFBB66;
        }
        .time {
            margin-left: 123px;
            padding: 6px 15px;
            border-bottom: 1.5px solid #FFBB66;
        }
        .content {
            margin-left: 124px;
            padding: 6px 15px;
            border-bottom: 1.5px solid #FFBB66;
        }
    }
    .list-items {
        width: 815px;
        margin: 20px auto;
        .list-border {
            width: 815px;
            border: 1px solid #AAAAAA;
            border-radius: 4px;
            margin-bottom: 20px;
            .list-item {
                display: inline-block;
                width: 795px;
                font-size: 16px;
                margin-top: 5.5px;
                margin-bottom: 5.5px;
                padding: 4px;
                background: #EFF0F1;
                border-radius: 5px;
                text-align: left;
                .item-modifying {
                    .editedTitle {
                        display: inline-block;
                        width: 165px;
                        height: auto;
                        vertical-align: top;
                        font-size: 16px;
                        /deep/ .el-textarea__inner {
                            resize: none;
                        }
                    }
                    .time {
                        display: inline-block;
                        margin-left: 34px;
                        width: 160px;
                        height: auto;
                        vertical-align: top;
                        letter-spacing: 1px;
                    }
                    .editedContent {
                        width: 300px;
                        font-size: 16px;
                        margin-left:34px;
                        vertical-align: top;
                    }
                    .list-option {
                        display: inline-block;
                        width: 80px;
                        height: 130px;
                        margin-left: 11px;
                        font-size: 18px;
                        vertical-align: top;
                        .confirm-edit {
                            margin-left: 10px;
                            padding: 6px 15px;
                            font-size: 16px;
                        }
                    }
                }
                .item-not-modifying {
                    .title {
                        display: inline-block;
                        margin-left: 5px;
                        width: 160px;
                        height: auto;
                        text-align: left;
                        vertical-align: top;
                        letter-spacing: 1px;
                    }
                    .time {
                        display: inline-block;
                        margin-left: 34px;
                        width: 160px;
                        height: auto;
                        text-align: left;
                        vertical-align: top;
                        letter-spacing: 1px;
                    }
                    .content {
                        display: inline-block;
                        width: 300px;
                        height: auto;
                        line-height: 25px;
                        text-align: left;
                        margin-left: 34px;
                        letter-spacing: 1px;
                    }
                    .list-option {
                        display: inline-block;
                        width: 80px;
                        height: 130px;
                        margin-left: 11px;
                        font-size: 18px;
                        vertical-align: top;
                        .list-modify {
                            padding: 6px 15px;
                            font-size: 16px;
                            margin-left: 10px;
                        }
                        .list-reply {
                            margin-top: 10px;
                            padding: 6px 15px;
                            font-size: 16px;
                        }
                        .list-delete {
                            margin-top: 10px;
                            padding: 6px 15px;
                            font-size: 16px;
                        }
                        .dialog-message {
                            font-size: 16px;
                        }
                        .cancel-dialog {
                            padding: 6px 15px;
                            font-size: 14px;
                        }
                        .confirm-dialog {
                            padding: 6px 15px;
                            font-size: 14px;
                        }
                    }
                }
                .judge-area {
                    width: 120px;
                    height: 30px;
                    .agree {
                        padding: 6px 15px;
                        font-size: 16px;
                        width: 92px;
                    }
                    .disagree {
                        padding: 6px 15px;
                        font-size: 16px;
                        width: 92px;
                    }
                }
            }
        }
    }
}
</style>
