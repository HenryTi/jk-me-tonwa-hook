import { Page } from "tonwa-com";
import { Visible } from "tonwa-uq-com";

export function ActsPage() {
    return <Page header="Home">
        <div className="p-3">
            <div>shopmanager可见下面<span className="text-danger">红框</span></div>
            <Visible role="shopmanager">
                <div className="border border-danger p-3 my-3">Shopmanager</div>
            </Visible>
        </div>
    </Page>;
}
