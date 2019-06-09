// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html


const socket = cc.Class({

    ws: null,
    startConnect(callBackFun) {
        this.ws = new WebSocket('ws://127.0.0.1:8080/', 'echo-protocol');
        // 发起连接
        this.ws.onopen = function (event) {
            console.log('Server Connection Success');

            callBackFun();
        };

        this.ws.onerror = function (event) {
            console.log('ws test 002 Send Text fired an error');
        };

        this.ws.onclose = function (event) {
            console.log('ws test 003 WebSocket instance closed.');
        };
    },

    sendMessage(strMsg, callbackFun) {
        this.ws.send(String(strMsg));

        this.ws.onmessage = function (event) {
            console.log(`ws test 001 response text msg: ${event.data}`);

            return callbackFun(event.data);
        };
    },

});

module.exports = socket;
