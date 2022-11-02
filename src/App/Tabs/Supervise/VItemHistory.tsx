//import { dateFromMinuteId } from 'tonwa-uq';
import { List, LMR, VDate, Page, dateFromMinuteId } from "tonwa-com";
import { usePageStore } from "tonwa-uq-com";
import { ReturnGetItemHistory$page } from "uqs/JkMe";
import { StoreSupervise } from "./StoreSupervise";

export function VItemHistory() {
    const storeSupervise = usePageStore<StoreSupervise>();
    let { uqApp, item } = storeSupervise;
    let { itemTitles, timezone } = uqApp;
    let { unit, fixed } = itemTitles[item];

    function header() {
        let { title } = itemTitles[item];
        return title + '明细';
    }

    function ItemView({ value: row }: { value: ReturnGetItemHistory$page; }) {
        let { id, bizOp, value, memo } = row;
        let date = dateFromMinuteId(id, timezone);
        return <LMR className="px-3 py-2 align-items-center">
            <div className="small text-muted w-min-6c">
                <VDate date={date} hideSameYear={true} />
            </div>
            <b>{bizOp}</b> {memo}
            <div>{(value ?? 0).toFixed(fixed ?? 2)} <small className="text-muted">{unit}</small></div>
        </LMR>;
    }

    function onClickItem(row: ReturnGetItemHistory$page) {
        alert(JSON.stringify(row));
    }

    return <div className={header()}>
        <List items={storeSupervise.pageItemHistory}
            ItemView={ItemView}
            onItemClick={onClickItem} />
    </div>
}
