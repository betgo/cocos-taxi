export class fightConstants {

    public static ROAD_POINT_TYPE = {
        NORMAL: 1,         //普通节点
        START: 2,          //开始节点
        GREETING: 3,       //接客节点
        PLATFORM: 4,       //送客节点（用于接客及送客）
        END: 5,            //结束节点
        AI_START: 6,        //机器人开始节点
    }

    public static ROAD_MOVE_TYPE = {
        LINE: 1,       //直线行走
        BEND: 2,       //曲线行走
    }

    public static CAR_GROUP = {
        NORMAL: 1,
        MAIN_CAR: 2,
        OTHER_CAR: 4
    }

    public static CUSTOMER_TALK_TIME = {
        INTO_THE_CAR: 1,       //上车后
        NEW_ORDER: 2,   //有新订单的时候
    }

    //点击宝箱获得的值
    public static CLICK_BOX_REWARD = 300
}
