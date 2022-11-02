import { useUqApp } from "App/MyUqApp";
import { EasyTime, FA } from "tonwa-com";
import { useSnapshot } from "valtio";

export function ViewPeriodRefresh() {
    const uqApp = useUqApp();
    const uqAppState = useSnapshot(uqApp.state);
    return <div className="d-flex py-2 px-3">
        <div className="flex-fill"></div>
        <div className="small text-muted cursor-pointer"
            onClick={uqApp.refresh}>
            <FA name="refresh" />
            <EasyTime date={uqAppState.refreshTime} />
        </div>
    </div>;
}
