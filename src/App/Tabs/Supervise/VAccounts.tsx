import { ViewEmployee } from "App/tool";
import { List, LMR, Page } from "tonwa-com";
import { usePageStore } from "tonwa-uq-com";
import { EnumAccount, EnumObjectType, Post, ReturnGetAccountsRet } from "uqs/JkMe";
import { StoreSupervise } from "./StoreSupervise";

export function VAccounts() {
    const storeSupervise = usePageStore<StoreSupervise>();
    const { uqApp } = storeSupervise;
    const { accountTitles, postTitles } = uqApp;

    function ItemView({ value }: { value: ReturnGetAccountsRet }) {
        let { account, balance, objectType, objectTo } = value;
        let { title: accountTitle, unit, fixed } = accountTitles[account as EnumAccount];
        let vObject: JSX.Element;
        switch (Number(objectType) as EnumObjectType) {
            default:
                vObject = <>{objectType} {objectTo}</>;
                break;
            case EnumObjectType.post:
                vObject = <>{postTitles[objectTo as Post]?.title}</>;
                break;
            case EnumObjectType.staff:
                vObject = <ViewEmployee id={objectTo} />;
                break;
        }
        return <LMR className="px-3 py-2">
            {vObject} {accountTitle}
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
