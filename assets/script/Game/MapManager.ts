
import { _decorator, Component, Node } from 'cc';
import { GameMap } from './GameMap';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = MapManager
 * DateTime = Fri Jan 28 2022 23:30:10 GMT+0800 (中国标准时间)
 * Author = betago
 * FileBasename = MapManager.ts
 * FileBasenameNoExtension = MapManager
 * URL = db://assets/script/Game/MapManager.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/zh/
 *
 */

@ccclass('MapManager')
export class MapManager extends Component {

    public currPath: Node[] = [];

    public resetMap() {
        const currMap = this.node.children[0].getComponent(GameMap);
        this.currPath = currMap.path
    }

    start() {
        // [3]
    }

    // update (deltaTime: number) {
    //     // [4]
    // }
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
