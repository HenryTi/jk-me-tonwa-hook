//=== UqApp builder created on Thu Oct 13 2022 15:48:08 GMT-0400 (北美东部夏令时间) ===//
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IDXValue, Uq, UqQuery, UqAction, UqID, UqIX, UqIDX } from "tonwa-uq";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// import { Render, IDXEntity } from "tonwa-react";


//===============================;
//======= UQ 百灵威系统工程部/me ========;
//===============================';

export interface ID {
    id?: number;
}

export interface IDX {
    id: number;
}

export interface IX {
    ix: number;
    xi: number;
}

export interface Param$role_My {
}
export interface Return$role_MyAdmins {
	id: number;
	unit: number;
	admin: number;
	entity: string;
	assigned: string;
}
export interface Return$role_MyRoles {
	unit: number;
	role: string;
}
export interface Return$role_MyUnitProps {
	unit: number;
	props: string;
}
export interface Result$role_My {
	admins: Return$role_MyAdmins[];
	roles: Return$role_MyRoles[];
	unitProps: Return$role_MyUnitProps[];
}

export interface Param$role_Unit_Users {
	unit: number;
}
export interface Return$role_Unit_UsersUsers {
	id: number;
	user: number;
	admin: number;
	assigned: string;
	name: string;
	nick: string;
	icon: string;
	addBy: number;
}
export interface Return$role_Unit_UsersRoles {
	user: number;
	role: string;
}
export interface Result$role_Unit_Users {
	users: Return$role_Unit_UsersUsers[];
	roles: Return$role_Unit_UsersRoles[];
}

export interface Param$role_Unit_Add_Admin {
	unit: number;
	user: number;
	admin: number;
	assigned: string;
}
export interface Result$role_Unit_Add_Admin {
}

export interface Param$role_Unit_Del_Admin {
	unit: number;
	user: number;
	admin: number;
}
export interface Result$role_Unit_Del_Admin {
}

export interface Param$role_Unit_Add_User {
	unit: number;
	user: number;
	assigned: string;
}
export interface Result$role_Unit_Add_User {
}

export interface Param$role_Unit_User_Role {
	unit: number;
	user: number;
	action: string;
	role: string;
}
export interface Result$role_Unit_User_Role {
}

export interface Param$role_Unit_Quit_Owner {
	unit: number;
}
export interface Result$role_Unit_Quit_Owner {
}

export interface Param$poked {
}
export interface Return$pokedRet {
	poke: number;
}
export interface Result$poked {
	ret: Return$pokedRet[];
}

export interface Param$setMyTimezone {
	_timezone: number;
}
export interface Result$setMyTimezone {
}

export interface Param$getUnitTime {
}
export interface Return$getUnitTimeRet {
	timezone: number;
	unitTimeZone: number;
	unitBizMonth: number;
	unitBizDate: number;
}
export interface Result$getUnitTime {
	ret: Return$getUnitTimeRet[];
}

export enum Item {
	orderDeliver = 1010,
	orderAmount = 1011,
	orderProfit = 1012,
	orderFee = 1013,
	orderSaleTransferIn = 1014,
	orderFactoryTransferIn = 1015,
	orderSaleTransferOut = 1016,
	orderFactoryTransferOut = 1017,
	orderReturn = 1020,
	orderReceive = 1030,
	receiveSaleTransferOut = 1036,
	receiveFactoryTransferOut = 1037,
	orderReceiveReturn = 1040,
	returnPoint = 1041,
	profitFee = 1110,
	couponFee = 1111,
	couponCoSalesFee = 1113,
	returnPointFee = 1112,
	amountFee = 1120,
	supervisorFee = 1210,
	customerPoint = 2010,
	pickupPoint = 3010,
	cashOut = 5010,
	cashAdjust = 5011
}

export enum Post {
	sys = 0,
	staff = 1010,
	staffSales = 1100,
	topSales = 1101,
	staffSupervisor = 1102,
	staffCoSales = 1103,
	manager = 2010,
	managerIT = 2100,
	saleBranch = 3000,
	factoryBranch = 3001,
	sellerBranch = 3002,
	agent = 7010,
	agentSales = 7100,
	distributor = 7500,
	distributorSales = 7501,
	customer = 8010
}

export enum EnumBizOpType {
	booking = 0,
	orderDeliverDone = 101,
	orderReceiveDone = 102,
	orderReturn = 103,
	pickupDone = 104,
	salaryPaid = 105,
	returnPointDone = 106,
	salaryAdjust = 107
}

export enum OrderReady {
	sheet = 1,
	margin = 4
}

export enum EnumCurrency {
	BASE = 5,
	GBP = 2,
	HKD = 3,
	JPY = 4,
	RMB = 5,
	AUD = 6,
	CAD = 7,
	CHF = 8,
	EUR = 9,
	USD = 10
}

export interface ParamGetItemTitles {
}
export interface ReturnGetItemTitlesRet {
	id: number;
	title: string;
	vice: string;
	unit: string;
	fixed: number;
}
export interface ResultGetItemTitles {
	ret: ReturnGetItemTitlesRet[];
}

export interface ParamGetPostTitles {
}
export interface ReturnGetPostTitlesRet {
	id: number;
	title: string;
	vice: string;
}
export interface ResultGetPostTitles {
	ret: ReturnGetPostTitlesRet[];
}

export interface ParamGetAccountTitles {
}
export interface ReturnGetAccountTitlesRet {
	id: number;
	title: string;
	vice: string;
	unit: string;
	fixed: number;
}
export interface ResultGetAccountTitles {
	ret: ReturnGetAccountTitlesRet[];
}

export interface Promotions extends ID {
	name: string;
	description: string;
	start: any;
	end: any;
	isValid: number;
	creator: number;
	createDate: any;
}

export interface PromotionsInActs extends ID {
	ID?: UqID<any>;
	name: string;
	description: string;
	start: any;
	end: any;
	isValid: number;
	creator: number | ID;
	createDate: any;
}

export interface PromotionProducts extends ID {
	main?: number;
	product: number;
}

export interface PromotionProductsInActs extends ID {
	ID?: UqID<any>;
	main?: number | PromotionsInActs;
	product: number | ID;
}

export interface PromotionSalesman extends ID {
	main?: number;
	salesman: number;
}

export interface PromotionSalesmanInActs extends ID {
	ID?: UqID<any>;
	main?: number | PromotionsInActs;
	salesman: number | ID;
}

export interface PromotionSalesmanRatio extends ID {
	promotionSalesman: number;
	bizOpType: any;
	post: any;
	item: any;
	ratio: number;
}

export interface PromotionSalesmanRatioInActs extends ID {
	ID?: UqID<any>;
	promotionSalesman: number | ID;
	bizOpType: any;
	post: any;
	item: any;
	ratio: number;
}

export const MaxActionRows = {
}

export enum EnumObjectType {
	none = 0,
	user = 1,
	customer = 2,
	staff = 3,
	agent = 4,
	distributor = 5,
	post = 6,
	branch = 7
}

export enum EnumAccount {
	commission = 10,
	supervisor = 11
}

export interface ParamUserObjectPostItem {
}
export interface ReturnUserObjectPostItemRet {
	id: number;
	object: number;
	post: any;
	item: any;
}
export interface ResultUserObjectPostItem {
	ret: ReturnUserObjectPostItemRet[];
}

