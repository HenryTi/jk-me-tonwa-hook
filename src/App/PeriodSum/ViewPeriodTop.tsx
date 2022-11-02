import { FA } from "tonwa-com";
import { usePageStore } from "tonwa-uq-com";
import { useSnapshot } from "valtio";
import { EnumPeriod } from "./period";
import { StorePeriodSum } from "./StorePeriodSum";

const cnColPeriod = "col text-center";
const cnPeriod = " py-2 px-3 ";
const cnTabCur = ' border-2 border-bottom border-primary fw-bold bg-light ';
const cnTab = ' border-bottom border-muted cursor-pointer text-muted ';

export function ViewPeriodTop() {
    const store = usePageStore<StorePeriodSum>();
    const { state } = store;
    const { period } = useSnapshot(state);

    const periodList: [EnumPeriod, string, string][] = [
        [EnumPeriod.day, '日', undefined],
        [EnumPeriod.week, '周', undefined],
        [EnumPeriod.month, '月', undefined],
        [EnumPeriod.year, '年', undefined],
    ];
    let { type } = period;
    for (let p of periodList) {
        let [ep] = p;
        p[2] = cnPeriod + (ep === type ? cnTabCur : cnTab);
    }

    function RenderDate() {
        let { prev, next } = store; // this.controller;
        let { hasNext } = period.derived;
        let left = <div className="cursor-pointer p-3" onClick={prev}><FA name="angle-left" /></div>;
        let right = <div className={' p-3 ' + (hasNext ? ' cursor-pointer ' : ' text-light ')} onClick={next}><FA name="angle-right" /></div>
        return <div className="d-flex justify-content-center">
            {left}
            <div className="text-center px-1 py-3 w-min-10c">{period.render()}</div>
            {right}
        </div>;
    }

    return <>
        <div className="row g-0">
            {
                periodList.map(v => {
                    let [ep, title, cn] = v;
                    return <div key={title} className={cnColPeriod}
                        onClick={() => store.setPeriod(ep)}>
                        <div className={cn}>{title}</div>
                    </div>;
                })
            }
        </div>
        <RenderDate />
    </>;
}
