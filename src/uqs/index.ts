//=== UqApp builder created on Thu Oct 13 2022 15:48:08 GMT-0400 (北美东部夏令时间) ===//
import * as JkMe from './JkMe';

export interface UQs {
	JkMe: JkMe.UqExt;
}

export const uqsSchema = {
	"百灵威系统工程部/me": JkMe.uqSchema,
}

export * as JkMe from './JkMe';
