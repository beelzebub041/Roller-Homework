// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },

        loginButton: {
            default: null,
            type: cc.Node,
        },

        nameLabel: {
            default: null,
            type: cc.Label,
        },

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.loginButton.on('mousedown', this.onLogin, this);
    },

    start() {

    },

    onDestroy() {
        this.loginButton.off('mousedown', this.onLogin, this);
    },

    // update (dt) {},

    onLogin() {
        this.node = cc.director.getScene().getChildByName('command');
        this.s = this.node.getComponent('Command').getSocket();

        const name = this.nameLabel.string;
        console.log(`name: ${name}`);

        // 登入封包
        const login = JSON.stringify({
            action: 'Login',
            account: name,
        });

        // 平台封包
        const platformPacket = JSON.stringify({
            type: 'platform',
            data: login,
        });

        this.s.sendMessage(platformPacket, (str) => {
            console.log(str);
            const data = JSON.parse(str);
            if (data.result === 'true') {
                this.node.getComponent('Command').setPlayerInfo(data.account, data.point);

                cc.director.loadScene('NG');
            }
        });
    },


});
