import { RoleAdmin } from "App/UnitRole";
import { useState } from "react";
import { FA, List, Page, useNav } from "tonwa-com";
import { UserUnit } from "tonwa-uq";
import { useUqApp } from "tonwa-uq-com";
import { Shop } from "uqs/BzUShop";
// import { PageAdmin } from "./PageAdmin";
import { PageForUser } from "./PageForUser";
import { ShopAddLink } from "./ShopAdd";
import { ViewUnit } from "./ViewUnit";

export function PageShops() {
    let nav = useNav();
    let uqApp = useUqApp();
    let [refreshFlag, setRefreshFlag] = useState(false);

    function triggerRefreshFlag() {
        setRefreshFlag(!refreshFlag);
    }
    function ItemView({ value }: { value: UserUnit<Shop>; }) {
        let { isAdmin, isOwner, unit, entity } = value;
        function onOpenShop() {
            nav.open(<PageForUser />);
        }
        function onClick() {
            uqApp.loginUnit(value);
            let page: JSX.Element;
            let admin: 'admin' | 'owner';
            if (isOwner === true) {
                admin = 'owner';
            }
            else if (isAdmin === true) {
                admin = 'admin';
            }
            else {
                page = <PageForUser />;
            }
            if (admin !== undefined) {
                page = <RoleAdmin
                    admin={admin}
                    triggerRefreshFlag={triggerRefreshFlag}
                    onOpenUnit={onOpenShop}
                    ViewUnit={ViewUnit}
                />;
            }
            function onClose() {
                uqApp.logoutUnit();
                return true;
            }
            nav.open(page, onClose);
        }
        return <div className="d-flex px-3 py-2 cursor-pointer" onClick={onClick}>
            <FA name="book" size="lg" className="mt-1 me-4 text-info" fixWidth={true} />
            <div className="w-100">
                <ViewUnit unit={unit} entity={entity} />
            </div>
        </div>;
    }
    return <Page header="我的店铺">
        <>{refreshFlag}</>
        <ShopAddLink />
        <div className="tonwa-bg-gray-1 h-1c" />
        <div className="border-top border-bottom">
            <List items={uqApp.uqUnit.myUnits} itemKey={(item) => item.unitId} ItemView={ItemView} />
        </div>
    </Page>
}
