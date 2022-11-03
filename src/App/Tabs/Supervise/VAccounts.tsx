import { ViewEmployee } from "App/tool";
import { List, LMR, Page } from "tonwa-com";
import { usePageStore } from "tonwa-uq-com";
import { EnumAccount, EnumObjectType, Post, ReturnGetAccountsRet } from "uqs/JkMe";
import { StoreSupervise } from "./StoreSupervise";

export function VAccounts() {
    const storeSupervise = usePageStore<StoreSupervise>();
    const { uqApp } = storeSupervise;
    const { accountTitles, postTitles } = uqApp;

    function ItemView({ value: row }: { value: ReturnGetAccountsRet }) {
        let { account, balance, objectType, objectTo } = row;
        let { title: accountTitle, unit, fixed } = accountTitles[account as EnumAccount];
        //let { JkHr } = uqs;
        //let { Employee } = JkHr;
        const renderObject = () => {
            switch (Number(objectType) as EnumObjectType) {
                default: return <>{objectType} {objectTo}</>;
                case EnumObjectType.post:
                    return <>{postTitles[objectTo as Post]?.title}</>;
                case EnumObjectType.staff:
                    return <ViewEmployee id={objectTo} />;
            }
        }
        return <LMR className="px-3 py-2">
            {renderObject()} {accountTitle}
            <div>
                <span>{balance.toFixed(fixed ?? 2)}</span>
                <small className="ms-1 text-muted">{unit}</small>
            </div>
        </LMR>
    }
    return <Page header="账户余额列表">
        <List items={storeSupervise.accounts}
            ItemView={ItemView}
            onItemClick={storeSupervise.showAccountHistory} />
    </Page>;
}