export interface ParamGetObjectPostItem {
	object: number;
}
export interface ReturnGetObjectPostItemRet {
	id: number;
	object: number;
	post: any;
	item: any;
}
export interface ResultGetObjectPostItem {
	ret: ReturnGetObjectPostItemRet[];
}

export interface ParamGetUserObjectAccount {
	object: number;
}
export interface ReturnGetUserObjectAccountRet {
	objectAccount: number;
	object: number;
	post: any;
	account: any;
	balance: number;
}
export interface ResultGetUserObjectAccount {
	ret: ReturnGetUserObjectAccountRet[];
}

export interface ParamGetUserObjectItemPeriodSum {
	from: any;
	to: any;
}
export interface ReturnGetUserObjectItemPeriodSumRet {
	id: number;
	object: number;
	post: any;
	item: any;
	value: number;
}
export interface ResultGetUserObjectItemPeriodSum {
	ret: ReturnGetUserObjectItemPeriodSumRet[];
}

export interface ParamGetCouponFeeRadio {
	from: any;
	to: any;
}
export interface ReturnGetCouponFeeRadioRet {
	employee: number;
	radio: number;
}
export interface ResultGetCouponFeeRadio {
	ret: ReturnGetCouponFeeRadioRet[];
}

export interface ParamGetObjectItemPeriodSum {
	object: number;
	from: any;
	to: any;
}
export interface ReturnGetObjectItemPeriodSumRet {
	id: number;
	object: number;
	post: any;
	item: any;
	value: number;
}
export interface ResultGetObjectItemPeriodSum {
	ret: ReturnGetObjectItemPeriodSumRet[];
}

export interface ParamGetObjectItemHistory {
	objectPostItem: number;
	from: any;
	to: any;
}
export interface ReturnGetObjectItemHistoryRet {
	id: number;
	biz: number;
	bizMainNo: string;
	bizOp: number;
	value: number;
	memo: string;
}
export interface ResultGetObjectItemHistory {
	ret: ReturnGetObjectItemHistoryRet[];
}

export interface ParamGetSheetOpiHistory {
	bizMain: number;
	objectPostItem: number;
}
export interface ReturnGetSheetOpiHistoryRet {
	id: number;
	biz: number;
	bizMainNo: string;
	bizOp: number;
	value: number;
	memo: string;
}
export interface ResultGetSheetOpiHistory {
	ret: ReturnGetSheetOpiHistoryRet[];
}

export interface ParamGetObjectItemPeriodHistory {
	objectPostItem: number;
	from: any;
	to: any;
	period: number;
}
export interface ReturnGetObjectItemPeriodHistoryRet {
	date: any;
	value: number;
}
export interface ResultGetObjectItemPeriodHistory {
	ret: ReturnGetObjectItemPeriodHistoryRet[];
}

export interface ParamGetObjectAccountHistory {
	objectAccount: number;
}
export interface ReturnGetObjectAccountHistoryRet {
	date: any;
	value: number;
	post: any;
	item: any;
}
export interface ResultGetObjectAccountHistory {
	ret: ReturnGetObjectAccountHistoryRet[];
}

export interface ParamGetSuperviseObjects {
	from: any;
	to: any;
}
export interface ReturnGetSuperviseObjectsRet {
	opi: number;
	object: number;
	post: any;
	item: any;
	staff: number;
	value: number;
	ratioValue: number;
}
export interface ResultGetSuperviseObjects {
	ret: ReturnGetSuperviseObjectsRet[];
}

export interface ParamGetObjects {
}
export interface ReturnGetObjectsRet {
	id: number;
	type: any;
}
export interface ResultGetObjects {
	ret: ReturnGetObjectsRet[];
}

export interface ParamGetDistributors {
}
export interface ReturnGetDistributorsRet {
	id: number;
	distributor: number;
}
export interface ResultGetDistributors {
	ret: ReturnGetDistributorsRet[];
}

export interface ParamGetAgents {
}
export interface ReturnGetAgentsRet {
	id: number;
	agent: number;
}
export interface ResultGetAgents {
	ret: ReturnGetAgentsRet[];
}

export interface ParamGetStaffs {
}
export interface ReturnGetStaffsRet {
	opi: number;
	item: any;
	obj: number;
	staff: number;
	valueToday: number;
	valueThisMonth: number;
	valueLastMonth: number;
}
export interface ResultGetStaffs {
	ret: ReturnGetStaffsRet[];
}

export interface ParamGetPosts {
}
export interface ReturnGetPostsRet {
	opi: number;
	obj: number;
	post: any;
	item: any;
	amountThisMonth: number;
	amountLastMonth: number;
}
export interface ResultGetPosts {
	ret: ReturnGetPostsRet[];
}

export interface ParamGetUserSuperviseItem {
}
export interface ReturnGetUserSuperviseItemRet {
	item: any;
}
export interface ResultGetUserSuperviseItem {
	ret: ReturnGetUserSuperviseItemRet[];
}

export interface ParamGetItemPeriodSum {
	date: any;
	days: number;
}
export interface ReturnGetItemPeriodSumRet {
	item: any;
	opi: number;
	value: number;
}
export interface ResultGetItemPeriodSum {
	ret: ReturnGetItemPeriodSumRet[];
}

export interface ParamGetItemSumDays {
	item: any;
	date: any;
	days: number;
}
export interface ReturnGetItemSumDaysRet {
	date: any;
	value: number;
}
export interface ResultGetItemSumDays {
	ret: ReturnGetItemSumDaysRet[];
}

export interface ParamGetItemSumMonths {
	item: any;
	date: any;
	months: number;
}
export interface ReturnGetItemSumMonthsRet {
	date: any;
	value: number;
}
export interface ResultGetItemSumMonths {
	ret: ReturnGetItemSumMonthsRet[];
}

export interface ParamGetItemHistory {
	item: any;
	from: any;
	to: any;
}
export interface ReturnGetItemHistory$page {
	id: number;
	biz: number;
	bizMainNo: string;
	bizOp: number;
	item: any;
	value: number;
	memo: string;
}
export interface ResultGetItemHistory {
	$page: ReturnGetItemHistory$page[];
}

export interface ParamGetAccounts {
}
export interface ReturnGetAccountsRet {
	id: number;
	object: number;
	account: any;
	balance: number;
	objectType: any;
	objectTo: number;
}
export interface ResultGetAccounts {
	ret: ReturnGetAccountsRet[];
}

export interface ExportItemHistory extends ID {
	itemHistoryId: number;
}

export interface ExportItemHistoryInActs extends ID {
	ID?: UqID<any>;
	itemHistoryId: number | ID;
}

export interface Group extends ID {
	name: string;
}

export interface GroupInActs extends ID {
	ID?: UqID<any>;
	name: string;
}

export interface ParamGetGroups {
}
export interface ReturnGetGroupsRet {
	id: number;
	name: string;
}
export interface ResultGetGroups {
	ret: ReturnGetGroupsRet[];
}

export interface ParamGetGroupObjects {
	group: number;
}
export interface ReturnGetGroupObjectsRet {
	id: number;
	type: any;
}
export interface ResultGetGroupObjects {
	ret: ReturnGetGroupObjectsRet[];
}

export const Const_Sleep_Time = {
}

export enum EnumRole {
	all = 1,
	dev = 2,
	mainUser = 3,
	promotionAdmin = 4
}

