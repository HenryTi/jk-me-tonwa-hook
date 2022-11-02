import { Page, useNav } from "tonwa-com";
import { PageStore, usePageStore, usePageStoreInit } from "tonwa-uq-com";
import { VSupervise } from "./VSupervise";

class BStore extends PageStore {
    b: any = 'b';
}

function PageDialog() {
    let bStore = usePageStoreInit(() => new BStore());
    // usePageStore<BStore>();
    let nav = useNav();
    function onClick() {
        nav.open(<PageDialogNext />);
    }
    return <Page header="Dialog">
        Dialog: {bStore.b}
        <button onClick={onClick}>Click</button>
    </Page>;
}

function PageDialogNext() {
    let bStore = usePageStore<BStore>();
    return <Page header="Dialog">
        PageDialogNext: {bStore.b}
    </Page>;
}

export function TabSupervise() {
    return <VSupervise />;
}
