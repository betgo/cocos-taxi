
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = GameMap
 * DateTime = Fri Jan 28 2022 23:36:48 GMT+0800 (中国标准时间)
 * Author = betago
 * FileBasename = GameMap.ts
 * FileBasenameNoExtension = GameMap
 * URL = db://assets/script/Game/GameMap.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/zh/
 *
 */

@ccclass('GameMap')
export class GameMap extends Component {

    @property([Node])
    path: Node[] = []


    start() {
        // [3]
    }

    // update (deltaTime: number) {
    //     // [4]
    // }
}
