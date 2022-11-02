import { renderNum } from "App/tool";
import { FA, List, LMR } from "tonwa-com";
import { usePageStore } from "tonwa-uq-com";
import { useSnapshot } from "valtio";
import { PostPeriodSum, ItemPeriodSum, ViewPeriodRefresh, ViewPeriodTop } from "../../PeriodSum";
import { StoreMyPeriodSum } from "./StoreMyPeriodSum";

export function ViewMyPeriodSum() {
    const store = usePageStore<StoreMyPeriodSum>();
    const { uqApp, state } = store;
    const { list } = useSnapshot(state);
    function onClickItem(item: any) {
        return;
    }

    function ItemView({ value: postPeriodSum }: { value: PostPeriodSum; }) {
        let { showOpiHistory } = store;
        let { postTitles } = uqApp;
        let { post, itemList } = postPeriodSum;
        let { title, vice } = postTitles[post];
        return <div className="d-block mx-2 my-3 border border-success rounded-3">
            <div className="px-3 py-2">
                <b className="text-primary">{title}</b>
                <small className="text-muted ms-3">{vice}</small>
            </div>
            <div>
                <List items={itemList}
                    ItemView={ItemPeriodSum}
                    onItemClick={showOpiHistory} />
            </div>
        </div>;
    }

    function ItemPeriodSum({ value: ips }: { value: ItemPeriodSum; }) {
        let { itemTitles, postTitles } = uqApp;
        let { item, value } = ips;
        let titles = itemTitles[item];
        if (titles) {
            let { title, vice, fixed, unit } = titles;
            return <div className="d-block pb-2">
                <LMR className="px-3 py-2 w-100">
                    <small><FA className="me-2 text-danger small" name="bookmark-o" /></small> {title}
                    <div>{renderNum(value, unit, fixed)}</div>
                </LMR>
                <div className="px-3 small ms-3 me-4"><small className="text-muted">{vice}</small></div>
            </div>;
        }
        let { post } = ips;
        let posts = postTitles[post];
        if (posts) {
            let { title, vice, fixed } = posts;
            return <LMR className="px-3 py-2 w-100">
                {title} <small className="text-muted ms-3">{vice}</small>
                <div>{renderNum(value, undefined, fixed)}</div>
            </LMR>;
        }
        return <div>unknown item {item} and post {post}</div>;
    }

    return <div className="">
        <ViewPeriodTop />
        <List items={list}
            ItemView={ItemView}
            onItemClick={onClickItem} />
        <ViewPeriodRefresh />
    </div>;
}
