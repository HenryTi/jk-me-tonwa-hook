import { List, LMR, Page } from "tonwa-com";
import { renderNum } from "App/tool";
import { ReturnGetItemSumMonthsRet } from "uqs/JkMe";
import { ViewItemDayHistory } from "./VItemDayHistory";
import { StoreSupervise } from "./StoreSupervise";
import { usePageStore } from "tonwa-uq-com";

export function VItemSumHistory() {
    const storeSupervise = usePageStore<StoreSupervise>();
    let { uqApp, item } = storeSupervise;
    let { itemTitles } = uqApp;
    function header() {
        let { title } = itemTitles[item];
        return title;
    }

    function ItemView({ value: row }: { value: ReturnGetItemSumMonthsRet; }) {
        let { unit, fixed } = itemTitles[item];
        let { date, value } = row;
        let d = new Date(date);
        return <LMR className="px-3 py-2">
            <div>{d.getFullYear()}年{(d.getMonth() + 1)}月</div>
            <div>{renderNum(value, unit, fixed)} {unit}</div>
        </LMR>
    }

    async function onClickMonthItem(row: ReturnGetItemSumMonthsRet) {
        let { date } = row;
        let from = new Date(date.getFullYear(), date.getMonth(), 1);
        let to = new Date(from);
        to.setMonth(to.getMonth() + 1);
        await storeSupervise.showItemDayHistory(undefined, from, to);
    }

    return <Page header={header()}>
        <div className="">
            <div className="px-3 pt-4 pb-2 text-center">按日汇总 <small className="text-muted">(近30日)</small></div>
            <ViewItemDayHistory />
            <div className="px-3 pt-4 pb-2 text-center">按月汇总 <small className="text-muted">(近12月))</small></div>
            <List items={storeSupervise.itemSumMonths}
                ItemView={ItemView}
                onItemClick={onClickMonthItem} />
        </div>
    </Page>
}
