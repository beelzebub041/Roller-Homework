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

        symbolPrefab :{
            default: null,
            type: cc.Prefab
        },


    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

        this.arrSymbol = new Array(3);

        this.arrSymbolIdx = 0;
        
        // 建立 Symbol
        for (let index = 0; index < 3; index++) {
            this.CreateNewSymbol();
        }

    },

    start () {

    },

    // update (dt) {},

    // 新增Symbol
    CreateNewSymbol: function () {

        console.log('Roller::CreateNewSymbol');
        
        let newSymbol = cc.instantiate(this.symbolPrefab);
        
        // 將新建的Symbol加入至Roller節點
        this.node.addChild(newSymbol);

        console.log('Roller::CreateNewSymbol::Width='+this.node.width);

        let posX = this.node.x;
        let posY = (this.node.y + this.node.height/2 - 80) - 140 * this.arrSymbolIdx;

        newSymbol.setPosition(cc.v2(posX,posY));

        newSymbol.getComponent('Symbol').showSymbol(4);
        
        this.arrSymbol[this.arrSymbolIdx] = newSymbol;

        this.arrSymbolIdx++;
    },

    // 滾動
    StartRoller: function () {


    },


});
