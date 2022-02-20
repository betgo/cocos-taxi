
import { _decorator, Component, Node } from 'cc';
import { Car } from './Car';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = CarManager
 * DateTime = Fri Jan 28 2022 23:30:21 GMT+0800 (中国标准时间)
 * Author = betago
 * FileBasename = CarManager.ts
 * FileBasenameNoExtension = CarManager
 * URL = db://assets/script/Game/CarManager.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/zh/
 *
 */

@ccclass('CarManager')
export class CarManager extends Component {

    @property(Car)
    mainCar: Car = null

    public resetCars(points: Node[]) {
        if (points.length < 1) {
            console.error('There is no points in this map')
            return;
        }
        this._createMainCar(points[0])
    }

    private _createMainCar(point: Node) {
        this.mainCar.setEntry(point)
    }

    public controlMoving(isRunning = true) {
        if (isRunning) {
            this.mainCar.startRunning();
        } else {
            this.mainCar.stopRunning();
        }
    }
}
