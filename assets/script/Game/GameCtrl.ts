
import { _decorator, Component, Node, SystemEvent, systemEvent } from 'cc';
import { CarManager } from './CarManager';
import { MapManager } from './MapManager';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = GameCtrl
 * DateTime = Fri Jan 28 2022 23:30:01 GMT+0800 (中国标准时间)
 * Author = betago
 * FileBasename = GameCtrl.ts
 * FileBasenameNoExtension = GameCtrl
 * URL = db://assets/script/Game/GameCtrl.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/zh/
 *
 */

@ccclass('GameCtrl')
export class GameCtrl extends Component {

    @property(MapManager)
    mapManager: MapManager = null

    @property(CarManager)
    carManager: CarManager = null

    onLoad() {
        this.mapManager.resetMap();
        this.carManager.resetCars(this.mapManager.currPath);
    }

    start() {
        this.node.on(Node.EventType.TOUCH_START, this._touchStart, this)
        this.node.on(Node.EventType.TOUCH_END, this._touchEnd, this)
    }
    private _touchStart() {
        this.carManager.controlMoving(true)
    }

    private _touchEnd(touch: Touch, event: SystemEvent.EventType) {
        this.carManager.controlMoving(false)
    }
}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.3/manual/zh/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.3/manual/zh/scripting/ccclass.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.3/manual/zh/scripting/life-cycle-callbacks.html
 */
