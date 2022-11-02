import React from "react";
import { FA, List, LMR, Page } from "tonwa-com";
import { usePageStore } from "tonwa-uq-com";
import { renderNum } from "App/tool";
import { ReturnGetProductSumByMonthRet } from "uqs/JkMe";
import { useSnapshot } from "valtio";
import { StoreSupervise } from "./StoreSupervise";
import { useUqApp } from "App/MyUqApp";

interface Props {
    renderId: (id: number) => JSX.Element;
}
function VSumByMonth({ renderId }: Props) {
    const storeSupervise = usePageStore<StoreSupervise>();
    const { monthSum } = storeSupervise;
    const { list } = useSnapshot(monthSum.state);

    function RenderDate() {
        const { state, derived, prev, next } = monthSum;
        const { month } = useSnapshot(state);
        const { hasNext } = useSnapshot(derived);
        let left = <div className="cursor-pointer px-5 py-3" onClick={prev}><FA name="angle-left" /></div>;
        let right = <div className={' px-5 py-3 ' + (hasNext ? ' cursor-pointer ' : ' text-light ')} onClick={next}><FA name="angle-right" /></div>
        return <div className="d-flex justify-content-center">
            <div className="d-flex mx-auto">
                {left}
                <div className="text-center py-3">{month.getFullYear()}年{month.getMonth() + 1}月</div>
                {right}
            </div>
        </div>;
    }

    function ItemView({ value: row }: { value: ReturnGetProductSumByMonthRet; }) {
        let { id, value } = row;
        let { $serial } = row as any;
        return <LMR className="pe-2 pe-sm-3 py-2">
            <div className="w-min-2c text-center text-primary me-1 small">{$serial}</div>
            <div>{renderId(id)}</div>
            <div className="ms-1">{renderNum(value, '元')}</div>
        </LMR>
    }

    async function onClick(row: ReturnGetProductSumByMonthRet) {
        alert(JSON.stringify(row));
    }
    return <Page header={monthSum.vCaption}>
        <div className="">
            <RenderDate />
            <List items={list}
                ItemView={ItemView}
                onItemClick={onClick} />
        </div>
    </Page>;
}

export function VProductSumByMonth() {
    const { uqs } = useUqApp();
    function renderId(id: number) {
        return <span>product id: {id}</span>;
        // return uqs.JkProduct.ProductX.tv(id);
    }
    return <VSumByMonth renderId={renderId} />;
}

export function VCustomerSumByMonth() {
    function renderId(id: number) {
        return <>客户{id}</>;
    }
    return <VSumByMonth renderId={renderId} />;
}
