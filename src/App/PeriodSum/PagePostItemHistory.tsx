import { List, LMR, VDate, Page, dateFromMinuteId } from "tonwa-com";
import { usePageStore } from 'tonwa-uq-com';
import { ReturnGetObjectItemHistoryRet } from "uqs/JkMe";
import { renderNum } from 'App/tool';
import { StorePeriodSum } from './StorePeriodSum';

export function PagePostItemHistory() {
    const store = usePageStore<StorePeriodSum>();
    const { uqApp, itemPeriodSum, periodHistoryLastYear, state } = store;
    const { itemTitles, timezone } = uqApp;
    const { item } = itemPeriodSum;

    function header() {
        let { itemTitles, postTitles } = uqApp;
        let { post, item } = itemPeriodSum;
        if (post === 0) return itemTitles[item].title;
        return `${postTitles[post].title} - ${itemTitles[item].title}`;
    }
    let { history } = state;
    return <Page header={header()}>
        <div className="">
            <List items={history}
                ItemView={ItemView}
                onItemClick={onClickItem} />
        </div>
    </Page>;

    function ItemView({ value: history }: { value: ReturnGetObjectItemHistoryRet }) {
        let { id, value, bizMainNo, bizOp, memo } = history;
        let { unit, fixed } = itemTitles[item];
        let d = dateFromMinuteId(id, timezone);
        return <LMR className="px-3 py-2 align-items-center">
            <div className="text-muted small w-min-4c me-2">
                <VDate date={d} hideSameYear={true} />
            </div>
            <small>
                {bizOp}{memo ? ': ' + memo : ''}
                {bizMainNo}
            </small>
            <div className="ms-2">{renderNum(value, unit, fixed, false)}</div>
        </LMR>;
    }

    function onClickItem(item: ReturnGetObjectItemHistoryRet) {
        store.showBizOpDetail(item);
    }
}
