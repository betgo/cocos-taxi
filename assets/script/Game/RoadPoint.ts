
import { _decorator, Component, Node, Enum, Vec3 } from 'cc';
import { fightConstants } from '../constants/fightConstants';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = RoadPoint
 * DateTime = Thu Jan 27 2022 22:24:59 GMT+0800 (中国标准时间)
 * Author = betago
 * FileBasename = RoadPoint.ts
 * FileBasenameNoExtension = RoadPoint
 * URL = db://assets/script/RoadPoint.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/zh/
 *
 */

export enum ROAD_POINT_TYPE {
    '普通节点' = fightConstants.ROAD_POINT_TYPE.NORMAL,         //普通节点
    '开始节点' = fightConstants.ROAD_POINT_TYPE.START,          //开始节点
    '接客节点' = fightConstants.ROAD_POINT_TYPE.GREETING,       //平台节点（用于接客）
    '送客节点' = fightConstants.ROAD_POINT_TYPE.PLATFORM,       //平台节点（用于送客）
    '结束节点' = fightConstants.ROAD_POINT_TYPE.END,            //结束节点
    'AI开始节点' = fightConstants.ROAD_POINT_TYPE.AI_START                //AI开始节点
}

Enum(ROAD_POINT_TYPE)

export enum ROAD_MOVE_TYPE {
    "直线行走" = fightConstants.ROAD_MOVE_TYPE.LINE,       //直线行走
    "曲线行走" = fightConstants.ROAD_MOVE_TYPE.BEND,       //曲线行走
}

Enum(ROAD_MOVE_TYPE)

@ccclass('RoadPoint')
export class RoadPoint extends Component {

    @property({ displayName: '类型', type: ROAD_POINT_TYPE, displayOrder: 1 })
    type: ROAD_POINT_TYPE = ROAD_POINT_TYPE.普通节点;

    @property({ displayName: '下一站', type: Node, displayOrder: 2 })
    next: Node | null = null;

    @property({ displayName: '行走方式', type: ROAD_MOVE_TYPE, displayOrder: 3 })
    moveType: ROAD_MOVE_TYPE = ROAD_MOVE_TYPE.直线行走;

    @property({
        displayName: '顺时针', displayOrder: 4, visible: function (this: RoadPoint) {
            return this.moveType === fightConstants.ROAD_MOVE_TYPE.BEND;
        }
    })
    clockwise: boolean = false;

    @property({
        displayName: '顾客方向', displayOrder: 4, visible: function (this: RoadPoint) {
            return this.type === fightConstants.ROAD_POINT_TYPE.GREETING || this.type === fightConstants.ROAD_POINT_TYPE.PLATFORM;
        }
    })
    direction: Vec3 = new Vec3();

    @property({
        displayName: '延迟生成/秒', displayOrder: 5, visible: function (this: RoadPoint) {
            return this.type === fightConstants.ROAD_POINT_TYPE.AI_START;
        }
    })
    delayTime: number = 1; //默认不延迟

    @property({
        displayName: '生成频率/秒', displayOrder: 5, visible: function (this: RoadPoint) {
            return this.type === fightConstants.ROAD_POINT_TYPE.AI_START;
        }
    })
    genInterval: number = 3;

    @property({
        displayName: '车辆行驶速度', displayOrder: 5, visible: function (this: RoadPoint) {
            return this.type === fightConstants.ROAD_POINT_TYPE.AI_START;
        }
    })
    carSpeed: number = 0.05;

    @property({
        displayName: '产生车辆(,分隔)', displayOrder: 5, visible: function (this: RoadPoint) {
            return this.type === fightConstants.ROAD_POINT_TYPE.AI_START;
        }
    })
    cars: string = '201';
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
