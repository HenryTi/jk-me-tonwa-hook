import { Page } from "tonwa-com";
import { useUqApp, Visible } from "tonwa-uq-com";
import { ViewUnit } from "./ViewUnit";

export function PageForUser() {
    let uqApp = useUqApp();
    let { unit, entity } = uqApp.userUnit;
    return <Page header="店铺">
        <div className="m-3">
            <ViewUnit unit={unit} entity={entity} />
            <div>shop.product可见下面<span className="text-danger">红框</span></div>
            <Visible role="shop.product">
                <div className="border border-danger p-3 my-3">Shop.product</div>
            </Visible>
        </div>
    </Page>
}