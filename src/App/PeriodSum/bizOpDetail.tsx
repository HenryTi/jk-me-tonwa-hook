import { UQs } from "uqs";
import { ReturnGetObjectItemHistoryRet } from "uqs/JkMe";

export class BizOpDetail {
    private uqs: UQs;
    item: ReturnGetObjectItemHistoryRet;

    constructor(uqs: UQs, item: ReturnGetObjectItemHistoryRet) {
        this.uqs = uqs;
        this.item = item;
    }
}