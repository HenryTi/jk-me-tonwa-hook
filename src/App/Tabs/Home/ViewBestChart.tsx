import { usePageStore } from "tonwa-uq-com";
import { useSnapshot } from "valtio";
import { Axis, Chart, Interval, Tooltip } from "bizcharts";
import { StoreMyPeriodSum } from "./StoreMyPeriodSum";
import { FA, LMR, Page, useNav } from "tonwa-com";
import { useEffect, useState } from "react";

export function ViewBestChart() {
    const [tick, setTick] = useState(null);
    const nav = useNav();
    const store = usePageStore<StoreMyPeriodSum>();
    const { topCouponFeeRadio } = useSnapshot(store.couponState);
    useEffect(() => {
        // 第一遍显示不出来。只好做了一个等待，10ms之后就可以显示了。
        setTimeout(() => setTick(1), 10);
    });
    if (topCouponFeeRadio === null) {
        return <div>
            ... 等待数据
        </div>;
    }
    function xString(x: any) {
        return { content: `${x.toFixed(2)}%` };
    }
    function formatter(val: any) {
        return `${val}%`;
    }
    function onShowTips() {
        nav.open(<PageTips />);
    }
    return <div className="bg-light p-3">
        <LMR>
            <div className="small">排行榜 {tick}</div>
            <div className="cursor-pointer text-primary small" onClick={onShowTips}>
                <FA name="angle-double-right" className="me-1" />
                发券增加提成
            </div>
        </LMR>
        <Chart data={topCouponFeeRadio} autoFit height={120} padding={[20, 0, 20, 25]}>
            <Interval position="employeeName*radio" label={["radio", xString]}></Interval>
            <Axis name="radio" label={{ formatter }} />
            <Tooltip visible={false}></Tooltip>
        </Chart>
    </div>;
}

function PageTips() {
    return <Page header="发券增加提成" contentClassName="bg-light">
        <div className="bg-light">
            <div className="bg-white rounded-3 p-3 m-3">
                <p>
                    在销售助手中（我的-积分券）生成积分券发送给客户，客户使用了积分券下单的，则可获取额外的发券提成。
                    详细步骤请参看销售助手中的说明。
                </p>
                <a href="https://assist.jkchemical.com" target="_blank" rel="noreferrer">访问销售助手网页版</a><br />
                <a href="https://shop.jkchemical.com/download/jk-assist.apk" rel="noreferrer">下载安卓版手机app</a>
            </div>
        </div>
    </Page>;
}