import { UQs } from "uqs";
import {
    ReturnGetObjectsRet
    , ReturnGetGroupsRet
    , ReturnGetDistributorsRet
    , ReturnGetAgentsRet
    , ReturnGetStaffsRet
    , ReturnGetPostsRet
    , ReturnGetUserSuperviseItemRet
    , ReturnGetCustomerSumByMonthRet, ReturnGetItemHistory$page
    , ReturnGetItemSumDaysRet, ReturnGetItemSumMonthsRet
    , ReturnGetProductSumByMonthRet
    , ReturnGetAccountsRet
} from "uqs/JkMe";
import { Item } from "uqs/JkMe";
import { VItemSumHistory } from "./VItemSumHistory";
//import { PageItems } from "tonwa-core";
import { VItemHistory } from "./VItemHistory";
import { VItemDayHistory } from "./VItemDayHistory";
import { VCustomerSumByMonth, VProductSumByMonth } from "./VSumByMonth";
import { VAccounts } from "./VAccounts";
import { proxy } from "valtio";
import { derive } from "valtio/utils";
import { StorePeriodSum } from "../../PeriodSum";

export class StoreSupervise extends StorePeriodSum {
    item: Item;
    itemSumDays: ReturnGetItemSumDaysRet[];
    itemSumMonths: ReturnGetItemSumMonthsRet[];
    pageItemHistory: ReturnGetItemHistory$page[]; //PageItemHistory;
    monthSum: MonthSum<any>;
    superviseItems: ReturnGetUserSuperviseItemRet[];
    objects: ReturnGetObjectsRet[];
    groups: ReturnGetGroupsRet[];
    distributors: ReturnGetDistributorsRet[];
    agents: ReturnGetAgentsRet[];
    staffs: ReturnGetStaffsRet[];
    posts: ReturnGetPostsRet[];
    // cObjectsArr: CObjects[];
    accounts: ReturnGetAccountsRet[];

    protected async initLoadMore(): Promise<void> {
        let { JkMe } = this.uqs;
        let [superviseItems] = await Promise.all([
            JkMe.GetUserSuperviseItem.query({}),
        ]);
        this.superviseItems = superviseItems.ret;
    }
    /*
    protected async loadPeriodSum() {
        let { from, to } = this.state.period.state;
        let ret = await this.GetPeriodSum(from, to);
        this.state.list = ret.ret;
    }
    */

    protected async GetPeriodSum(from: Date, to: Date): Promise<{ ret: any[] }> {
        let ret = await this.uqs.JkMe.GetItemPeriodSum.query({
            date: from,
            days: Math.round(Math.abs((to.getTime() - from.getTime()) / (24 * 60 * 60 * 1000))),
        });
        return ret;
    }

    async showItemSumHistory(item: Item) {
        if (item) this.item = item;
        else item = this.item;
        let date = new Date();
        date.setDate(date.getDate() + 1);
        let [itemSumDays, itemSumMonths] = await Promise.all([
            this.uqs.JkMe.GetItemSumDays.query({
                item,
                date,
                days: 30,
            }),
            this.uqs.JkMe.GetItemSumMonths.query({
                item,
                date,
                months: 12,
            }),
        ]);
        this.itemSumDays = itemSumDays.ret;
        this.itemSumMonths = itemSumMonths.ret;
        this.nav.open(<VItemSumHistory />);
    }

    async showItemDayHistory(item: Item, from: Date, to: Date) {
        if (item) this.item = item;
        else item = this.item;
        let days = Math.floor((to.getTime() - from.getTime()) / (1000 * 3600 * 24));
        let [itemSumDays] = await Promise.all([
            this.uqs.JkMe.GetItemSumDays.query({
                item,
                date: to,
                days,
            })
        ]);
        this.itemSumDays = itemSumDays.ret;
        this.nav.open(<VItemDayHistory />);
    }

