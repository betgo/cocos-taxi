
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = CustomLisenter
 * DateTime = Fri Jan 28 2022 23:38:20 GMT+0800 (中国标准时间)
 * Author = betago
 * FileBasename = customLisenter.ts
 * FileBasenameNoExtension = customLisenter
 * URL = db://assets/script/data/customLisenter.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/zh/
 *
 */

interface IEventData {
    func: Function;
    target: any;
}

interface IEvent {
    [eventName: string]: IEventData[]
}


@ccclass('CustomLisenter')
export class CustomLisenter extends Component {

    public static handle: IEvent = {}

    public static on(eventName: string, cb: Function, tartget?: any) {
        if (!this.handle[eventName]) {
            this.handle[eventName] = []
        }
        const data: IEventData = { func: cb, target: tartget }
        this.handle[eventName].push(data)
    }

    public static off(eventName: string, cb: Function, tartget?: any) {
        const list = this.handle[eventName]
        if (list && list.length > 0) {
            for (let i = 0; i < list.length; i++) {
                const data = list[i];
                if (data.func === cb && tartget === tartget) {
                    list.splice(i, 1)
                    break;
                }
            }
        }
    }

    public static dispatchEvent(eventName: string, ...rest: any) {
        const list = this.handle[eventName]
        if (list) {
            for (let i = 0; i < list.length; i++) {
                const data = list[i];
                data.func.apply(data.target, rest)

            }
        }
    }
}
