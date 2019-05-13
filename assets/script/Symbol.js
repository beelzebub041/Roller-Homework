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

    },

    start () {

    },

    // update (dt) {},

    // 顯示Symbol
    showSymbol: function (symbolIdx) {

        for (let index = 0; index < this.arrSymbol.length; index++) {
            
            if (symbolIdx != index) {
                this.arrSymbol[index].opacity = 0;
            }
        }

    },


});
