import { useUqApp } from "App/MyUqApp";
import { FA, List, LMR, Page, useNav } from "tonwa-com";
import { usePageStoreInit } from "tonwa-uq-com";
import {
    EnumRoleOp
    , ReturnGetUserSuperviseItemRet
} from "uqs/JkMe";
import { Item } from "uqs/JkMe";
import { objectLinks } from "./objects";
import { StoreSupervise } from "./StoreSupervise";
import { ViewSupervisePeriodSum } from "./ViewSupervisePeriodSum";

interface VIndexProps {
    icon?: string;
    iconColor?: string;
    caption: string;
    action: () => void;
}

function VIndex({ icon, caption, action, iconColor }: VIndexProps) {
    return <LMR className="px-3 py-2 mb-1 bg-white cursor-pointer align-items-center"
        onClick={action}>
        <FA name={icon ?? 'chevron-circle-right'} className={'me-3 ' + (iconColor ?? ' text-success ')} />
        {caption}
        <FA name="angle-right" />
    </LMR>
}

export function VSupervise() {
    const uqApp = useUqApp();
    const nav = useNav();
    const storeSupervise = usePageStoreInit(() => new StoreSupervise());
    function renderOpTest() {
        const queryList: {
            caption: string;
            item: Item;
            action: (caption: string, item: Item) => void;
        }[] = [
                {
                    caption: '按月商品销售额排序',
                    item: Item.orderAmount,
                    action: storeSupervise.showProductSumByMonth,
                },
                {
                    caption: '按月商品毛利润排序',
                    item: Item.orderProfit,
                    action: storeSupervise.showProductSumByMonth,
                },
                {
                    caption: '按月客户销售额排序',
                    item: Item.orderAmount,
                    action: storeSupervise.showCustomerSumByMonth,
                },
                {
                    caption: '按月客户毛利润排序',
                    item: Item.orderProfit,
                    action: storeSupervise.showCustomerSumByMonth,
                },
            ];
        let { superviseItems } = storeSupervise;
        // {storeSupervise.renderVUnitSum()}
        // return this.cApp.renderVUnitSum();
        return <>
            <div className="mb-4">
                <div className="my-2 mx-1 border border-info rounded">
                    <div className="p-3 border-bottom border-info bg-white rounded-top">
                        <b>公司业务</b>
                    </div>
                    <ViewSupervisePeriodSum />
                </div>
            </div>
            {objectLinks.map((v, index) => {
                const { caption, iconColor, page } = v;
                return <VIndex key={index}
                    action={() => nav.open(page)}
                    caption={caption}
                    iconColor={iconColor ?? 'text-primary'} />;
            })}
            <VIndex action={storeSupervise.showAccounts}
                caption="账户余额列表"
                iconColor="text-primary" />
            <div className="mb-3" />
            {
                queryList.map((v, index) => {
                    let { caption, item, action } = v;
                    return <VIndex key={index} iconColor="text-danger"
                        caption={caption}
                        action={() => action(caption, item)} />;
                    /*
                    return <div key={index} 
                        className="px-3 py-2 mb-1 bg-white cursor-pointer" 
                        onClick={() => action(caption, item)}>
                        {caption}
                    </div>;
                    */
                })
            }
            <div className="mb-3" />
            <List items={superviseItems} none={null}
                ItemView={ItemView}
                onItemClick={onClickSuperviseItem} />
        </>;
    }

    function ItemView({ value: row }: { value: ReturnGetUserSuperviseItemRet; }) {
        let { item } = row;
        let { itemTitles } = uqApp;
        let { title, vice } = itemTitles[item as Item];
        return <div className="px-3 py-2 align-items-center">
            全公司{title} <small className="text-muted ms-3">{vice}</small>
        </div>;
    }

    function onClickSuperviseItem(row: ReturnGetUserSuperviseItemRet) {
        storeSupervise.showItemSumHistory(row.item);
    }

    const opRenders: { [key in EnumRoleOp]: () => JSX.Element } = {
        [EnumRoleOp.test]: renderOpTest,
    }

    // let superviseItems: ReturnGetUserSuperviseItemRet[];

    return <Page header="团队">
        <div className="tonwa-bg-gray-1">
            {
                uqApp.ops.map((v, index) => {
                    let { op } = v;
                    return <div key={index} className="py-2">
                        {opRenders[op]()}
                    </div>;
                })
            }
        </div>
    </Page>;
}
