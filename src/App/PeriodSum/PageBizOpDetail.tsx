import { EasyTime, FA, Page, dateFromMinuteId } from "tonwa-com";
import { usePageStore } from "tonwa-uq-com";
import { renderNum } from 'App/tool';
import { StorePeriodSum } from "./StorePeriodSum";

export function PageBizOpDetail() {
    const store = usePageStore<StorePeriodSum>();
    let { uqApp, bizOpDetail, itemPeriodSum } = store;
    let { id, bizOp, memo, value } = bizOpDetail.item;
    let { itemTitles, timezone } = uqApp;
    let { item } = itemPeriodSum;
    let { unit, fixed } = itemTitles[item];
    let d = dateFromMinuteId(id, timezone);
    return <Page header="业务详情">
        <div className="p-3">
            <div>业务编号：{bizOp}</div>
            <div>发生时间：<EasyTime date={d} timeZone={-5} /></div>
            <div>{memo} {renderNum(value, unit, fixed)}</div>
            <div className="my-3">
                <FA className="text-danger me-3" name="smile-o" size="lg" />
                <span className="text-muted">业务详情显示正在开发中</span>
            </div>
        </div>
    </Page>
}