export enum EnumRoleOp {
	test = 1
}

export interface UserRole extends IX {
}

export interface MeUser extends IDX {
	id: number;
	name?: string;
	$act?: number;
}export interface ActParamMeUser {
	id: number|IDXValue;
	name?: string|IDXValue;
	$act?: number;
}

export interface RoleOps extends IX {
}

export interface ParamGetRoleOps {
}
export interface ReturnGetRoleOpsRet {
	role: any;
	op: any;
}
export interface ResultGetRoleOps {
	ret: ReturnGetRoleOpsRet[];
}

export enum OrderType {
	Customer = 1,
	Distributor = 11,
	SaleBranch = 21,
	FactoryBranch = 22
}

export interface ParamGetMonthSumProduct {
	item: any;
	id: number;
}
export interface ReturnGetMonthSumProduct$page {
	month: number;
	value: number;
	amount: number;
	profit: number;
	receive: number;
	return: number;
}
export interface ResultGetMonthSumProduct {
	$page: ReturnGetMonthSumProduct$page[];
}

export interface ParamGetProductSumByMonth {
	item: any;
	month: number;
	count: number;
}
export interface ReturnGetProductSumByMonthRet {
	id: number;
	value: number;
	amount: number;
	profit: number;
	receive: number;
	return: number;
}
export interface ResultGetProductSumByMonth {
	ret: ReturnGetProductSumByMonthRet[];
}

export interface ParamGetMonthSumCustomer {
	item: any;
	id: number;
}
export interface ReturnGetMonthSumCustomer$page {
	month: number;
	value: number;
	amount: number;
	profit: number;
	receive: number;
	return: number;
}
export interface ResultGetMonthSumCustomer {
	$page: ReturnGetMonthSumCustomer$page[];
}

export interface ParamGetCustomerSumByMonth {
	item: any;
	month: number;
	count: number;
}
export interface ReturnGetCustomerSumByMonthRet {
	id: number;
	value: number;
	amount: number;
	profit: number;
	receive: number;
	return: number;
}
export interface ResultGetCustomerSumByMonth {
	ret: ReturnGetCustomerSumByMonthRet[];
}

export const JkOrderTest = {
	id: 31195716,
	detail1: 31195717,
	detail2: 31195718,
	detail3: 31195719,
	itemId: "JKItem-2021-08-03-0001"
}

export interface ParamBusTestBoundStaffSales {
	orderMain: number;
}
export interface ResultBusTestBoundStaffSales {
}

export interface ParamDoneDeliver {
	customer: number;
	contact: number;
	warehouse: number;
}
export interface ResultDoneDeliver {
}

export interface ParamActs {
	promotions?: PromotionsInActs[];
	promotionProducts?: PromotionProductsInActs[];
	promotionSalesman?: PromotionSalesmanInActs[];
	promotionSalesmanRatio?: PromotionSalesmanRatioInActs[];
	exportItemHistory?: ExportItemHistoryInActs[];
	group?: GroupInActs[];
	userRole?: UserRole[];
	meUser?: ActParamMeUser[];
	roleOps?: RoleOps[];
}


export interface UqExt extends Uq {
	Acts(param:ParamActs): Promise<any>;
	SQL: Uq;
    Role: { [key: string]: string[] };

	$role_My: UqQuery<Param$role_My, Result$role_My>;
	$role_Unit_Users: UqQuery<Param$role_Unit_Users, Result$role_Unit_Users>;
	$role_Unit_Add_Admin: UqAction<Param$role_Unit_Add_Admin, Result$role_Unit_Add_Admin>;
	$role_Unit_Del_Admin: UqAction<Param$role_Unit_Del_Admin, Result$role_Unit_Del_Admin>;
	$role_Unit_Add_User: UqAction<Param$role_Unit_Add_User, Result$role_Unit_Add_User>;
	$role_Unit_User_Role: UqAction<Param$role_Unit_User_Role, Result$role_Unit_User_Role>;
	$role_Unit_Quit_Owner: UqAction<Param$role_Unit_Quit_Owner, Result$role_Unit_Quit_Owner>;
	$poked: UqQuery<Param$poked, Result$poked>;
	$setMyTimezone: UqAction<Param$setMyTimezone, Result$setMyTimezone>;
	$getUnitTime: UqQuery<Param$getUnitTime, Result$getUnitTime>;
	GetItemTitles: UqQuery<ParamGetItemTitles, ResultGetItemTitles>;
	GetPostTitles: UqQuery<ParamGetPostTitles, ResultGetPostTitles>;
	GetAccountTitles: UqQuery<ParamGetAccountTitles, ResultGetAccountTitles>;
	Promotions: UqID<any>;
	PromotionProducts: UqID<any>;
	PromotionSalesman: UqID<any>;
	PromotionSalesmanRatio: UqID<any>;
	UserObjectPostItem: UqQuery<ParamUserObjectPostItem, ResultUserObjectPostItem>;
	GetObjectPostItem: UqQuery<ParamGetObjectPostItem, ResultGetObjectPostItem>;
	GetUserObjectAccount: UqQuery<ParamGetUserObjectAccount, ResultGetUserObjectAccount>;
	GetUserObjectItemPeriodSum: UqQuery<ParamGetUserObjectItemPeriodSum, ResultGetUserObjectItemPeriodSum>;
	GetCouponFeeRadio: UqQuery<ParamGetCouponFeeRadio, ResultGetCouponFeeRadio>;
	GetObjectItemPeriodSum: UqQuery<ParamGetObjectItemPeriodSum, ResultGetObjectItemPeriodSum>;
	GetObjectItemHistory: UqQuery<ParamGetObjectItemHistory, ResultGetObjectItemHistory>;
	GetSheetOpiHistory: UqQuery<ParamGetSheetOpiHistory, ResultGetSheetOpiHistory>;
	GetObjectItemPeriodHistory: UqQuery<ParamGetObjectItemPeriodHistory, ResultGetObjectItemPeriodHistory>;
	GetObjectAccountHistory: UqQuery<ParamGetObjectAccountHistory, ResultGetObjectAccountHistory>;
	GetSuperviseObjects: UqQuery<ParamGetSuperviseObjects, ResultGetSuperviseObjects>;
	GetObjects: UqQuery<ParamGetObjects, ResultGetObjects>;
	GetDistributors: UqQuery<ParamGetDistributors, ResultGetDistributors>;
	GetAgents: UqQuery<ParamGetAgents, ResultGetAgents>;
	GetStaffs: UqQuery<ParamGetStaffs, ResultGetStaffs>;
	GetPosts: UqQuery<ParamGetPosts, ResultGetPosts>;
	GetUserSuperviseItem: UqQuery<ParamGetUserSuperviseItem, ResultGetUserSuperviseItem>;
	GetItemPeriodSum: UqQuery<ParamGetItemPeriodSum, ResultGetItemPeriodSum>;
	GetItemSumDays: UqQuery<ParamGetItemSumDays, ResultGetItemSumDays>;
	GetItemSumMonths: UqQuery<ParamGetItemSumMonths, ResultGetItemSumMonths>;
	GetItemHistory: UqQuery<ParamGetItemHistory, ResultGetItemHistory>;
	GetAccounts: UqQuery<ParamGetAccounts, ResultGetAccounts>;
	ExportItemHistory: UqID<any>;
	Group: UqID<any>;
	GetGroups: UqQuery<ParamGetGroups, ResultGetGroups>;
	GetGroupObjects: UqQuery<ParamGetGroupObjects, ResultGetGroupObjects>;
	UserRole: UqIX<any>;
	MeUser: UqIDX<any>;
	RoleOps: UqIX<any>;
	GetRoleOps: UqQuery<ParamGetRoleOps, ResultGetRoleOps>;
	GetMonthSumProduct: UqQuery<ParamGetMonthSumProduct, ResultGetMonthSumProduct>;
	GetProductSumByMonth: UqQuery<ParamGetProductSumByMonth, ResultGetProductSumByMonth>;
	GetMonthSumCustomer: UqQuery<ParamGetMonthSumCustomer, ResultGetMonthSumCustomer>;
	GetCustomerSumByMonth: UqQuery<ParamGetCustomerSumByMonth, ResultGetCustomerSumByMonth>;
	BusTestBoundStaffSales: UqAction<ParamBusTestBoundStaffSales, ResultBusTestBoundStaffSales>;
	DoneDeliver: UqAction<ParamDoneDeliver, ResultDoneDeliver>;
}


