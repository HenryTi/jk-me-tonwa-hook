import { useContext } from 'react';
import { AppConfig, UqApp, UqAppContext, UqAppView/*, useUqStore, Store */ } from "tonwa-uq-com";
import { Uq, UqConfig, UqQuery } from 'tonwa-uq';
import { UQs, uqsSchema } from "uqs";
import { Item, Post, EnumRole, EnumRoleOp, EnumAccount } from "uqs/JkMe";
import uqconfigJson from '../uqconfig.json';
import { RoleNames } from './RoleNames';
import { proxy } from 'valtio';
import { AppRoutes } from './tool/AppWithPageStack';

const appConfig: AppConfig = {
    version: '0.1.0',
    center: 'https://tv.jkchemical.com',
    debug: {
        center: 'localhost:3000',
        uq: 'localhost:3015',
        res: 'localhost:3015',
    },
    noUnit: true,
    oem: undefined,
    htmlTitle: 'Warehouse',
};

function uqConfigsFromJson(json: { devs: { [dev: string]: any }; uqs: any[]; }): UqConfig[] {
    let ret: UqConfig[] = [];
    let { devs, uqs } = json;
    for (let uq of uqs) {
        let { dev, name, alias } = uq;
        ret.push({
            dev: devs[dev],
            name,
            alias,
        });
    }
    return ret;
}

export function useUqApp() {
    return useContext<MyUqApp>(UqAppContext);
}

export interface Title {
    title: string;
    vice?: string;
    unit?: string;
    fixed?: number;
}

let myUqAppId = 1;
export class MyUqApp extends UqApp<UQs> {
    id = myUqAppId++;
    protected get defaultUq(): Uq {
        return this.uqs.JkMe; //.BzUShop;
    }
    protected get defaultUqRoleNames() { return RoleNames; }

    timezone: number;
    unitTimezone: number;
    unitBizDate: number;
    unitBizMonth: number;
    ops: { role: EnumRole; op: EnumRoleOp }[];
    readonly itemTitles: { [item in Item]: Title } = {} as any;
    readonly postTitles: { [post in Post]: Title } = {} as any;
    readonly accountTitles: { [acount in EnumAccount]: Title } = {} as any;
    state = proxy({
        refreshTime: Date.now() / 1000,
    });

    private employees: any[] = [];
    async getEmployee(id: number) {
        if (this.employees[id] === undefined) {
            //let e = await this.uqs.JkHr.Employee.load(id);
            let e = { name: '职员 - JkHr.Employee' }
            this.employees[id] = e.name;
        }
        return this.employees[id];
    }

    // 数据服务器提醒客户端刷新，下面代码重新调入的数据
    refresh = async () => {
        let d = Date.now() / 1000;
        if (d - this.state.refreshTime < 30) return;
        await Promise.all([
            // this.cHome.load(),
            // this.cUnitPortal?.load(),
        ]);
        this.state.refreshTime = d;
    }

    private async loadUnitTime($getTimezone: UqQuery<any, any>) {
        let ret = await $getTimezone.query({});
        let tz = ret.ret[0];
        this.timezone = tz.timezone ?? 8;
        this.unitTimezone = tz.unitTimeZone ?? 8;
        this.unitBizMonth = (tz.unitBizMonth ?? 1) - 1;
        this.unitBizDate = tz.unitBizDate ?? 1;
    }

    protected async onLoaded(): Promise<void> {
        let { JkMe } = this.uqs;
        let [retItemTitles, retPostTitles, retAccountTitles, roleOps] = await Promise.all([
            JkMe.GetItemTitles.query({}),
            JkMe.GetPostTitles.query({}),
            JkMe.GetAccountTitles.query({}),
            JkMe.GetRoleOps.query({}),
            this.loadUnitTime(JkMe.$getUnitTime),
        ]);
        for (let it of retItemTitles.ret) this.itemTitles[it.id as Item] = it;
        for (let pt of retPostTitles.ret) this.postTitles[pt.id as Post] = pt;
        for (let at of retAccountTitles.ret) this.accountTitles[at.id as EnumAccount] = at;

        this.ops = roleOps.ret;
    }
}

const uqConfigs = uqConfigsFromJson(uqconfigJson);
const uqApp = new MyUqApp(appConfig, uqConfigs, uqsSchema);
export function MyUqAppView() {
    return <UqAppView uqApp={uqApp}>
        <AppRoutes />
    </UqAppView>
}
