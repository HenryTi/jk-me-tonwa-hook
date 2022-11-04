import { LMR, List, Page } from "tonwa-com";
import { Item, Post } from "uqs/JkMe";
import { ModelLink } from "../ModelLink";
import { cnAmount } from "App/tool";
import { useQuery } from "react-query";
import { useUqApp } from "App/MyUqApp";

const caption = '岗位绩效列表';

const modelLink: ModelLink = {
    caption,
    iconColor: undefined,
    page: <PagePosts />,
}

export default modelLink;

function PagePosts() {
    const uqApp = useUqApp();
    const { postTitles, itemTitles } = uqApp;
    const { data: list } = useQuery(['posts'], async () => {
        let ret = await uqApp.uqs.JkMe.GetPosts.query({});
        return ret.ret;
    });

    function ItemView({ value }: { value: any; }): JSX.Element {
        let { post, item, amountThisMonth, amountLastMonth } = value;
        let { title: postTitle } = postTitles[post as Post];
        let { title: itemTitle } = itemTitles[item as Item];
        return <LMR className="px-3 py-2">
            {postTitle} {itemTitle}
            <div className="d-flex align-items-center">
                {vAmount(amountThisMonth, item)}
                {vAmount(amountLastMonth, item)}
            </div>
        </LMR>;
    }

    function vAmount(amount: number, item: Item): JSX.Element {
        let { fixed, unit } = itemTitles[item];
        return <div className={cnAmount}>
            {((amount ?? 0) as number).toFixed(fixed)}
            <small className="text-muted">{unit}</small>
        </div>;
    }

    function onClickRow(v: any) {
        alert(v.id);
    }
    return <Page header={caption}>
        <div className="d-flex px-3 py-3 border-bottom border-primary">
            <div className="flex-fill"></div>
            <div className={cnAmount}>本月</div>
            <div className={cnAmount}>上月</div>
        </div>
        <List items={list}
            ItemView={ItemView}
            onItemClick={onClickRow} />
    </Page>;
}
