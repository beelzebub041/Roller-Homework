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

        // 引用 分數Label
        scoreLabel: {
            default: null,
            type: cc.Label
        },

        // 引用 Spin Button Node
        spinButtonNode: {
            default: null,
            type: cc.Node
        },

        // 引用 Wheel Node
        // WheelNode: {
        //     default: null,
        //     type: cc.Node
        // },

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.score = 0;
        
        this.onUpdateScore();

        this.spinButtonNode.on('mousedown', this.onSpin, this);
    },

    onDestroy () {
        this.spinButtonNode.off('mousedown', this.onSpin, this);
    },



    start () {

    },

    // update (dt) {},

    onSpin: function () {

        console.log('onSpain');

        this.score += 100;

        this.onUpdateScore();
    },

    onUpdateScore: function()
    {
        this.scoreLabel.string = this.score.toString();
    }


});
