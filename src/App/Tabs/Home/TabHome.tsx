import { Page } from "tonwa-com";
import { usePageStoreInit } from "tonwa-uq-com";
import { StoreMyPeriodSum } from "./StoreMyPeriodSum";
import { VAccounts } from "./VAccounts";
import { ViewBestChart } from "./ViewBestChart";
import { ViewMyPeriodSum } from "./ViewMyPeriodSum";

export function TabHome() {
    usePageStoreInit(() => new StoreMyPeriodSum());
    return <Page header="首页">
        <ViewBestChart />
        <div className="d-flex flex-wrap p-2 justify-content-center">
            <VAccounts object={undefined} />
        </div>
        <ViewMyPeriodSum />
    </Page>;
}