    async showItemHistory(from: Date, to: Date) {
        /*
        this.pageItemHistory = new PageItemHistory(this.uqs);
        await this.pageItemHistory.first({
            item: this.item,
            from,
            to,
        });
        */
        let pageStart = 0;
        let pageSize = 100;
        let ret = await this.uqs.JkMe.GetItemHistory.page({
            item: this.item,
            from,
            to,
        }, pageStart, pageSize);
        this.pageItemHistory = ret.$page;

        this.nav.open(<VItemHistory />);
    }

    showProductSumByMonth = async (caption: string, item: Item) => {
        this.monthSum = new MonthSumProduct(this.uqs, caption, item);
        await this.monthSum.load();
        this.nav.open(<VProductSumByMonth />);
    }

    showCustomerSumByMonth = async (caption: string, item: Item) => {
        this.monthSum = new MonthSumCustomer(this.uqs, caption, item);
        await this.monthSum.load();
        this.nav.open(<VCustomerSumByMonth />);
    }
    /*
    renderVUnitSum() {
        return this.cApp.renderVUnitSum();
    }
    */

    showAccounts = async () => {
        let ret = await this.uqs.JkMe.GetAccounts.query({});
        this.accounts = ret.ret;
        this.nav.open(<VAccounts />);
    }

    showAccountHistory = async () => {
        alert('显示账户明细 正在设计中...');
    }
}
/*
class PageItemHistory extends PageItems<ReturnGetItemHistory$page> {
    private uqs: UQs;
    constructor(uqs: UQs) {
        super();
        this.uqs = uqs;
    }
    protected async loadResults(param: any, pageStart: any, pageSize: number): Promise<{
        [name: string]: any[];
    }> {
        let ret = await this.uqs.JkMe.GetItemHistory.page(param, pageStart, pageSize);
        return ret as any;
    }
}
*/

interface MonthSumState<T> {
    month: Date;
    list: T[];
}

abstract class MonthSum<T> {
    protected readonly uqs: UQs;
    vCaption: string;
    item: Item;
    readonly state: MonthSumState<T>;
    readonly derived: {
        hasNext: boolean;
    };
    constructor(uqs: UQs, caption: string, item: Item) {
        this.uqs = uqs;
        this.vCaption = caption;
        this.item = item;
        let month = new Date();
        month.setDate(1);
        month.setHours(0, 0, 0, 0);
        this.state = proxy({
            month,
            list: null,
        });
        this.derived = derive({
            hasNext: (get) => {
                let d = new Date();
                d.setDate(0);
                d.setHours(0, 0, 0, 0);
                return get(this.state).month < d;
            }
        });
    }

    prev = async () => {
        let m = new Date(this.state.month);
        m.setMonth(m.getMonth() - 1);
        this.state.month = m;
        await this.load();
    }

    next = async () => {
        if (this.derived.hasNext === true) {
            let m = new Date(this.state.month);
            m.setMonth(m.getMonth() + 1);
            this.state.month = m;
            await this.load();
        }
    }

    abstract load(): Promise<void>;
}

class MonthSumProduct extends MonthSum<ReturnGetProductSumByMonthRet> {
    async load(): Promise<void> {
        let { month } = this.state;
        let m = month.getFullYear() * 100 + (month.getMonth() + 1);
        let param = {
            item: this.item,
            month: m,
            count: 200,
        };
        let ret = await this.uqs.JkMe.GetProductSumByMonth.query(param);
        let list = ret.ret;
        let len = list.length;
        for (let i = 0; i < len; i++) {
            (list[i] as any).$serial = i + 1;
        }
        this.state.list = list;
    }
}

class MonthSumCustomer extends MonthSum<ReturnGetCustomerSumByMonthRet> {
    async load(): Promise<void> {
        let { month } = this.state;
        let m = month.getFullYear() * 100 + (month.getMonth() + 1);
        let param = {
            item: this.item,
            month: m,
            count: 200,
        };
        let ret = await this.uqs.JkMe.GetCustomerSumByMonth.query(param);
        let list = ret.ret;
        let len = list.length;
        for (let i = 0; i < len; i++) {
            (list[i] as any).$serial = i + 1;
        }
        this.state.list = list;
    }
}