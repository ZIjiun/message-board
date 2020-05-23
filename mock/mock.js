'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
let NODE_PORT = process.env.PORT || 4000;

app.use(bodyParser.json());

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['content-Type', 'Authorization']
}));

app.listen(NODE_PORT, () => {
    console.log('mock 服務在 ' + NODE_PORT + 'port 已經啟用！');
});

app.use('/login', (req, res) => {
    setTimeout(() => {
        let email = req.body.email;
        let password = req.body.password;

        if(email && password === '123' ) {
            res.json({
                data:{
                    msg: 'success'
                }
            })
        }else {
            res.json({
                data:{
                    msg: '帳號或是密碼錯誤'
                }
            })
        }
    }, Math.random() * 500 + 200);
});

app.use('/accountRecovery', (req, res) => {
    setTimeout(() => {
        let emailReg = /[a-zA-Z]+@[a-zA-Z]+\.com/;
        if(emailReg.test(req.body.email)) {
            return (
                res.json({
                    data:{
                        msg: '已將你的密碼寄到信箱中'
                    }
                })
            )
        }else {
            return (
                res.json({
                    data:{
                        msg: '請輸入有效的電子郵件'
                    }
                })
            )
        }
    }, Math.random() * 500 + 200);
});

app.use('/accountRegister', (req, res) => {
    setTimeout(() => {
        let isRequestEmpty = false;
        for(let key in req.body) {
            if(req.body[key] === '') {
                isRequestEmpty = true;
            }
        }
        if(isRequestEmpty) {
            return(
                res.json({
                    data:{
                        msg: '請確實填寫所有欄位'
                    }
                })
            )
        }else {
            return(
                res.json({
                    data:{
                        msg: '帳號已成功建立'
                    }
                })
            )
        }
    }, Math.random() * 500 + 200);
});