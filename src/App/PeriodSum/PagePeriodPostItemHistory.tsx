import { Axis, Chart, Line, Point, Tooltip } from "bizcharts";
import { List, LMR, Page } from "tonwa-com";
import { numToStr, renderNum, weekday } from "App/tool";
import { ReturnGetObjectItemPeriodHistoryRet } from "uqs/JkMe";
import { usePageStore } from "tonwa-uq-com";
import { StorePeriodSum } from "./StorePeriodSum";

interface Props {
    renderDate: (date: Date) => JSX.Element;
    clickItem: (item: ReturnGetObjectItemPeriodHistoryRet) => Promise<void>;
    renderYearOnYear: () => JSX.Element;
}
function PagePeriodPostItemHistory({ renderDate, clickItem, renderYearOnYear }: Props) {
    const store = usePageStore<StorePeriodSum>();
    const { uqApp, itemPeriodSum, periodHistoryLastYear, state } = store;
    const { itemTitles, postTitles } = uqApp;
    const { period, periodHistory } = state;
    let { post, item } = itemPeriodSum;
    let postTitle = postTitles[post];
    let itemTitle = itemTitles[item];

    let header =
        (!postTitle) ?
            itemTitle.title :
            `${postTitle.title} - ${itemTitle.title}`;

    return <Page header={header}>
        <div>
            <div className="">
                <List items={periodHistory}
                    ItemView={ItemView}
                    onItemClick={onClickItem}
                />
            </div>
            {renderYearOnYear()}
        </div>
    </Page>;

    function ItemView({ value: history }: { value: ReturnGetObjectItemPeriodHistoryRet }) {
        let { date, value } = history;
        let { unit, fixed } = itemTitles[item];
        let d = new Date(date);
        return <LMR className="px-3 py-2">
            <div className="text-muted small">{renderDate(d)}</div>
            <div>{renderNum(value, unit, fixed)}</div>
        </LMR>;
    }

    async function onClickItem(item: ReturnGetObjectItemPeriodHistoryRet) {
        await clickItem(item);
    }
}

export function PageDayPostItemHistory() {
    let store = usePageStore<StorePeriodSum>();
    function renderDate(d: Date): JSX.Element {
        let day = d.getDay();
        return <>{d.getMonth() + 1}月{String(100 + d.getDate()).substring(1)}日 星期{weekday.substring(day, day + 1)}</>;
    }

    async function clickItem(item: ReturnGetObjectItemPeriodHistoryRet): Promise<void> {
        let from: Date = item.date;
        let to: Date = new Date(from);
        to.setDate(to.getDate() + 1);
        await store.showPostItemHistory(undefined, from, to);
    }

    function renderYearOnYear(): JSX.Element {
        return <></>;
    }
    return <PagePeriodPostItemHistory
        renderDate={renderDate} clickItem={clickItem} renderYearOnYear={renderYearOnYear}
    />;
}

export function PageMonthPostItemHistory() {
    const store = usePageStore<StorePeriodSum>();
    const { uqApp, itemPeriodSum, periodHistoryLastYear, state } = store;
    const { period, periodHistory } = state;
    const { itemTitles, postTitles } = uqApp;
    let { post, item } = itemPeriodSum;
    let itemTitle = itemTitles[item];

    function renderDate(d: Date): JSX.Element {
        let { unitBizDate } = uqApp;
        let m = d.getMonth();
        if (!unitBizDate) return <>{m + 1}月</>;
        let n = new Date(d);
        n.setMonth(m + 1);
        return <>{m + 1}月{unitBizDate}日 - {n.getMonth() + 1}月{unitBizDate - 1}日</>;
    }

    async function clickItem(item: ReturnGetObjectItemPeriodHistoryRet): Promise<void> {
        let from: Date = item.date;
        let to: Date = new Date(from);
        to.setMonth(to.getMonth() + 1);
        await store.showDayPostItemHistory(undefined, from, to);
    }

    function renderYearOnYear(): JSX.Element {
        let unionAccumulated = [];
        if (periodHistoryLastYear.length > 0) {
            let periodAccumulated = periodHistory.map(e => e).reverse().map((e: ReturnGetObjectItemPeriodHistoryRet, index, arr) => {
                let ae = {} as any;
                ae.date = period.getGrainSize(e.date);
                ae.value = arr.reduce((p, c, i) => { return p + (i <= index ? c.value : 0) }, 0);
                ae.type = period.caption;
                return ae;
            });
            let { lastYearSamePeriod } = period;
            let periodAccumulatedLastYear = periodHistoryLastYear.map(e => e).reverse().map((e: ReturnGetObjectItemPeriodHistoryRet, index, arr) => {
                let ae = {} as any;
                ae.date = period.getGrainSize(e.date);
                ae.value = arr.reduce((p, c, i) => { return p + (i <= index ? c.value : 0) }, 0);
                ae.type = lastYearSamePeriod.caption;
                return ae;
            });
            periodAccumulated.forEach((e, i, arr) => {
                let ly = periodAccumulatedLastYear.find(el => el.date === e.date)
                if (ly && ly.value) {
                    e.radio = (e.value / ly.value) - 1;
                } else if (i > 0) {
                    e.radio = arr[i - 1].radio;
                }
            });
            unionAccumulated = periodAccumulatedLastYear.concat(periodAccumulated);
            unionAccumulated.sort((a, b) => a.date > b.date ? 1 : -1);
        }

        let yearOnYear = <></>;
        if (unionAccumulated.length > 0) {
            yearOnYear = <div className="m-1 p-2 border border-success border-">
                <div className="text-center small bm-3">累计{itemTitle.title}同比</div>
                <Chart data={unionAccumulated} height={300} autoFit padding={[20, 60, 50, 60]} scale={{
                    radio: { alias: '增长率' }
                }}>
                    <Line position="date*value" color="type" tooltip={["date*value*type", (date, value, type) => {
                        return {
                            title: date,
                            name: type,
                            value: numToStr(parseFloat(value))
                        }
                    }]} />
                    <Point position="date*value" color="type" />
                    <Axis name="value" label={{ formatter: x => numToStr(parseInt(x)) }} />
                    <Line position="date*radio" color={['type', "#aa00cc"]} tooltip={["date*radio*type", (date, radio, type) => {
                        return {
                            title: date,
                            name: type,
                            value: `${(radio * 100).toFixed(2)}%`
                        }
                    }]} />
                    <Point position="date*radio" size={3} />
                    <Axis name="radio" position="right" title={true} label={{ formatter: x => { let r = parseFloat(x); return `${r * 100}%` } }} />
                </Chart>
            </div>
        }
        return yearOnYear;
    }
    return <PagePeriodPostItemHistory
        renderDate={renderDate} clickItem={clickItem} renderYearOnYear={renderYearOnYear}
    />;
}
