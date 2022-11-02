import { List, LMR, Page } from "tonwa-com";
import { renderNum } from "App/tool";
import { ReturnGetItemSumDaysRet } from "uqs/JkMe";
import { StoreSupervise } from "./StoreSupervise";
import { usePageStore } from "tonwa-uq-com";

export function ViewItemDayHistory() {
    const storeSupervise = usePageStore<StoreSupervise>();
    let { uqApp, item } = storeSupervise;
    let { itemTitles } = uqApp;
    let { unit, fixed } = itemTitles[item];

    function ItemView({ value: row }: { value: ReturnGetItemSumDaysRet; }) {
        let { date, value } = row;
        return <LMR className="px-3 py-2">
            <div>{new Date(date).toLocaleDateString()}</div>
            <div>{renderNum(value, unit, fixed)}</div>
        </LMR>
    }

    async function onClickDayItem(row: ReturnGetItemSumDaysRet) {
        let { date } = row;
        let from = new Date(date);
        let to = new Date(from);
        to.setDate(to.getDate() + 1);
        await storeSupervise.showItemHistory(from, to);
    }

    return <List items={storeSupervise.itemSumDays}
        ItemView={ItemView}
        onItemClick={onClickDayItem} />;
}

export function VItemDayHistory() {
    const storeSupervise = usePageStore<StoreSupervise>();
    let { uqApp, item } = storeSupervise;
    let { itemTitles } = uqApp;
    function header() {
        let { title } = itemTitles[item];
        return title;
    }

    return <Page header={header()}>
        <div className="">
            <ViewItemDayHistory />
        </div>
    </Page>;
}
