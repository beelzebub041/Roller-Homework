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

        this.arrSymbol = new Array(5);

        this.arrSymbolIdx = 0;

        this.timer = 0;

        this.rollerDuration = 3;

        this.startRoller = false;
        
        // 建立 Symbol
        for (let index = 0; index < 5; index++) {
            this.createNewSymbol(index);
        }

    },

    start () {

    },

    update (dt) {

        if (this.startRoller) {
        
            if (this.timer > this.rollerDuration) {
                
                this.startRoller = false;

                this.timer = 0;
            }
            else {
                this.timer += dt;

                this.executeRoller()
            }

        }

    },

    // 新增Symbol
    createNewSymbol: function (arrIndex) {

        let newSymbol = cc.instantiate(this.symbolPrefab);
        
        // 將新建的Symbol加入至Roller節點
        this.node.addChild(newSymbol);

        newSymbol.x = this.node.x;
        newSymbol.y = (this.node.y + this.node.height/2 + 140 - 80) - 140 * arrIndex;

        let symbolIdx = Math.floor(Math.random()*5);

        newSymbol.getComponent('Symbol').showSymbol(symbolIdx);
        
        this.arrSymbol[arrIndex] = newSymbol;
    },

    // 滾動
    executeRoller: function () {

        this.startRoller = true;
        
        for (let index = 0; index < this.arrSymbol.length; index++) {
            
            this.arrSymbol[index].y -= 10;

            // 超過邊界
            if (this.arrSymbol[3].y <= this.node.y + this.node.height/2) {
                
                console.log('超過邊界');

                for (let snIdx = 5-1; snIdx > 0; snIdx--) {
                    this.arrSymbol[snIdx] = this.arrSymbol[snIdx-1];
                }

                this.createNewSymbol(0);

                this.timer = 5;

            }
            
        }

    },


});
