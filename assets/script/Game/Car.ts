
import { _decorator, Component, Node, Vec3 } from 'cc';
import { RoadPoint, ROAD_MOVE_TYPE, ROAD_POINT_TYPE } from './RoadPoint';
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

const tempVec = new Vec3()

@ccclass('Car')
export class Car extends Component {

    @property
    maxSpeed = 0.2

    private _currRoadPoint: RoadPoint = null
    private _pointA = new Vec3();
    private _pointB = new Vec3();
    private _currSpeed = 0.1;
    private _isMoving = false;
    private _offset = new Vec3();
    private _originRotation = 0;
    private _targetRotation = 0;
    private _centerPoint = new Vec3();
    private _rotaMeasure = 0;
    private _acceleration = 0.2;

    public update(dt: number) {

        if (this._isMoving && this._currRoadPoint) {
            this._currSpeed += this._acceleration * dt;
            if (this._currSpeed > this.maxSpeed) {
                this._currSpeed = this.maxSpeed
            }
            if (this._currSpeed <= -0.001) {
                this._isMoving = false
                return;
            }
            this._offset.set(this.node.worldPosition)
            switch (this._currRoadPoint.moveType) {
                case ROAD_MOVE_TYPE.曲线行走:
                    const offsetRotaion = this._targetRotation - this._originRotation;
                    const currRotation = this.coversion(this.node.eulerAngles.y)
                    let nextStation = (currRotation - this._originRotation) + (this._currSpeed * this._rotaMeasure * (this._targetRotation > this._originRotation ? 1 : -1));
                    if (Math.abs(nextStation) > Math.abs(offsetRotaion)) {
                        nextStation = offsetRotaion
                    }
                    const target = nextStation + this._originRotation;
                    tempVec.set(0, target, 0);
                    this.node.eulerAngles = tempVec;

                    // 绕 Y 轴旋转向量指定弧度
                    const sin = Math.sin(nextStation * Math.PI / 180);
                    const cos = Math.cos(nextStation * Math.PI / 180)
                    const xLength = this._pointA.x - this._centerPoint.x
                    const zLength = this._pointA.z - this._centerPoint.z
                    const xpos = xLength * cos + zLength * sin + this._centerPoint.x;
                    const zpos = -xLength * sin + zLength * cos + this._centerPoint.z
                    this._offset.set(xpos, 0, zpos)
                    break;
                case ROAD_MOVE_TYPE.直线行走:

                    const z = this._pointB.z - this._pointA.z
                    if (z !== 0) {
                        if (z > 0) {
                            this._offset.z += this._currSpeed
                            if (this._offset.z > this._pointB.z) {
                                this._offset.z = this._pointB.z
                            }
                        } else {
                            this._offset.z -= this._currSpeed
                            if (this._offset.z < this._pointB.z) {
                                this._offset.z = this._pointB.z
                            }
                        }
                    } else {
                        const x = this._pointB.x - this._pointA.x
                        if (x > 0) {
                            this._offset.x += this._currSpeed
                            if (this._offset.x > this._pointB.x) {
                                this._offset.x = this._pointB.x
                            }
                        } else {
                            this._offset.x -= this._currSpeed
                            if (this._offset.x < this._pointB.x) {
                                this._offset.x = this._pointB.x
                            }
                        }
                    }
                    break;
                default:
                    break;
            }
            this.node.setWorldPosition(this._offset)
            Vec3.subtract(tempVec, this._pointB, this._offset)

            if (tempVec.length() <= 0.1) {
                this._arriveStation()
            }
        }

    }



    public setEntry(entry: Node) {

        this.node.setWorldPosition(entry.worldPosition);
        this._currRoadPoint = entry.getComponent(RoadPoint);
        if (!this._currRoadPoint) {
            console.warn('There is no RoadPoit in ' + entry.name);
        }

        this._pointA.set(entry.worldPosition)
        this._pointB.set(this._currRoadPoint.next.worldPosition)

        const z = this._pointB.z - this._pointA.z;

        if (z !== 0) {
            if (z < 0) {
                this.node.eulerAngles = new Vec3();
            } else {
                this.node.eulerAngles = new Vec3(0, 180, 0);
            }
        } else {
            const x = this._pointB.x - this._pointA.x
            if (x > 0) {
                this.node.eulerAngles = new Vec3(0, 270, 0);
            } else {
                this.node.eulerAngles = new Vec3(0, 90, 0)
            }
        }
    }
    startRunning() {
        if (this._currRoadPoint) {
            this._isMoving = true;
            this._currSpeed = 0;
            this._acceleration = 0.2;
        }
    }
    stopRunning() {
        this._acceleration = -0.3;
    }

    private _arriveStation() {
        console.log('------到站---------');

        this._pointA.set(this._pointB);
        if (this._currRoadPoint.next) {
            this._currRoadPoint = this._currRoadPoint.next.getComponent(RoadPoint);
            this._pointB.set(this._currRoadPoint.next.worldPosition)
            console.log(this._currRoadPoint.moveType);

            if (this._currRoadPoint.moveType === ROAD_MOVE_TYPE.曲线行走) {
                if (this._currRoadPoint.clockwise) {
                    this._originRotation = this.coversion(this.node.eulerAngles.y);
                    this._targetRotation = this._originRotation - 90

                    if ((this._pointB.z < this._pointA.z && this._pointB.x > this._pointA.x) || (this._pointB.z > this._pointA.z && this._pointB.x < this._pointA.x)) {
                        this._centerPoint.set(this._pointB.x, 0, this._pointA.z)
                    } else {
                        this._centerPoint.set(this._pointA.x, 0, this._pointB.z)
                    }
                } else {
                    this._originRotation = this.coversion(this.node.eulerAngles.y);
                    this._targetRotation = this._originRotation + 90

                    if ((this._pointB.z < this._pointA.z && this._pointB.x < this._pointA.x) || (this._pointB.z > this._pointA.z && this._pointB.x > this._pointA.x)) {
                        this._centerPoint.set(this._pointB.x, 0, this._pointA.z)
                    } else {
                        this._centerPoint.set(this._pointA.x, 0, this._pointB.z)
                    }
                }
                Vec3.subtract(tempVec, this._pointA, this._centerPoint);
                const r = tempVec.length();
                this._rotaMeasure = 90 / (Math.PI * r / 2); // 弧度
            }
        } else {
            this._isMoving = false
            this._currRoadPoint = null
        }



    }

    coversion(value: number) {
        let a = value
        if (a <= 0) {
            a += 360;
        }
        return a
    }
}