export const uqSchema={
    "$role_my": {
        "name": "$role_my",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [] as any,
        "returns": [
            {
                "name": "admins",
                "fields": [
                    {
                        "name": "id",
                        "type": "id"
                    },
                    {
                        "name": "unit",
                        "type": "id"
                    },
                    {
                        "name": "admin",
                        "type": "tinyint"
                    },
                    {
                        "name": "entity",
                        "type": "char",
                        "size": 100
                    },
                    {
                        "name": "assigned",
                        "type": "char",
                        "size": 100
                    }
                ]
            },
            {
                "name": "roles",
                "fields": [
                    {
                        "name": "unit",
                        "type": "id"
                    },
                    {
                        "name": "role",
                        "type": "char",
                        "size": 100
                    }
                ]
            },
            {
                "name": "unitProps",
                "fields": [
                    {
                        "name": "unit",
                        "type": "id"
                    },
                    {
                        "name": "props",
                        "type": "text"
                    }
                ]
            }
        ]
    },
    "$role_unit_users": {
        "name": "$role_unit_users",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "unit",
                "type": "bigint"
            }
        ],
        "returns": [
            {
                "name": "users",
                "fields": [
                    {
                        "name": "id",
                        "type": "id"
                    },
                    {
                        "name": "user",
                        "type": "id"
                    },
                    {
                        "name": "admin",
                        "type": "tinyint"
                    },
                    {
                        "name": "assigned",
                        "type": "char",
                        "size": 100
                    },
                    {
                        "name": "name",
                        "type": "char",
                        "size": 100
                    },
                    {
                        "name": "nick",
                        "type": "char",
                        "size": 100
                    },
                    {
                        "name": "icon",
                        "type": "char",
                        "size": 200
                    },
                    {
                        "name": "addBy",
                        "type": "id"
                    }
                ]
            },
            {
                "name": "roles",
                "fields": [
                    {
                        "name": "user",
                        "type": "id"
                    },
                    {
                        "name": "role",
                        "type": "char",
                        "size": 100
                    }
                ]
            }
        ]
    },
    "$role_unit_add_admin": {
        "name": "$role_unit_add_admin",
        "type": "action",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "unit",
                "type": "bigint"
            },
            {
                "name": "user",
                "type": "bigint"
            },
            {
                "name": "admin",
                "type": "tinyint"
            },
            {
                "name": "assigned",
                "type": "char",
                "size": 100
            }
        ],
        "returns": [] as any
    },
    "$role_unit_del_admin": {
        "name": "$role_unit_del_admin",
        "type": "action",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "unit",
                "type": "bigint"
            },
            {
                "name": "user",
                "type": "bigint"
            },
            {
                "name": "admin",
                "type": "tinyint"
            }
        ],
        "returns": [] as any
    },
    "$role_unit_add_user": {
        "name": "$role_unit_add_user",
        "type": "action",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "unit",
                "type": "bigint"
            },
            {
                "name": "user",
                "type": "bigint"
            },
            {
                "name": "assigned",
                "type": "char",
                "size": 100
            }
        ],
        "returns": [] as any
    },
    "$role_unit_user_role": {
        "name": "$role_unit_user_role",
        "type": "action",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "unit",
                "type": "bigint"
            },
            {
                "name": "user",
                "type": "bigint"
            },
            {
                "name": "action",
                "type": "char",
                "size": 100
            },
            {
                "name": "role",
                "type": "char",
                "size": 100
            }
        ],
        "returns": [] as any
    },
    "$role_unit_quit_owner": {
        "name": "$role_unit_quit_owner",
        "type": "action",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "unit",
                "type": "bigint"
            }
        ],
        "returns": [] as any
    },
    "$poked": {
        "name": "$poked",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [] as any,
        "returns": [
            {
                "name": "ret",
                "fields": [
                    {
                        "name": "poke",
                        "type": "tinyint"
                    }
                ]
            }
        ]
    },
    "$setmytimezone": {
        "name": "$setMyTimezone",
        "type": "action",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "_timezone",
                "type": "tinyint"
            }
        ],
        "returns": [] as any
    },
    "$getunittime": {
        "name": "$getUnitTime",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [] as any,
        "returns": [
            {
                "name": "ret",
                "fields": [
                    {
                        "name": "timezone",
                        "type": "tinyint"
                    },
                    {
                        "name": "unitTimeZone",
                        "type": "tinyint"
                    },
                    {
                        "name": "unitBizMonth",
                        "type": "tinyint"
                    },
                    {
                        "name": "unitBizDate",
                        "type": "tinyint"
                    }
                ]
            }
        ]
    },
    "item": {
        "name": "Item",
        "type": "enum",
        "private": false,
        "sys": true,
        "values": {
            "orderDeliver": 1010,
            "orderAmount": 1011,
            "orderProfit": 1012,
            "orderFee": 1013,
            "orderSaleTransferIn": 1014,
            "orderFactoryTransferIn": 1015,
            "orderSaleTransferOut": 1016,
            "orderFactoryTransferOut": 1017,
            "orderReturn": 1020,
            "orderReceive": 1030,
            "receiveSaleTransferOut": 1036,
            "receiveFactoryTransferOut": 1037,
            "orderReceiveReturn": 1040,
            "returnPoint": 1041,
            "profitFee": 1110,
            "couponFee": 1111,
            "couponCoSalesFee": 1113,
            "returnPointFee": 1112,
            "amountFee": 1120,
            "supervisorFee": 1210,
            "customerPoint": 2010,
            "pickupPoint": 3010,
            "cashOut": 5010,
            "cashAdjust": 5011
        }
    },
    "post": {
        "name": "Post",
        "type": "enum",
        "private": false,
        "sys": true,
        "values": {
            "sys": 0,
            "staff": 1010,
            "staffSales": 1100,
            "topSales": 1101,
            "staffSupervisor": 1102,
            "staffCoSales": 1103,
            "manager": 2010,
            "managerIT": 2100,
            "saleBranch": 3000,
            "factoryBranch": 3001,
            "sellerBranch": 3002,
            "agent": 7010,
            "agentSales": 7100,
            "distributor": 7500,
            "distributorSales": 7501,
            "customer": 8010
        }
    },
    "enumbizoptype": {
        "name": "EnumBizOpType",
        "type": "enum",
        "private": false,
        "sys": true,
        "values": {
            "booking": 0,
            "orderDeliverDone": 101,
            "orderReceiveDone": 102,
            "orderReturn": 103,
            "pickupDone": 104,
            "salaryPaid": 105,
            "returnPointDone": 106,
            "salaryAdjust": 107
        }
    },
    "orderready": {
        "name": "OrderReady",
        "type": "enum",
        "private": false,
        "sys": true,
        "values": {
            "sheet": 1,
            "margin": 4
        }
    },
    "enumcurrency": {
        "name": "EnumCurrency",
        "type": "enum",
        "private": false,
        "sys": true,
        "values": {
            "BASE": 5,
            "GBP": 2,
            "HKD": 3,
            "JPY": 4,
            "RMB": 5,
            "AUD": 6,
            "CAD": 7,
            "CHF": 8,
            "EUR": 9,
            "USD": 10
        }
    },
    "getitemtitles": {
        "name": "GetItemTitles",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [] as any,
        "returns": [
            {
                "name": "ret",
                "fields": [
                    {
                        "name": "id",
                        "type": "id",
                        "null": false
                    },
                    {
                        "name": "title",
                        "type": "char",
                        "size": 50
                    },
                    {
                        "name": "vice",
                        "type": "char",
                        "size": 100
                    },
                    {
                        "name": "unit",
                        "type": "char",
                        "size": 10
                    },
                    {
                        "name": "fixed",
                        "type": "tinyint"
                    }
                ]
            }
        ]
    },
    "getposttitles": {
        "name": "GetPostTitles",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [] as any,
        "returns": [
            {
                "name": "ret",
                "fields": [
                    {
                        "name": "id",
                        "type": "id",
                        "null": false
                    },
                    {
                        "name": "title",
                        "type": "char",
                        "size": 50
                    },
                    {
                        "name": "vice",
                        "type": "char",
                        "size": 100
                    }
                ]
            }
        ]
    },
    "getaccounttitles": {
        "name": "GetAccountTitles",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [] as any,
        "returns": [
            {
                "name": "ret",
                "fields": [
                    {
                        "name": "id",
                        "type": "id",
                        "null": false
                    },
                    {
                        "name": "title",
                        "type": "char",
                        "size": 50
                    },
                    {
                        "name": "vice",
                        "type": "char",
                        "size": 100
                    },
                    {
                        "name": "unit",
                        "type": "char",
                        "size": 10
                    },
                    {
                        "name": "fixed",
                        "type": "tinyint"
                    }
                ]
            }
        ]
    },
    "promotions": {
        "name": "Promotions",
        "type": "id",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "id",
                "type": "id",
                "null": false
            },
            {
                "name": "name",
                "type": "char",
                "size": 100
            },
            {
                "name": "description",
                "type": "char",
                "size": 500
            },
            {
                "name": "start",
                "type": "date"
            },
            {
                "name": "end",
                "type": "date"
            },
            {
                "name": "isValid",
                "type": "tinyint"
            },
            {
                "name": "creator",
                "type": "id"
            },
            {
                "name": "createDate",
                "type": "datetime"
            }
        ],
        "keys": [] as any,
        "nameNoVice": [
            "name"
        ],
        "global": false,
        "idType": 12,
        "isMinute": false
    },
    "promotionproducts": {
        "name": "PromotionProducts",
        "type": "id",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "id",
                "type": "id",
                "null": false
            },
            {
                "name": "main",
                "type": "id",
                "ID": "promotions",
                "tuid": "promotions"
            },
            {
                "name": "product",
                "type": "id"
            }
        ],
        "keys": [] as any,
        "global": false,
        "idType": 12,
        "isMinute": false
    },
    "promotionsalesman": {
        "name": "PromotionSalesman",
        "type": "id",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "id",
                "type": "id",
                "null": false
            },
            {
                "name": "main",
                "type": "id",
                "ID": "promotions",
                "tuid": "promotions"
            },
            {
                "name": "salesman",
                "type": "id"
            }
        ],
        "keys": [] as any,
        "global": false,
        "idType": 12,
        "isMinute": false
    },
    "promotionsalesmanratio": {
        "name": "PromotionSalesmanRatio",
        "type": "id",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "id",
                "type": "id",
                "null": false
            },
            {
                "name": "promotionSalesman",
                "type": "id"
            },
            {
                "name": "bizOpType",
                "type": "enum"
            },
            {
                "name": "post",
                "type": "enum"
            },
            {
                "name": "item",
                "type": "enum"
            },
            {
                "name": "ratio",
                "type": "dec",
                "scale": 2,
                "precision": 6
            }
        ],
        "keys": [
            {
                "name": "promotionSalesman",
                "type": "id"
            },
            {
                "name": "bizOpType",
                "type": "enum"
            },
            {
                "name": "post",
                "type": "enum"
            },
            {
                "name": "item",
                "type": "enum"
            }
        ],
        "global": false,
        "idType": 12,
        "isMinute": false
    },
    "procsetbizbooking": {
        "name": "ProcSetBizBooking",
        "type": "proc",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "biz",
                "type": "id"
            },
            {
                "name": "bizOpType",
                "type": "enum"
            },
            {
                "name": "stamp",
                "type": "int"
            }
        ],
        "returns": [] as any
    },
    "maxactionrows": {
        "name": "maxActionRows",
        "type": "const",
        "private": false,
        "sys": true,
        "fields": [] as any,
        "values": {}
    },
    "procqueuebizmain": {
        "name": "ProcQueueBizMain",
        "type": "proc",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "bizMain",
                "type": "id"
            }
        ],
        "returns": [] as any
    },
    "enumobjecttype": {
        "name": "EnumObjectType",
        "type": "enum",
        "private": false,
        "sys": true,
        "values": {
            "none": 0,
            "user": 1,
            "customer": 2,
            "staff": 3,
            "agent": 4,
            "distributor": 5,
            "post": 6,
            "branch": 7
        }
    },
    "enumaccount": {
        "name": "EnumAccount",
        "type": "enum",
        "private": false,
        "sys": true,
        "values": {
            "commission": 10,
            "supervisor": 11
        }
    },
    "userobjectpostitem": {
        "name": "UserObjectPostItem",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [] as any,
        "returns": [
            {
                "name": "ret",
                "fields": [
                    {
                        "name": "id",
                        "type": "id"
                    },
                    {
                        "name": "object",
                        "type": "id"
                    },
                    {
                        "name": "post",
                        "type": "enum"
                    },
                    {
                        "name": "item",
                        "type": "enum"
                    }
                ]
            }
        ]
    },
    "getobjectpostitem": {
        "name": "GetObjectPostItem",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "object",
                "type": "id"
            }
        ],
        "returns": [
            {
                "name": "ret",
                "fields": [
                    {
                        "name": "id",
                        "type": "id"
                    },
                    {
                        "name": "object",
                        "type": "id"
                    },
                    {
                        "name": "post",
                        "type": "enum"
                    },
                    {
                        "name": "item",
                        "type": "enum"
                    }
                ]
            }
        ]
    },
    "getuserobjectaccount": {
        "name": "GetUserObjectAccount",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "object",
                "type": "id"
            }
        ],
        "proxy": "proxycheck",
        "returns": [
            {
                "name": "ret",
                "fields": [
                    {
                        "name": "objectAccount",
                        "type": "id"
                    },
                    {
                        "name": "object",
                        "type": "id"
                    },
                    {
                        "name": "post",
                        "type": "enum"
                    },
                    {
                        "name": "account",
                        "type": "enum"
                    },
                    {
                        "name": "balance",
                        "type": "dec",
                        "scale": 4,
                        "precision": 18
                    }
                ]
            }
        ]
    },
    "getuserobjectitemperiodsum": {
        "name": "GetUserObjectItemPeriodSum",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "from",
                "type": "date"
            },
            {
                "name": "to",
                "type": "date"
            }
        ],
        "returns": [
            {
                "name": "ret",
                "fields": [
                    {
                        "name": "id",
                        "type": "id"
                    },
                    {
                        "name": "object",
                        "type": "id"
                    },
                    {
                        "name": "post",
                        "type": "enum"
                    },
                    {
                        "name": "item",
                        "type": "enum"
                    },
                    {
                        "name": "value",
                        "type": "dec",
                        "scale": 4,
                        "precision": 18
                    }
                ]
            }
        ]
    },
    "getcouponfeeradio": {
        "name": "GetCouponFeeRadio",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "from",
                "type": "date"
            },
            {
                "name": "to",
                "type": "date"
            }
        ],
        "returns": [
            {
                "name": "ret",
                "fields": [
                    {
                        "name": "employee",
                        "type": "id"
                    },
                    {
                        "name": "radio",
                        "type": "dec",
                        "scale": 4,
                        "precision": 18
                    }
                ]
            }
        ]
    },
    "getobjectitemperiodsum": {
        "name": "GetObjectItemPeriodSum",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "object",
                "type": "id",
                "ID": "object",
                "tuid": "object"
            },
            {
                "name": "from",
                "type": "date"
            },
            {
                "name": "to",
                "type": "date"
            }
        ],
        "auth": "authcheck",
        "returns": [
            {
                "name": "ret",
                "fields": [
                    {
                        "name": "id",
                        "type": "id"
                    },
                    {
                        "name": "object",
                        "type": "id"
                    },
                    {
                        "name": "post",
                        "type": "enum"
                    },
                    {
                        "name": "item",
                        "type": "enum"
                    },
                    {
                        "name": "value",
                        "type": "dec",
                        "scale": 4,
                        "precision": 18
                    }
                ]
            }
        ]
    },
    "getobjectitemhistory": {
        "name": "GetObjectItemHistory",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "objectPostItem",
                "type": "id",
                "ID": "objectpostitem",
                "tuid": "objectpostitem"
            },
            {
                "name": "from",
                "type": "date"
            },
            {
                "name": "to",
                "type": "date"
            }
        ],
        "auth": "authcheck",
        "returns": [
            {
                "name": "ret",
                "fields": [
                    {
                        "name": "id",
                        "type": "id"
                    },
                    {
                        "name": "biz",
                        "type": "id"
                    },
                    {
                        "name": "bizMainNo",
                        "type": "char",
                        "size": 50
                    },
                    {
                        "name": "bizOp",
                        "type": "id"
                    },
                    {
                        "name": "value",
                        "type": "dec",
                        "scale": 4,
                        "precision": 18
                    },
                    {
                        "name": "memo",
                        "type": "char",
                        "size": 200
                    }
                ]
            }
        ]
    },
    "getsheetopihistory": {
        "name": "GetSheetOpiHistory",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "bizMain",
                "type": "id"
            },
            {
                "name": "objectPostItem",
                "type": "id",
                "ID": "objectpostitem",
                "tuid": "objectpostitem"
            }
        ],
        "auth": "authcheck",
        "returns": [
            {
                "name": "ret",
                "fields": [
                    {
                        "name": "id",
                        "type": "id"
                    },
                    {
                        "name": "biz",
                        "type": "id"
                    },
                    {
                        "name": "bizMainNo",
                        "type": "char",
                        "size": 50
                    },
                    {
                        "name": "bizOp",
                        "type": "id"
                    },
                    {
                        "name": "value",
                        "type": "dec",
                        "scale": 4,
                        "precision": 18
                    },
                    {
                        "name": "memo",
                        "type": "char",
                        "size": 200
                    }
                ]
            }
        ]
    },
    "getobjectitemperiodhistory": {
        "name": "GetObjectItemPeriodHistory",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "objectPostItem",
                "type": "id",
                "ID": "objectpostitem",
                "tuid": "objectpostitem"
            },
            {
                "name": "from",
                "type": "date"
            },
            {
                "name": "to",
                "type": "date"
            },
            {
                "name": "period",
                "type": "tinyint"
            }
        ],
        "auth": "authcheck",
        "returns": [
            {
                "name": "ret",
                "fields": [
                    {
                        "name": "date",
                        "type": "date"
                    },
                    {
                        "name": "value",
                        "type": "dec",
                        "scale": 4,
                        "precision": 18
                    }
                ]
            }
        ]
    },
    "proxycheck": {
        "name": "ProxyCheck",
        "type": "sysproc",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "proxy",
                "type": "id"
            },
            {
                "name": "ok",
                "type": "tinyint"
            }
        ],
        "returns": [] as any
    },
    "authcheck": {
        "name": "AuthCheck",
        "type": "sysproc",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "ok",
                "type": "tinyint"
            }
        ],
        "returns": [] as any
    },
    "getobjectaccounthistory": {
        "name": "GetObjectAccountHistory",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "objectAccount",
                "type": "id"
            }
        ],
        "returns": [
            {
                "name": "ret",
                "fields": [
                    {
                        "name": "date",
                        "type": "date"
                    },
                    {
                        "name": "value",
                        "type": "dec",
                        "scale": 4,
                        "precision": 18
                    },
                    {
                        "name": "post",
                        "type": "enum"
                    },
                    {
                        "name": "item",
                        "type": "enum"
                    }
                ]
            }
        ]
    },
    "getsuperviseobjects": {
        "name": "GetSuperviseObjects",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "from",
                "type": "date"
            },
            {
                "name": "to",
                "type": "date"
            }
        ],
        "returns": [
            {
                "name": "ret",
                "fields": [
                    {
                        "name": "opi",
                        "type": "id"
                    },
                    {
                        "name": "object",
                        "type": "id"
                    },
                    {
                        "name": "post",
                        "type": "enum"
                    },
                    {
                        "name": "item",
                        "type": "enum"
                    },
                    {
                        "name": "staff",
                        "type": "id"
                    },
                    {
                        "name": "value",
                        "type": "dec",
                        "scale": 4,
                        "precision": 18
                    },
                    {
                        "name": "ratioValue",
                        "type": "dec",
                        "scale": 4,
                        "precision": 18
                    }
                ]
            }
        ]
    },
    "getobjects": {
        "name": "GetObjects",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [] as any,
        "returns": [
            {
                "name": "ret",
                "fields": [
                    {
                        "name": "id",
                        "type": "id"
                    },
                    {
                        "name": "type",
                        "type": "enum"
                    }
                ]
            }
        ]
    },
    "getdistributors": {
        "name": "GetDistributors",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [] as any,
        "returns": [
            {
                "name": "ret",
                "fields": [
                    {
                        "name": "id",
                        "type": "id"
                    },
                    {
                        "name": "distributor",
                        "type": "id"
                    }
                ]
            }
        ]
    },
    "getagents": {
        "name": "GetAgents",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [] as any,
        "returns": [
            {
                "name": "ret",
                "fields": [
                    {
                        "name": "id",
                        "type": "id"
                    },
                    {
                        "name": "agent",
                        "type": "id"
                    }
                ]
            }
        ]
    },
    "getstaffs": {
        "name": "GetStaffs",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [] as any,
        "returns": [
            {
                "name": "ret",
                "fields": [
                    {
                        "name": "opi",
                        "type": "id"
                    },
                    {
                        "name": "item",
                        "type": "enum"
                    },
                    {
                        "name": "obj",
                        "type": "id"
                    },
                    {
                        "name": "staff",
                        "type": "id"
                    },
                    {
                        "name": "valueToday",
                        "type": "dec",
                        "scale": 4,
                        "precision": 18
                    },
                    {
                        "name": "valueThisMonth",
                        "type": "dec",
                        "scale": 4,
                        "precision": 18
                    },
                    {
                        "name": "valueLastMonth",
                        "type": "dec",
                        "scale": 4,
                        "precision": 18
                    }
                ]
            }
        ]
    },
    "getposts": {
        "name": "GetPosts",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [] as any,
        "returns": [
            {
                "name": "ret",
                "fields": [
                    {
                        "name": "opi",
                        "type": "id"
                    },
                    {
                        "name": "obj",
                        "type": "id"
                    },
                    {
                        "name": "post",
                        "type": "enum"
                    },
                    {
                        "name": "item",
                        "type": "enum"
                    },
                    {
                        "name": "amountThisMonth",
                        "type": "dec",
                        "scale": 4,
                        "precision": 18
                    },
                    {
                        "name": "amountLastMonth",
                        "type": "dec",
                        "scale": 4,
                        "precision": 18
                    }
                ]
            }
        ]
    },
    "getusersuperviseitem": {
        "name": "GetUserSuperviseItem",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [] as any,
        "returns": [
            {
                "name": "ret",
                "fields": [
                    {
                        "name": "item",
                        "type": "enum"
                    }
                ]
            }
        ]
    },
    "getitemperiodsum": {
        "name": "GetItemPeriodSum",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "date",
                "type": "date"
            },
            {
                "name": "days",
                "type": "int"
            }
        ],
        "returns": [
            {
                "name": "ret",
                "fields": [
                    {
                        "name": "item",
                        "type": "enum"
                    },
                    {
                        "name": "opi",
                        "type": "id",
                        "ID": "objectpostitem",
                        "tuid": "objectpostitem"
                    },
                    {
                        "name": "value",
                        "type": "dec",
                        "scale": 4,
                        "precision": 18
                    }
                ]
            }
        ]
    },
    "getitemsumdays": {
        "name": "GetItemSumDays",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "item",
                "type": "enum"
            },
            {
                "name": "date",
                "type": "date"
            },
            {
                "name": "days",
                "type": "int"
            }
        ],
        "returns": [
            {
                "name": "ret",
                "fields": [
                    {
                        "name": "date",
                        "type": "date"
                    },
                    {
                        "name": "value",
                        "type": "dec",
                        "scale": 4,
                        "precision": 18
                    }
                ]
            }
        ]
    },
    "getitemsummonths": {
        "name": "GetItemSumMonths",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "item",
                "type": "enum"
            },
            {
                "name": "date",
                "type": "date"
            },
            {
                "name": "months",
                "type": "int"
            }
        ],
        "returns": [
            {
                "name": "ret",
                "fields": [
                    {
                        "name": "date",
                        "type": "date"
                    },
                    {
                        "name": "value",
                        "type": "dec",
                        "scale": 4,
                        "precision": 18
                    }
                ]
            }
        ]
    },
    "getitemhistory": {
        "name": "GetItemHistory",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "item",
                "type": "enum"
            },
            {
                "name": "from",
                "type": "date"
            },
            {
                "name": "to",
                "type": "date"
            }
        ],
        "returns": [
            {
                "name": "$page",
                "fields": [
                    {
                        "name": "id",
                        "type": "id"
                    },
                    {
                        "name": "biz",
                        "type": "id"
                    },
                    {
                        "name": "bizMainNo",
                        "type": "char",
                        "size": 50
                    },
                    {
                        "name": "bizOp",
                        "type": "id"
                    },
                    {
                        "name": "item",
                        "type": "enum"
                    },
                    {
                        "name": "value",
                        "type": "dec",
                        "scale": 4,
                        "precision": 18
                    },
                    {
                        "name": "memo",
                        "type": "char",
                        "size": 100
                    }
                ],
                "order": "desc"
            }
        ]
    },
    "getaccounts": {
        "name": "GetAccounts",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [] as any,
        "returns": [
            {
                "name": "ret",
                "fields": [
                    {
                        "name": "id",
                        "type": "id"
                    },
                    {
                        "name": "object",
                        "type": "id"
                    },
                    {
                        "name": "account",
                        "type": "enum"
                    },
                    {
                        "name": "balance",
                        "type": "dec",
                        "scale": 4,
                        "precision": 18
                    },
                    {
                        "name": "objectType",
                        "type": "enum"
                    },
                    {
                        "name": "objectTo",
                        "type": "id"
                    }
                ]
            }
        ]
    },
    "sumitemhistory": {
        "name": "SumItemHistory",
        "type": "proc",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "itemHistoryId",
                "type": "id"
            }
        ],
        "returns": [] as any
    },
    "calcdateitemhistorygroup": {
        "name": "CalcDateItemHistoryGroup",
        "type": "proc",
        "private": false,
        "sys": true,
        "fields": [] as any,
        "returns": [] as any
    },
    "calcdateopihistorygroup": {
        "name": "CalcDateOpiHistoryGroup",
        "type": "proc",
        "private": false,
        "sys": true,
        "fields": [] as any,
        "returns": [] as any
    },
    "exportitemhistory": {
        "name": "ExportItemHistory",
        "type": "id",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "id",
                "type": "id",
                "null": false
            },
            {
                "name": "itemHistoryId",
                "type": "id",
                "ID": "itemhistory",
                "tuid": "itemhistory"
            }
        ],
        "keys": [] as any,
        "create": true,
        "global": false,
        "idType": 12,
        "isMinute": false
    },
    "group": {
        "name": "Group",
        "type": "id",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "id",
                "type": "id",
                "null": false
            },
            {
                "name": "name",
                "type": "char",
                "size": 50
            }
        ],
        "keys": [
            {
                "name": "name",
                "type": "char",
                "size": 50
            }
        ],
        "nameNoVice": [
            "name"
        ],
        "global": false,
        "idType": 3,
        "isMinute": false
    },
    "getgroups": {
        "name": "GetGroups",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [] as any,
        "returns": [
            {
                "name": "ret",
                "fields": [
                    {
                        "name": "id",
                        "type": "id"
                    },
                    {
                        "name": "name",
                        "type": "char",
                        "size": 50
                    }
                ]
            }
        ]
    },
    "getgroupobjects": {
        "name": "GetGroupObjects",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "group",
                "type": "id"
            }
        ],
        "returns": [
            {
                "name": "ret",
                "fields": [
                    {
                        "name": "id",
                        "type": "id"
                    },
                    {
                        "name": "type",
                        "type": "enum"
                    }
                ]
            }
        ]
    },
    "const_sleep_time": {
        "name": "Const_Sleep_Time",
        "type": "const",
        "private": false,
        "sys": true,
        "fields": [] as any,
        "values": {}
    },
    "enumrole": {
        "name": "EnumRole",
        "type": "enum",
        "private": false,
        "sys": true,
        "values": {
            "all": 1,
            "dev": 2,
            "mainUser": 3,
            "promotionAdmin": 4
        }
    },
    "enumroleop": {
        "name": "EnumRoleOp",
        "type": "enum",
        "private": false,
        "sys": true,
        "values": {
            "test": 1
        }
    },
    "userrole": {
        "name": "UserRole",
        "type": "ix",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "ix",
                "type": "id",
                "ID": "$user",
                "tuid": "$user"
            },
            {
                "name": "xi",
                "type": "id",
                "ID": "$local",
                "tuid": "$local"
            }
        ],
        "ixxx": false,
        "ixx": false,
        "hasSort": false,
        "xiType": 12
    },
    "meuser": {
        "name": "MeUser",
        "type": "idx",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "id",
                "type": "id"
            },
            {
                "name": "name",
                "type": "char",
                "size": 50
            }
        ],
        "update": true
    },
    "roleops": {
        "name": "RoleOps",
        "type": "ix",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "ix",
                "type": "id"
            },
            {
                "name": "xi",
                "type": "id"
            }
        ],
        "ixxx": false,
        "ixx": false,
        "hasSort": false,
        "xiType": 0
    },
    "getroleops": {
        "name": "GetRoleOps",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [] as any,
        "returns": [
            {
                "name": "ret",
                "fields": [
                    {
                        "name": "role",
                        "type": "enum"
                    },
                    {
                        "name": "op",
                        "type": "enum"
                    }
                ]
            }
        ]
    },
    "ordertype": {
        "name": "OrderType",
        "type": "enum",
        "private": false,
        "sys": true,
        "values": {
            "Customer": 1,
            "Distributor": 11,
            "SaleBranch": 21,
            "FactoryBranch": 22
        }
    },
    "getmonthsumproduct": {
        "name": "GetMonthSumProduct",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "item",
                "type": "enum"
            },
            {
                "name": "id",
                "type": "id"
            }
        ],
        "returns": [
            {
                "name": "$page",
                "fields": [
                    {
                        "name": "month",
                        "type": "int"
                    },
                    {
                        "name": "value",
                        "type": "dec",
                        "scale": 4,
                        "precision": 18
                    },
                    {
                        "name": "amount",
                        "type": "dec",
                        "scale": 4,
                        "precision": 18
                    },
                    {
                        "name": "profit",
                        "type": "dec",
                        "scale": 4,
                        "precision": 18
                    },
                    {
                        "name": "receive",
                        "type": "dec",
                        "scale": 4,
                        "precision": 18
                    },
                    {
                        "name": "return",
                        "type": "dec",
                        "scale": 4,
                        "precision": 18
                    }
                ],
                "order": "desc"
            }
        ]
    },
    "getproductsumbymonth": {
        "name": "GetProductSumByMonth",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "item",
                "type": "enum"
            },
            {
                "name": "month",
                "type": "int"
            },
            {
                "name": "count",
                "type": "int"
            }
        ],
        "returns": [
            {
                "name": "ret",
                "fields": [
                    {
                        "name": "id",
                        "type": "id"
                    },
                    {
                        "name": "value",
                        "type": "dec",
                        "scale": 4,
                        "precision": 18
                    },
                    {
                        "name": "amount",
                        "type": "dec",
                        "scale": 4,
                        "precision": 18
                    },
                    {
                        "name": "profit",
                        "type": "dec",
                        "scale": 4,
                        "precision": 18
                    },
                    {
                        "name": "receive",
                        "type": "dec",
                        "scale": 4,
                        "precision": 18
                    },
                    {
                        "name": "return",
                        "type": "dec",
                        "scale": 4,
                        "precision": 18
                    }
                ]
            }
        ]
    },
    "getmonthsumcustomer": {
        "name": "GetMonthSumCustomer",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "item",
                "type": "enum"
            },
            {
                "name": "id",
                "type": "id"
            }
        ],
        "returns": [
            {
                "name": "$page",
                "fields": [
                    {
                        "name": "month",
                        "type": "int"
                    },
                    {
                        "name": "value",
                        "type": "dec",
                        "scale": 4,
                        "precision": 18
                    },
                    {
                        "name": "amount",
                        "type": "dec",
                        "scale": 4,
                        "precision": 18
                    },
                    {
                        "name": "profit",
                        "type": "dec",
                        "scale": 4,
                        "precision": 18
                    },
                    {
                        "name": "receive",
                        "type": "dec",
                        "scale": 4,
                        "precision": 18
                    },
                    {
                        "name": "return",
                        "type": "dec",
                        "scale": 4,
                        "precision": 18
                    }
                ],
                "order": "desc"
            }
        ]
    },
    "getcustomersumbymonth": {
        "name": "GetCustomerSumByMonth",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "item",
                "type": "enum"
            },
            {
                "name": "month",
                "type": "int"
            },
            {
                "name": "count",
                "type": "int"
            }
        ],
        "returns": [
            {
                "name": "ret",
                "fields": [
                    {
                        "name": "id",
                        "type": "id"
                    },
                    {
                        "name": "value",
                        "type": "dec",
                        "scale": 4,
                        "precision": 18
                    },
                    {
                        "name": "amount",
                        "type": "dec",
                        "scale": 4,
                        "precision": 18
                    },
                    {
                        "name": "profit",
                        "type": "dec",
                        "scale": 4,
                        "precision": 18
                    },
                    {
                        "name": "receive",
                        "type": "dec",
                        "scale": 4,
                        "precision": 18
                    },
                    {
                        "name": "return",
                        "type": "dec",
                        "scale": 4,
                        "precision": 18
                    }
                ]
            }
        ]
    },
    "jkordertest": {
        "name": "JkOrderTest",
        "type": "const",
        "private": false,
        "sys": true,
        "fields": [] as any,
        "values": {
            "id": 31195716,
            "detail1": 31195717,
            "detail2": 31195718,
            "detail3": 31195719,
            "itemId": "JKItem-2021-08-03-0001"
        }
    },
    "bustestboundstaffsales": {
        "name": "BusTestBoundStaffSales",
        "type": "action",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "orderMain",
                "type": "id"
            }
        ],
        "returns": [] as any
    },
    "procbustest": {
        "name": "ProcBusTest",
        "type": "proc",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "orderMain",
                "type": "id"
            }
        ],
        "returns": [] as any
    },
    "donedeliver": {
        "name": "DoneDeliver",
        "type": "action",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "customer",
                "type": "id"
            },
            {
                "name": "contact",
                "type": "id"
            },
            {
                "name": "warehouse",
                "type": "id"
            }
        ],
        "arrs": [
            {
                "name": "detail",
                "fields": [
                    {
                        "name": "orderDetail",
                        "type": "id"
                    },
                    {
                        "name": "quantity",
                        "type": "dec",
                        "scale": 4,
                        "precision": 18
                    }
                ]
            }
        ],
        "returns": [] as any
    }
}