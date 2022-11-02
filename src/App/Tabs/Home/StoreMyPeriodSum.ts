import { ItemPeriodSum, PostPeriodSum, StorePeriodSum } from "../../PeriodSum";
import { Item, ReturnGetObjectItemPeriodSumRet } from "uqs/JkMe";
import { proxy } from "valtio";

export class StoreMyPeriodSum extends StorePeriodSum {
    couponState = proxy<{ topCouponFeeRadio: any[] }>({
        topCouponFeeRadio: null,
    });

    protected getListFromPeriodSum(param: any[]): any[] {
        let arr: ReturnGetObjectItemPeriodSumRet[] = param;
        let postPeriodSumColl = {} as any;
        let postPeriodSumList: PostPeriodSum[] = [];
        for (let n of arr) {
            let post = Number(n.post);
            let item = Number(n.item);
            let ips: ItemPeriodSum = { ...n, post, item };
            let postPeriodSum = postPeriodSumColl[post];
            if (postPeriodSum === undefined) {
                let itemColl: { [item in keyof typeof Item]: ItemPeriodSum } = {} as any;
                postPeriodSumColl[post] = postPeriodSum = {
                    post: post,
                    itemColl,
                    itemList: [],
                }
                postPeriodSumList.push(postPeriodSum);
            }
            postPeriodSum.itemColl[item] = ips;
            postPeriodSum.itemList.push(ips);
        }
        return postPeriodSumList;
    }

    protected async initLoadMore(): Promise<void> {
        let { from, to } = this.state.period.state;
        let couponFeeRadio = await this.uqs.JkMe.GetCouponFeeRadio.query({ from, to });
        let topCouponFeeRadio = couponFeeRadio.ret.filter(e => e.radio > 0).sort((f, s) => s.radio - f.radio).slice(0, 5);
        for (let i = 0; i < topCouponFeeRadio.length; i++) {
            let element: any = topCouponFeeRadio[i];
            (topCouponFeeRadio[i] as any).employeeName = await this.uqApp.getEmployee(element.employee);
            topCouponFeeRadio[i].radio = element.radio * 100;
        }
        this.couponState.topCouponFeeRadio = topCouponFeeRadio;
    }

    protected async GetPeriodSum(from: Date, to: Date): Promise<{ ret: any[] }> {
        let ret = await this.uqs.JkMe.GetUserObjectItemPeriodSum.query({
            from,
            to,
        });
        return ret;
    }
}
