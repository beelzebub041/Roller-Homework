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

        // 輪盤行
        rollerRow: {
            default: 0,
            type: cc.Integer,
            tooltip: '幾輪',
        },

        // 輪盤列
        rollerColumn: {
            default: 0,
            type: cc.Integer,
            tooltip: '每輪幾格',
        },

        // Symbol數量
        symbolCount: {
            default: 0,
            type: cc.Integer,
            tooltip: 'Symbol數量',
        },

        // 引用 Symbol Prefab
        symbolPrefab: {
            default: null,
            type: cc.Prefab,
        },

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.rollerRow += 2;

        // 輪盤陣列
        this.arrRoller = new Array(this.rollerRow);

        // 盤面資訊
        this.arrFaceInfo = new Array(this.rollerRow);

        for (let RowIdx = 0; RowIdx < this.arrRoller.length; RowIdx++) {
            this.arrRoller[RowIdx] = new Array(this.rollerColumn);
            this.arrFaceInfo[RowIdx] = new Array(this.rollerColumn);
        }

        // 滾動計數
        this.timer = 0;

        // 滾動時間
        this.rollerDuration = 3;

        // 是否開始滾動
        this.startRoller = false;

        this.allstop = true;
    },

    start() {
    },

    update(dt) {
        if (this.startRoller) {
            if (this.timer >= this.rollerDuration) {
                this.startRoller = false;

                this.allstop = true;

                this.timer = 0;

                // 刪除舊盤面
                this.removeFace();

                // 建立新盤面
                this.createFace();

                // 校正Symbol位置
                this.correctedSymbolPosition();

                // 顯示動畫
                for (let RowIdx = 0; RowIdx < this.arrRoller.length; RowIdx++) {
                    for (let ColIdx = 0; ColIdx < this.arrRoller[RowIdx].length; ColIdx++) {
                        this.showAnimate(RowIdx, ColIdx);
                    }
                }
            }
            else {
                this.timer += dt;

                this.executeRoller();
            }
        }
    },

    // 新增Symbol
    createNewSymbol(RowPosition, ColumnPosition, symbolIdx) {
        const newSymbol = cc.instantiate(this.symbolPrefab);

        // 將新建的Symbol加入至Roller節點
        this.node.addChild(newSymbol);

        newSymbol.x = this.node.x - 140 + ColumnPosition * 140;
        newSymbol.y = (this.node.y + this.node.height / 2 + 140 - 60) - 140 * RowPosition;

        // 設定Symbol
        newSymbol.getComponent('Symbol_prefab').setSymbol(symbolIdx);

        newSymbol.getComponent('Symbol_prefab').showSymbol();

        if (RowPosition == 0 || RowPosition == this.rollerRow - 1) {
            newSymbol.getComponent('Symbol_prefab').hideSymbol();
        }

        this.arrRoller[RowPosition][ColumnPosition] = newSymbol;
    },

    // 滾動
    executeRoller() {
        this.startRoller = true;

        this.allstop = false;

        for (let RowIdx = 0; RowIdx < this.rollerRow; RowIdx++) {
            for (let ColIdx = 0; ColIdx < this.rollerColumn; ColIdx++) {
                this.arrRoller[RowIdx][ColIdx].y -= 20;
            }
        }

        const limit = this.node.y - this.node.height / 2 + 40;

        for (let ColIdx = 0; ColIdx < this.rollerColumn; ColIdx++) {
            // 超過邊界
            if (this.arrRoller[this.rollerRow - 2][ColIdx].y <= limit) {
                // 移除最後一個Symbol
                this.arrRoller[this.rollerRow - 1][ColIdx].destroy();

                // 更新Array
                for (let RowIdx = this.rollerRow - 1; RowIdx > 0; RowIdx--) {
                    this.arrRoller[RowIdx][ColIdx] = this.arrRoller[RowIdx - 1][ColIdx];

                    if (RowIdx == this.rollerRow - 1) {
                        this.arrRoller[RowIdx][ColIdx].getComponent('Symbol_prefab').hideSymbol();
                    }
                    else {
                        this.arrRoller[RowIdx][ColIdx].getComponent('Symbol_prefab').showSymbol();
                    }
                }

                // 新增第一個Symbol
                this.createNewSymbol(0, ColIdx, Math.floor(Math.random() * this.symbolCount));

                // 檢查完最後一列
                if (ColIdx + 1 == this.rollerColumn) {
                    // 校正Symbol位置
                    this.correctedSymbolPosition();
                }
            }
        }
    },

    // 刪除盤面
    removeFace() {
        for (let RowIdx = 0; RowIdx < this.rollerRow; RowIdx++) {
            for (let ColIdx = 0; ColIdx < this.rollerColumn; ColIdx++) {
                this.arrRoller[RowIdx][ColIdx].destroy();
            }
        }
    },

    // 設定新的Symbol, 帶入一維陣列, 轉成二維儲存
    setFaceInfo(arrFaceInfo) {
        let FaceIdx = 0;

        for (let RowIdx = 0; RowIdx < this.rollerRow; RowIdx++) {
            for (let ColIdx = 0; ColIdx < this.rollerColumn; ColIdx++) {
                this.arrFaceInfo[RowIdx][ColIdx] = arrFaceInfo[FaceIdx];

                FaceIdx++;
            }
        }
    },

    // 建立盤面
    createFace() {
        for (let RowIdx = 0; RowIdx < this.rollerRow; RowIdx++) {
            for (let ColIdx = 0; ColIdx < this.rollerColumn; ColIdx++) {
                this.createNewSymbol(RowIdx, ColIdx, this.arrFaceInfo[RowIdx][ColIdx]);
            }
        }
    },

    // 校正Symbol位置
    correctedSymbolPosition() {
        for (let RowIdx = 0; RowIdx < this.rollerRow; RowIdx++) {
            for (let ColIdx = 0; ColIdx < this.rollerColumn; ColIdx++) {
                this.arrRoller[RowIdx][ColIdx].y = (this.node.y + this.node.height / 2 + 140 - 60) - 140 * RowIdx;
            }
        }
    },

    // 顯示動畫
    showAnimate(RowIdx, ColIdx) {
        this.arrRoller[RowIdx][ColIdx].getComponent('Symbol_prefab').playAnimate();
    },

    // 是否全停輪
    isAllStop() {
        return this.allstop;
    },

});
