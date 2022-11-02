import { MyUqApp } from "App/MyUqApp";
import { PageStore } from "tonwa-uq-com";
import { UQs } from "uqs";
import {
    Post
    , ReturnGetObjectItemHistoryRet, ReturnGetObjectItemPeriodHistoryRet
    , ReturnGetSuperviseObjectsRet
} from "uqs/JkMe";
import { proxy, ref } from "valtio";
import { BizOpDetail } from "./bizOpDetail";
import { createPeriod, EnumPeriod, ItemPeriodSum, Period } from "./period";
import { PageBizOpDetail } from "./PageBizOpDetail";
import { PagePostItemHistory } from "./PagePostItemHistory";
import { PageDayPostItemHistory, PageMonthPostItemHistory } from "./PagePeriodPostItemHistory";
import { PageSuperviseObjects } from "./PageSuperviseObjects";

export abstract class StorePeriodSum extends PageStore<MyUqApp, UQs> {
    bizOpDetail: BizOpDetail;

    // topCouponFeeRadio: any[];
    itemPeriodSum: ItemPeriodSum;
    periodHistoryLastYear: ReturnGetObjectItemPeriodHistoryRet[];
    superviseObjects: ReturnGetSuperviseObjectsRet[];
    state: {
        period: Period;
        list: any[];
        history: ReturnGetObjectItemHistoryRet[];
        periodHistory: ReturnGetObjectItemPeriodHistoryRet[];
    } = proxy({
        period: null,
        list: null,
        history: null,
        periodHistory: null,
    });

    protected abstract GetPeriodSum(from: Date, to: Date): Promise<{ ret: any[] }>;
    protected getListFromPeriodSum(param: any[]): any[] {
        return param;
    }
    protected abstract initLoadMore(): Promise<void>;
    private async loadPeriodSum(): Promise<void> {
        let { from, to } = this.state.period.state;
        let ret = await this.GetPeriodSum(from, to);
        let list = this.getListFromPeriodSum(ret.ret);
        this.state.list = list;
    }

    async init(): Promise<void> {
        this.internalSetPeriod(EnumPeriod.day);
        await Promise.all([
            this.loadPeriodSum(),
            this.initLoadMore(),
        ]);
    }

    private internalSetPeriod(periodType: EnumPeriod) {
        let { unitTimezone, unitBizMonth, unitBizDate } = this.uqApp;
        this.state.period = ref(createPeriod(periodType, unitTimezone, unitBizMonth, unitBizDate));
    }

    async setPeriod(periodType: EnumPeriod) {
        this.internalSetPeriod(periodType);
        await this.loadPeriodSum();
    }

    private async loadPostItemHistory(ips: ItemPeriodSum, fromDate: Date, toDate: Date) {
        if (!ips) {
            ips = this.itemPeriodSum;
        }
        else {
            this.itemPeriodSum = ips;
        }
        let { id: objectPostItem, post, item } = ips;
        let { from, to } = this.state.period.state;
        if (fromDate) from = fromDate;
        if (toDate) to = toDate;
        let retList: ReturnGetObjectItemHistoryRet[];
        if (post === Post.sys) {
            let ret = await this.uqs.JkMe.GetItemHistory.page({
                item,
                from,
                to,
            }, undefined, 10000);
            retList = ret.$page;
        }
        else {
            let ret = await this.uqs.JkMe.GetObjectItemHistory.query({
                objectPostItem,
                from,
                to,
            });
            retList = ret.ret;
        }
        this.state.history = retList;
    }

    private async loadPeriodPostItemHistory(ips: ItemPeriodSum, fromDate: Date, toDate: Date, bizDate: number/* sumPeriod: EnumPeriod*/) {
        if (ips) {
            this.itemPeriodSum = ips;
        }
        else {
            ips = this.itemPeriodSum;
        }
        let { id: objectPostItem } = ips;
        let { period } = this.state;
        let { lastYearSamePeriod, state } = period;
        let { from, to } = state;
        if (fromDate) from = fromDate;
        if (toDate) to = toDate;
        let ret = await this.uqs.JkMe.GetObjectItemPeriodHistory.query({
            objectPostItem,
            from,
            to,
            period: bizDate,
        });

        let { from: lastYearFrom, to: lastYearTo } = lastYearSamePeriod.state;
        let lyRet = await this.uqs.JkMe.GetObjectItemPeriodHistory.query({
            objectPostItem,
            from: lastYearFrom,
            to: lastYearTo,
            period: bizDate,
        });

        this.state.periodHistory = ret.ret;
        this.periodHistoryLastYear = lyRet.ret;
    }

    private async loadSuperviseObjects(ips: ItemPeriodSum, fromDate: Date, toDate: Date) {
        if (ips) {
            this.itemPeriodSum = ips;
        }
        else {
            ips = this.itemPeriodSum;
        }
        // let { id: objectPostItem } = ips;
        let { from, to } = this.state.period.state;
        if (fromDate) from = fromDate;
        if (toDate) to = toDate;
        let ret = await this.uqs.JkMe.GetSuperviseObjects.query({ from, to });
        this.superviseObjects = ret.ret;
    }

    prev = async () => {
        this.state.period.prev();
        await this.loadPeriodSum();
    }

    next = async () => {
        let { period } = this.state;
        if (period.derived.hasNext === false) return;
        period.next();
        await this.loadPeriodSum();
    }

    async showBizOpDetail(item: ReturnGetObjectItemHistoryRet) {
        this.bizOpDetail = new BizOpDetail(this.uqs, item);
        this.nav.open(<PageBizOpDetail />);
    }

    showOpiHistory = async (ips: ItemPeriodSum) => {
        switch (this.state.period.type) {
            case EnumPeriod.day:
                this.showPostItemHistory(ips, undefined, undefined);
                break;
            case EnumPeriod.month:
            case EnumPeriod.week:
                this.showDayPostItemHistory(ips, undefined, undefined);
                break;
            case EnumPeriod.year:
                this.showMonthPostItemHistory(ips, undefined, undefined);
                break;
        }
    }

    async showPostItemHistory(ips: ItemPeriodSum, from: Date, to: Date) {
        switch (ips && ips.post) {
            case Post.staffSupervisor:
                await this.loadSuperviseObjects(ips, from, to);
                this.nav.open(<PageSuperviseObjects />);
                break;
            default:
                await this.loadPostItemHistory(ips, from, to);
                this.nav.open(<PagePostItemHistory />);
                break;
        }
    }

    async showDayPostItemHistory(ips: ItemPeriodSum, from: Date, to: Date) {
        await this.loadPeriodPostItemHistory(ips, from, to, 0 /*EnumPeriod.day*/);
        this.nav.open(<PageDayPostItemHistory />);
    }

    async showMonthPostItemHistory(ips: ItemPeriodSum, from: Date, to: Date) {
        await this.loadPeriodPostItemHistory(ips, from, to, this.uqApp.unitBizDate/* EnumPeriod.month*/);
        this.nav.open(<PageMonthPostItemHistory />);
    }
}
