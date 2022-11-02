import { FA, List, LMR } from "tonwa-com";
import { usePageStore } from "tonwa-uq-com";
import { Item, ReturnGetItemPeriodSumRet } from "uqs/JkMe";
import { useSnapshot } from "valtio";
import { renderNum } from "App/tool";
import { ItemPeriodSum, ViewPeriodRefresh, ViewPeriodTop } from "../../PeriodSum";
import { StoreSupervise } from "./StoreSupervise";

export function ViewSupervisePeriodSum() {
    const store = usePageStore<StoreSupervise>();
    const { state, uqApp } = store;
    const { list } = useSnapshot(state);
    let { itemTitles } = uqApp;

    function ItemView({ value: row }: { value: any; }) {
        let { item, value } = row;
        let { title, unit, fixed } = itemTitles[item as Item];
        if (!title) return null;
        return <LMR className="py-2 px-3 d-flex align-items-center">
            <div>
                <FA className="text-info me-3" name="lightbulb-o" />
                {title}
            </div>
            <div>
                {
                    value < 0 ?
                        <span className="text-danger">({renderNum(-value, unit, fixed)})</span>
                        :
                        renderNum(value, unit, fixed)
                }
            </div>
        </LMR>;
    }

    async function onClickItem(row: ReturnGetItemPeriodSumRet) {
        let { item, opi, value } = row;
        let ips: ItemPeriodSum = {
            id: opi,
            item,
            object: 0,
            post: 0,
            value,
        }
        await store.showOpiHistory(ips);
    }

    return <div>
        <ViewPeriodTop />
        <List items={list}
            ItemView={ItemView}
            onItemClick={onClickItem} />
        <ViewPeriodRefresh />
    </div>;
}
