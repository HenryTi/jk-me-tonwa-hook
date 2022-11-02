import moment from "moment";
import { env } from "tonwa-com";
import { Item, Post, ReturnGetObjectItemPeriodSumRet } from "uqs/JkMe";
import { proxy } from "valtio";
import { derive } from "valtio/utils";

export enum EnumPeriod { day = 0, month = 1, week = 2, year = 3 }

export interface ItemPeriodSum extends ReturnGetObjectItemPeriodSumRet {
    id: number;
    object: number;
    post: Post;
    item: Item;
    value: number;
}

export interface PostPeriodSum {
    post: Post;
    itemColl: { [item in keyof typeof Item]: ItemPeriodSum };
    itemList: ItemPeriodSum[];
}

export abstract class Period {
    protected readonly timezone: number;
    protected readonly unitBizMonth: number;
    protected readonly unitBizDate: number;
    constructor(timezone: number, unitBizMonth: number, unitBizDate: number) {
        this.timezone = timezone;
        this.unitBizMonth = unitBizMonth;
        this.unitBizDate = unitBizDate;
        let date = this.newDate();
        this.state = proxy({
            to: date,
            from: new Date(date),
        });
        this.derived = derive({
            hasNext: (get) => {
                let date = this.newDate();
                return get(this.state).to <= date;
            }
        });
        this.init();
        this.canHasChild = true;
        //this.initObservable();
    }
    private newDate(): Date {
        let ret = new Date();
        ret.setHours(ret.getHours() - env.timeZone + this.timezone)
        ret.setHours(0, 0, 0, 0);
        return ret;
    }
    /*
    protected initObservable() {
        makeObservable(this, {
            from: observable,
            to: observable,
            prev: action,
            next: action,
            hasNext: computed,
        });
    }
    */
    type: EnumPeriod;
    caption: string;
    state: {
        from: Date;
        to: Date;
    };
    derived: {
        hasNext: boolean;
    };
    // from: Date;
    // to: Date;

    private canHasChild: boolean;
    private lysp: Period;
    get lastYearSamePeriod(): Period {
        if (this.canHasChild && !this.lysp) {
            this.lysp = createPeriod(this.type, this.timezone, this.unitBizMonth, this.unitBizDate);
            let { state } = this.lysp;
            let { from, to } = state;
            state.from = new Date(from.setFullYear(from.getFullYear() - 1));
            state.to = new Date(to.setFullYear(to.getFullYear() - 1));
            this.lysp.setCaption();
            this.lysp.canHasChild = false;
        }
        return this.lysp;
    }
    getGrainSize(date: Date): string {
        return "";
    }
    abstract init(): void;
    abstract prev(): void;
    abstract next(): void;
    /*
    get hasNext(): boolean {
        let date = this.newDate();
        return this.to <= date;
    }
    */
    abstract setCaption(): void;
    render(): string {
        return this.caption;
    }
}

const weekday = '日一二三四五六';
class DayPeriod extends Period {
    init(): void {
        this.type = EnumPeriod.day;
        this.state.to.setDate(this.state.from.getDate() + 1);
        this.setCaption();
    }
    prev(): void {
        let { state } = this;
        let { from, to } = state;
        state.to = new Date(to.setDate(to.getDate() - 1));
        state.from = new Date(from.setDate(from.getDate() - 1));
        this.setCaption();
        this.lastYearSamePeriod?.prev();
    }
    next(): void {
        let { state } = this;
        let { from, to } = state;
        state.to = new Date(to.setDate(to.getDate() + 1));
        state.from = new Date(from.setDate(from.getDate() + 1));
        this.setCaption();
        this.lastYearSamePeriod?.next();
    }
    setCaption(): void {
        let { from } = this.state;
        let year = new Date().getFullYear();
        let y = from.getFullYear();
        let m = from.getMonth();
        let d = from.getDate();
        let dw = from.getDay();
        this.caption = (y === year ? '' : `${y}年`) + `${m + 1}月${d}日 星期${weekday[dw]}`
    }
}

class WeekPeriod extends Period {
    init(): void {
        let { state } = this;
        let { to } = state;
        this.type = EnumPeriod.week;
        let day = to.getDay();
        let diff = to.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
        state.from = new Date(to.setDate(diff));
        state.to.setDate(to.getDate() + 7);
        this.setCaption();
    }
    prev(): void {
        let { state } = this;
        let { from, to } = state;
        state.from = new Date(from.setDate(from.getDate() - 7));
        state.to = new Date(to.setDate(to.getDate() - 7));
        this.setCaption();
        this.lastYearSamePeriod?.prev();
    }
    next(): void {
        let { state } = this;
        let { from, to } = state;
        state.from = new Date(from.setDate(from.getDate() + 7));
        state.to = new Date(to.setDate(to.getDate() + 7));
        this.setCaption();
        this.lastYearSamePeriod?.next();
    }
    setCaption(): void {
        let { from, to } = this.state;
        let year = new Date().getFullYear();
        let yf = from.getFullYear();
        let mf = from.getMonth();
        let df = from.getDate();
        let mt = to.getMonth();
        let dt = to.getDate();
        this.caption = (yf === year ? '' : `${yf}年`) + `${mf + 1}月${df}日 - `
            + (mt === mf ? '' : `${mt}月`) + `${dt}日`;
    }
    getGrainSize(date: Date) {
        return moment(date).format("MM-DD");
    }
}

