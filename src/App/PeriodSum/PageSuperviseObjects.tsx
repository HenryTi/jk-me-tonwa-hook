import { List, LMR, Page } from "tonwa-com";
import { renderNum, ViewEmployee } from "App/tool";
import { Item, ReturnGetSuperviseObjectsRet } from "uqs/JkMe";
import { StorePeriodSum } from "./StorePeriodSum";
import { usePageStore } from "tonwa-uq-com";

export function PageSuperviseObjects() {
    const store = usePageStore<StorePeriodSum>();
    const { uqApp, itemPeriodSum, periodHistoryLastYear, superviseObjects, state } = store;
    const { itemTitles, postTitles, timezone, uqs } = uqApp;
    const { item } = itemPeriodSum;
    let {/*title, vice, */unit, fixed } = itemTitles[item as Item];

    function header(): string | boolean | JSX.Element {
        let { post, item } = itemPeriodSum;
        if (post === 0) return itemTitles[item].title;
        return `${postTitles[post].title} - ${itemTitles[item].title}`;
    }

    return <Page header={header()}>
        <div className="py-0">
            <List items={superviseObjects}
                ItemView={ItemView}
                onItemClick={onClickItem} />
        </div>
    </Page>;

    function ItemView({ value: row }: { value: ReturnGetSuperviseObjectsRet }) {
        let { opi, item, post, object, staff, value, ratioValue } = row;
        return <div className="px-3 py-2 d-block">
            <LMR>
                <div>
                    <span className="text-muted small">来自: </span>
                    {/*uqs.JkHr.Employee.tv(staff, renderEmployee)*/}
                    <ViewEmployee id={staff} />
                    <span>职员: {staff}</span>
                </div>
                <div>{renderNum(ratioValue, unit, fixed)}</div>
            </LMR>
        </div>;
    }

    function onClickItem(row: ReturnGetSuperviseObjectsRet) {
        alert(JSON.stringify(row));
    }
}
