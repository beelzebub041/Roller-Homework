// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

// const socket = require('socket');

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

        // 引用 Spin Button Node
        spinButtonNode: {
            default: null,
            type: cc.Node,
        },

        // 引用 Roller Node
        rollerNode: {
            default: null,
            type: cc.Node,
        },

        // 引用 分數Node
        scoreNode: {
            default: null,
            type: cc.Node,
        },

        // 引用 點數Label
        creditLabel: {
            default: null,
            type: cc.Label,
        },

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.spinButtonNode.on('mousedown', this.onSpin, this);

        this.node = cc.director.getScene().getChildByName('command');
        this.s = this.node.getComponent('Command').getSocket();
        this.crd = this.node.getComponent('Command').getPlayerInfo();

        this.updateCredit();

        // this.s.startConnect(() => {
        // 機率初始
        const probInit = JSON.stringify({
            action: 'Init',
            rowCount: 3,
            colCount: 5,
            symbolCount: 5,
        });

        // 機率封包
        const probPacket = JSON.stringify({
            type: 'prob',
            data: probInit,
        });

        this.s.sendMessage(probPacket, (str) => {
            this.setFaceInfo(str);

            this.rollerNode.getComponent('Roller').createFace();
        });
        // });
    },

    onDestroy() {
        this.spinButtonNode.off('mousedown', this.onSpin, this);
    },

    start() {

    },

    update(dt) {
        const isStop = this.rollerNode.getComponent('Roller').isAllStop();

        if (this.spinFlag && isStop) {
            this.spinFlag = false;

            // 更新分數
            this.updateScore(this.totalWinScore);

            // 更新點數
            this.crd += this.totalWinScore;
            this.updateCredit();

            // 儲存點數
            const savePoint = JSON.stringify({
                action: 'SavePoint',
                account: this.node.getComponent('Command').getPlayerName(),
                point: this.creditLabel.string,
            });

            // 平台封包
            const platformPacket = JSON.stringify({
                type: 'platform',
                data: savePoint,
            });

            this.s.sendMessage(platformPacket, () => {});
        }
    },

    onSpin() {
        console.log('onSpain');

        this.crd -= 100;

        this.updateCredit();

        // 更新分數
        this.updateScore(0);

        // 儲存點數
        const savePoint = JSON.stringify({
            action: 'SavePoint',
            account: this.node.getComponent('Command').getPlayerName(),
            point: this.creditLabel.string,
        });

        // 平台封包
        const platformPacket = JSON.stringify({
            type: 'platform',
            data: savePoint,
        });

        this.s.sendMessage(platformPacket, (str) => {
            // 機率初始
            const probSpin = JSON.stringify({
                action: 'Spin',
            });

            // 機率封包
            const probPacket = JSON.stringify({
                type: 'prob',
                data: probSpin,
            });

            this.s.sendMessage(probPacket, (pack) => {
                console.log(`onSpin, pack: ${pack}`);

                const jsonRevMsg = JSON.parse(pack);

                this.setFaceInfo(String(jsonRevMsg.Wheel));

                this.rollerNode.getComponent('Roller').executeRoller();

                this.spinFlag = true;

                const jsonWinMsg = jsonRevMsg.win;

                this.totalWinScore = 0;

                if (jsonWinMsg.length > 0) {
                    for (let index = 0; index < jsonWinMsg.length; index++) {
                        this.totalWinScore += jsonWinMsg[index].WinScore;
                    }
                }
            });
        });
    },

    // 設定盤面資訊
    setFaceInfo(FaceInfo) {
        console.log(`FaceInfo: ${FaceInfo}`);

        const arrFaceInfo = FaceInfo.split(',');

        this.rollerNode.getComponent('Roller').setFaceInfo(arrFaceInfo);
    },

    // 更新 Score
    updateScore(winScore) {
        this.scoreNode.getComponent('Score').addScore(winScore);
    },

    // 更新 Credit
    updateCredit() {
        this.creditLabel.string = this.crd;
    },

});
