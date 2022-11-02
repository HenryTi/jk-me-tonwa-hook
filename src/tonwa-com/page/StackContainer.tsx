import React, { Suspense, useContext, useMemo } from "react";
import { useSnapshot } from "valtio";
import { PageStackContext, StackItem, useAppNav } from "./nav";
import { ScrollContext } from "./useScroll";

export function StackContainer({ active, stackItems }: { active?: string; stackItems: readonly StackItem[] }) {
    let last = stackItems.length - 1;
    return <>
        {
            stackItems.map((item, index) => {
                let { key: name, page } = item;
                let display: boolean;
                if (active) {
                    display = active === name;
                }
                else {
                    display = index === last;
                }
                return <Stack key={name} display={display}>{page}</Stack>;
            })
        }
    </>;
}

function Stack({ display, children }: { display: boolean; children: React.ReactNode; }) {
    const appNav = useAppNav();
    // const { tabNav } = appNav;
    let scrollContext = useContext(ScrollContext);
    let nav = useMemo(() => appNav.createNav(), [appNav]);
    nav.setInitPage(children);
    let { data } = nav;
    let snapshot = useSnapshot(data);
    let { stack: snapshotStack } = snapshot;
    let len = snapshotStack.length;
    let last = len - 1;
    const flexFill = '-page-stack-layer flex-column flex-grow-1 '
    let overflowY: any;
    switch (scrollContext) {
        default: overflowY = 'auto'; break;
        case 'app-tabs': overflowY = 'auto'; break;
        case 'page-tabs': overflowY = 'scroll'; break;
    }
    return <PageStackContext.Provider value={nav}>
        {snapshotStack.map((v, index) => {
            let { key: pageKey, page } = v;
            return <div key={pageKey}
                className={flexFill + (display === true && index === last ? 'd-flex' : 'd-none')}
                style={{ overflowY }}
            >
                <Suspense>
                    {page}
                </Suspense>
            </div>
        })}
    </PageStackContext.Provider>;
}
