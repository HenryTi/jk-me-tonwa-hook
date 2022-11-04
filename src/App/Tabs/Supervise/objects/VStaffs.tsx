import { useUqApp } from "App/MyUqApp";
import { ViewEmployee, cnAmount } from "App/tool";
import { useQuery } from "react-query";
import { List, Page } from "tonwa-com";
import { Item } from "uqs/JkMe";
import { ModelLink } from "../ModelLink";

const caption = '员工销售额列表';

const modelLink: ModelLink = {
    caption,
    iconColor: undefined,
    page: <PageStaffs />,
}

export default modelLink;

export interface MonthValues {
    opi: number;
    item: Item;
    dThis: number;
    mThis: number;
    mLast: number;
}

export interface ItemMonthValues {
    [Item.orderAmount]?: MonthValues;
    [Item.couponFee]?: MonthValues;
    [Item.profitFee]?: MonthValues;
}

export interface StaffRow {
    obj: number;
    staff: number;
    monthValuesArr: MonthValues[];
}
/*
export class CStaffs extends CObjects {
    list: StaffRow[];
    sum: { item: Item; dThis: number; mThis: number; mLast: number; }[] = [];

    get baseList(): any[] { return this.list }

    constructor(owner: CSupervise) {
        super(owner);
        makeObservable(this, {
            list: observable.shallow,
        });
    }

    protected get caption(): string { return '员工' }

    protected async internalLoadList(): Promise<void> {
    }

    protected async showList(): Promise<void> {
        this.openVPage(VStaffs);
    }

    async showObjectPortal(object: number, pageTop: JSX.Element) {
        let cObjectPortal = this.cApp.newCObjectPortal(object, pageTop);
        cObjectPortal.showObjectPortal();
    }
}
*/
function PageStaffs() {
    const uqApp = useUqApp();
    const { uqs } = uqApp;
    const { postTitles, itemTitles } = uqApp;

    const { data } = useQuery(['staffs'], async () => {
        let ret = await uqs.JkMe.GetStaffs.query({
        });
        let list = ret.ret;
        let coll: { [staff: number]: StaffRow } = {};
        let arr: StaffRow[] = [];
        let sum: { [key in Item]?: MonthValues } = {};
        for (let r of list) {
            let { opi, item, obj, staff, valueToday, valueThisMonth, valueLastMonth } = r;
            let staffRow = coll[staff];
            if (staffRow === undefined) {
                coll[staff] = staffRow = {
                    obj,
                    staff,
                    monthValuesArr: [],
                };
                arr.push(staffRow);
            }
            let { monthValuesArr } = staffRow;
            monthValuesArr.push({
                opi,
                item,
                dThis: valueToday,
                mThis: valueThisMonth,
                mLast: valueLastMonth,
            });
            let sumItem = sum[item as Item];
            if (sumItem === undefined) {
                sumItem = {
                    opi: undefined,
                    item,
                    dThis: 0,
                    mThis: 0,
                    mLast: 0,
                };
                sum[item as Item] = sumItem;
            }
            sumItem.dThis += (valueToday ?? 0);
            sumItem.mThis += (valueThisMonth ?? 0);
            sumItem.mLast += (valueLastMonth ?? 0);
        }
        //this.sum.splice(0, this.sum.length);
        let sumArr: MonthValues[] = [];
        for (let i in sum) sumArr.push(sum[Number(i) as Item]);
        return {
            sum: sumArr,
            list: arr,
        };
    });
    const { sum, list } = data;
    function ItemView({ value: v }: { value: StaffRow; }): JSX.Element {
        let { staff, monthValuesArr } = v;
        if (monthValuesArr.length === 0) return null;
        let vItems = monthValuesArr.map((v, index) => {
            let { item, dThis, mThis, mLast } = v;
            if (mThis === undefined && mLast === undefined) return null;
            let { title } = itemTitles[item];
            return <div key={index} className="d-flex">
                <div className="flex-fill text-sm-end small text-muted">{title}</div>
                <div className="d-sm-flex">
                    <div className="d-flex d-sm-block">
                        <div className="flex-fill small text-muted d-sm-none">今日</div>
                        <div>{vValue(dThis)}</div>
                    </div>
                    <div className="d-flex d-sm-block">
                        <div className="flex-fill small text-muted d-sm-none">本月</div>
                        <div>{vValue(mThis)}</div>
                    </div>
                    <div className="d-flex d-sm-block">
                        <div className="flex-fill small text-muted d-sm-none">上月</div>
                        <div>{vValue(mLast)}</div>
                    </div>
                </div>
            </div>
        }).filter(v => v);
        if (vItems.length === 0) return null;
        return <div className="px-3 py-2 d-block d-sm-flex">
            <div className="flex-fill">
                <ViewEmployee id={staff} />
            </div>
            <div className="d-block">
                {vItems}
            </div>
        </div>;
    }

    function ListFooter(): JSX.Element {
        return <div className="px-3 py-3 d-block d-sm-flex border-top border-bottom tonwa-bg-gray-2">
            <div className="flex-fill fw-bold text-sm-end small text-muted me-3">合计</div>
            <div>
                {sum.map((v, index) => {
                    let { item, dThis, mThis, mLast } = v;
                    if ((mThis === 0 || mThis === undefined)
                        && (mLast === 0 || mLast === undefined)) return null;
                    let { title } = itemTitles[item];
                    return <div key={index} className="d-flex">
                        <div className="flex-fill text-sm-end small text-muted">{title}</div>
                        <div className="d-sm-flex">
                            <div className="d-flex d-sm-block">
                                <div className="flex-fill small text-muted d-sm-none">今日</div>
                                <div>{vValue(dThis)}</div>
                            </div>
                            <div className="d-flex d-sm-block">
                                <div className="flex-fill small text-muted d-sm-none">本月</div>
                                <div>{vValue(mThis)}</div>
                            </div>
                            <div className="d-flex d-sm-block">
                                <div className="flex-fill small text-muted d-sm-none">上月</div>
                                <div>{vValue(mLast)}</div>
                            </div>
                        </div>
                    </div>
                })}
            </div>
        </div>;
    }

    function vValue(amount: number): JSX.Element {
        let { fixed, unit } = itemTitles[Item.orderAmount];
        return <div className={cnAmount}>
            {((amount ?? 0) as number).toFixed(fixed)}
            <small className="text-muted">{unit}</small>
        </div>;
    }
    function onClickItem(v: any) {
        let { obj, staff } = v;
        let pageTop = <div className="px-3 py-4">
            <div>职员 <b><ViewEmployee id={staff} /></b></div>
        </div>;
        alert('this.controller.showObjectPortal(obj, pageTop)');
    }
    return <Page header={caption}>
        <div>
            <div className="d-flex px-3 py-3 border-bottom border-primary">
                <div className="flex-fill">员工</div>
                <div className="d-none d-sm-flex">
                    <div className={cnAmount}>今天</div>
                    <div className={cnAmount}>本月</div>
                    <div className={cnAmount}>上月</div>
                </div>
            </div>
            <ListFooter />
        </div>
        <List items={list}
            ItemView={ItemView}
            onItemClick={onClickItem} />
        <ListFooter />
    </Page>
}
