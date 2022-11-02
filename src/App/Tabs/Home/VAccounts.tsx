import { useUqApp } from "App/MyUqApp";
import { renderNum } from "App/tool";
import { useQuery } from "react-query";
import { List, LMR, Page, useNav } from "tonwa-com";
import { EnumAccount, Post, ReturnGetObjectAccountHistoryRet, ReturnGetUserObjectAccountRet } from "uqs/JkMe";

export function VAccounts({ object }: { object: number; }) {
    const uqApp = useUqApp();
    const nav = useNav();
    let accounts = useQuery(['accounts', object], async () => {
        console.log('accounts', object);
        let ret = await uqApp.uqs.JkMe.GetUserObjectAccount.query({ object });
        return ret.ret;
    });
    // const storePortal = usePageStore<StorePortal>();
    // let { data, cApp, onAccountClick } = this.controller;
    // let { accounts } = ret;
    // if (!accounts) return null;
    let { accountTitles, postTitles } = uqApp;

    async function onAccountClick(account: ReturnGetUserObjectAccountRet) {
        // this.account = account;
        nav.open(<PageObjectAccountHistory account={account} />);
    }

    return <>{accounts.data.map((v, index) => {
        let { post, account, balance } = v;
        let { title, unit, fixed } = accountTitles[account as EnumAccount];
        let postTitle = postTitles[post as Post];
        return <div key={index}
            className="m-2 p-3 border border-info rounded rounded-3 bg-white text-center cursor-pointer"
            onClick={() => onAccountClick(v)}>
            <div className="mb-1 small">
                <span className="text-secondary small">{postTitle?.title}</span>
                <span className="text-primary">{title}</span>
            </div>
            <div className="large">{renderNum(balance, unit, fixed)}</div>
        </div>
    })}</>;
}

function PageObjectAccountHistory({ account }: { account: ReturnGetUserObjectAccountRet; }) {
    const uqApp = useUqApp();
    let { accountTitles, postTitles } = uqApp;
    let { objectAccount, account: enumAccount } = account;
    let accountHistory = useQuery(['accountHistory', objectAccount], async () => {
        console.log('accountHistory', objectAccount);
        let ret = await uqApp.uqs.JkMe.GetObjectAccountHistory.query({ objectAccount });
        return ret.ret;
    });
    let accountTitle = accountTitles[enumAccount as EnumAccount];
    return <Page header="账户逐日变化">
        <div>
            <List items={accountHistory.data} ItemView={ItemView} />
        </div>
    </Page>;

    function ItemView({ value: row }: { value: ReturnGetObjectAccountHistoryRet; }) {
        let { fixed, unit } = accountTitle;
        let { date, value, item, post } = row;
        return <LMR className="px-3 py-2">
            <span className="d-inline-block w-min-6c">{dateString(date)}</span>
            <div>{renderNum(value, unit, fixed, false)}</div>
        </LMR>
    }
}

function dateString(date: Date) {
    if (typeof date === 'string') {
        date = new Date(date);
    }
    let y = date.getFullYear();
    let m = date.getMonth() + 1;
    let d = date.getDate();
    if (y === new Date().getFullYear()) {
        return `${m}月${d}日`;
    }
    else {
        return `${y}年${m}月${d}日`;
    }
}