class MonthPeriod extends Period {
    init(): void {
        let { state } = this;
        let { from, to } = state;
        this.type = EnumPeriod.month;
        let year = to.getFullYear();
        let month = to.getMonth();
        let date = to.getDate();
        if (date < this.unitBizDate) {
            month--;
            if (month < 0) { month = 11; year-- };
        }
        state.from = new Date(year, month, this.unitBizDate);
        state.to = new Date(from);
        state.to.setMonth(to.getMonth() + 1);
        this.setCaption();
    }
    prev(): void {
        let { state } = this;
        let { from, to } = state;
        state.from = new Date(from.setMonth(from.getMonth() - 1));
        state.to = new Date(to.setMonth(to.getMonth() - 1));
        this.setCaption();
        this.lastYearSamePeriod?.prev();
    }
    next(): void {
        let { state } = this;
        let { from, to } = state;
        state.from = new Date(from.setMonth(from.getMonth() + 1));
        state.to = new Date(to.setMonth(to.getMonth() + 1));
        this.setCaption();
        this.lastYearSamePeriod?.next();
    }
    setCaption(): void {
        let { state } = this;
        let { from, to } = state;
        let thisYear = new Date().getFullYear();
        let yf = from.getFullYear();
        let fm = from.getMonth();
        let tm = to.getMonth();
        this.caption = `${thisYear === yf ? '' : yf + '年'}${fm + 1}月`;
        if (this.unitBizDate > 1) {
            this.caption += `${this.unitBizDate}日-${tm + 1}月${this.unitBizDate - 1}日`;
        }
    }
    getGrainSize(date: Date) {
        return moment(date).format("MM-DD");
    }
}

class YearPeriod extends Period {
    init(): void {
        let { state } = this;
        let { from, to } = state;
        this.type = EnumPeriod.year;
        let year = to.getFullYear();
        let month = to.getMonth();
        let date = to.getDate();
        if (month < this.unitBizMonth) {
            year--;
        } else if (date < this.unitBizDate) {
            month++;
            if (month > 11) year++;
        }
        month = this.unitBizMonth;
        state.from = new Date(year, month, this.unitBizDate);
        state.to = new Date(from);
        state.to.setFullYear(to.getFullYear() + 1);
        this.setCaption();
    }
    prev(): void {
        let { state } = this;
        let { from, to } = state;
        state.from = new Date(from.setFullYear(from.getFullYear() - 1));
        state.to = new Date(to.setFullYear(to.getFullYear() - 1));
        this.setCaption();
        this.lastYearSamePeriod?.prev();
    }
    next(): void {
        let { state } = this;
        let { from, to } = state;
        state.from = new Date(from.setFullYear(from.getFullYear() + 1));
        state.to = new Date(to.setFullYear(to.getFullYear() + 1));
        this.setCaption();
        this.lastYearSamePeriod?.next();
    }
    setCaption(): void {
        let { state } = this;
        let { from, to } = state;
        let fy = from.getFullYear();
        let ty = to.getFullYear();
        switch (this.unitBizMonth) {
            case 0:
                this.caption = `${fy}年`;
                break;
            case 11:
                this.caption = `${ty}年`;
                break;
            default:
                this.caption = `${fy}-${ty.toString().substring(2)}年`;
                break;
        }
    }
    getGrainSize(date: Date) {
        return moment(date).add(1, 'M').format("MM");
    }
}

export function createPeriod(periodType: EnumPeriod, timezone: number, unitBizMonth: number, unitBizDate: number): Period {
    let period: Period;
    switch (periodType) {
        case EnumPeriod.day: period = new DayPeriod(timezone, unitBizMonth, unitBizDate); break;
        case EnumPeriod.week: period = new WeekPeriod(timezone, unitBizMonth, unitBizDate); break;
        case EnumPeriod.month: period = new MonthPeriod(timezone, unitBizMonth, unitBizDate); break;
        case EnumPeriod.year: period = new YearPeriod(timezone, unitBizMonth, unitBizDate); break;
    }
    return period;
}