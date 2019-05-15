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

        symbol_A_Node: {
            default: null,
            type: cc.Node
        },

        symbol_K_Node: {
            default: null,
            type: cc.Node
        },

        symbol_Q_Node: {
            default: null,
            type: cc.Node
        },

        symbol_J_Node: {
            default: null,
            type: cc.Node
        },

        symbol_S3_Node: {
            default: null,
            type: cc.Node
        },



    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        
        this.arrSymbol = new Array(5);
        this.arrSymbol[0] = this.symbol_A_Node;
        this.arrSymbol[1] = this.symbol_K_Node;
        this.arrSymbol[2] = this.symbol_Q_Node;
        this.arrSymbol[3] = this.symbol_J_Node;
        this.arrSymbol[4] = this.symbol_S3_Node;

        this.arrAnimateName = new Array(5);
        this.arrAnimateName[0] = 'sn_a_ani';
        this.arrAnimateName[1] = 'sn_k_ani';
        this.arrAnimateName[2] = 'sn_q_ani';
        this.arrAnimateName[3] = 'sn_j_ani';
        this.arrAnimateName[4] = 'sn_s3_ani';

        for (let index = 0; index < this.arrSymbol.length; index++) {
            this.arrSymbol[index].opacity = 0;
        }

        this.useSymbol = -1;

    },

    start () {

    },

    // update (dt) {},

    // 設定Symbol
    setSymbol: function (symbolIdx) {

        if (-1 < symbolIdx && symbolIdx < 5) {
            this.useSymbol = symbolIdx;
        }
        else {
            console.log('Symbol::setSymbol, Error symbolIdx!!')
        }

    },

    // 顯示Symbol
    showSymbol: function () {

        if (-1 < this.useSymbol && this.useSymbol < 5) {
            this.arrSymbol[this.useSymbol].opacity = 255;
        }
        else {
            console.log('Symbol::showSymbol, Error symbolIdx!!')
        }

    },

    // 影藏Symbol
    hideSymbol: function () {

        if (-1 < this.useSymbol && this.useSymbol < 5) {
            this.arrSymbol[this.useSymbol].opacity = 0;
        }
        else {
            console.log('Symbol::hideSymbol, Error symbolIdx!!')
        }

    },

    // 播放動畫
    playAnimate: function () {
           
        this.ani = this.arrSymbol[this.useSymbol].getComponent(cc.Animation);

        this.ani.play(this.arrAnimateName[this.useSymbol]);

    },


});
