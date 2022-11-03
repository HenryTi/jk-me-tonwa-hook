//=== UqApp builder created on Thu Nov 03 2022 11:58:33 GMT-0400 (北美东部夏令时间) ===//
import * as JkMe from './JkMe';
import * as JkHr from './JkHr';
import * as JkProduct from './JkProduct';

export interface UQs {
	JkMe: JkMe.UqExt;
	JkHr: JkHr.UqExt;
	JkProduct: JkProduct.UqExt;
}

export const uqsSchema = {
	"百灵威系统工程部/me": JkMe.uqSchema,
	"百灵威系统工程部/hr": JkHr.uqSchema,
	"百灵威系统工程部/product": JkProduct.uqSchema,
}

export * as JkMe from './JkMe';
export * as JkHr from './JkHr';
export * as JkProduct from './JkProduct';
