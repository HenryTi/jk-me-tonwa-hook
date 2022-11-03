//=== UqApp builder created on Thu Nov 03 2022 11:58:33 GMT-0400 (北美东部夏令时间) ===//
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IDXValue, Uq, UqQuery, UqAction, UqTuid, UqMap, UqID } from "tonwa-uq";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// import { Render, IDXEntity } from "tonwa-react";


//===============================;
//======= UQ 百灵威系统工程部/hr ========;
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

export interface TuidEmployee {
	id?: number;
	name: string;
	no: string;
	firstName: string;
	lastName: string;
	title: string;
	Status: string;
	CreateTime: any;
}





export interface ParamGetWebUser {
	employee: number;
}
export interface ReturnGetWebUserRet {
	webuser: number;
	employee: number;
}
export interface ResultGetWebUser {
	ret: ReturnGetWebUserRet[];
}

export interface ParamAddWebuseEmployee {
	webuser: number;
	employee: number;
}
export interface ResultAddWebuseEmployee {
}

export interface ParamDeleteWebuseEmployee {
	webuser: number;
	employee: number;
}
export interface ResultDeleteWebuseEmployee {
}



export interface ParamSearchEmployee {
	key: string;
}
export interface ReturnSearchEmployee$page {
	id: number;
	no: string;
	name: string;
	firstName: string;
	lastName: string;
	title: string;
	Status: string;
	CreateTime: any;
}
export interface ResultSearchEmployee {
	$page: ReturnSearchEmployee$page[];
}

export interface ParamSearchTeam {
	key: string;
}
export interface ReturnSearchTeam$page {
	id: number;
	webuser: number;
	employee: number;
}
export interface ResultSearchTeam {
	$page: ReturnSearchTeam$page[];
}

export interface TuidCompany {
	id?: number;
	no: string;
	name: string;
}

export interface SalaryPaid extends ID {
	employee: number;
	post: number;
	performance: number;
	operator: number;
	createDate: any;
}

export interface SalaryPaidInActs extends ID {
	ID?: UqID<any>;
	employee: number | ID;
	post: number | ID;
	performance: number;
	operator: number | ID;
	createDate: any;
}

export interface ParamPaySalary {
	employee: number;
	post: number;
	performance: number;
	operator: number;
}
export interface ResultPaySalary {
}

export interface SalaryAdjusted extends ID {
	employee: number;
	post: number;
	performance: number;
	operator: number;
	note: string;
	createDate: any;
}

export interface SalaryAdjustedInActs extends ID {
	ID?: UqID<any>;
	employee: number | ID;
	post: number | ID;
	performance: number;
	operator: number | ID;
	note: string;
	createDate: any;
}

export interface ParamSalaryAdjust {
	employee: number;
	post: number;
	performance: number;
	operator: number;
	note: string;
}
export interface ResultSalaryAdjust {
}

export interface ParamActs {
	salaryPaid?: SalaryPaidInActs[];
	salaryAdjusted?: SalaryAdjustedInActs[];
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
	Employee: UqTuid<TuidEmployee>;
	EmployeeRole: UqMap;
	WebuserEmployee: UqMap;
	GetWebUser: UqQuery<ParamGetWebUser, ResultGetWebUser>;
	AddWebuseEmployee: UqAction<ParamAddWebuseEmployee, ResultAddWebuseEmployee>;
	DeleteWebuseEmployee: UqAction<ParamDeleteWebuseEmployee, ResultDeleteWebuseEmployee>;
	EmployeeRelation: UqMap;
	SearchEmployee: UqQuery<ParamSearchEmployee, ResultSearchEmployee>;
	SearchTeam: UqQuery<ParamSearchTeam, ResultSearchTeam>;
	Company: UqTuid<TuidCompany>;
	SalaryPaid: UqID<any>;
	PaySalary: UqAction<ParamPaySalary, ResultPaySalary>;
	SalaryAdjusted: UqID<any>;
	SalaryAdjust: UqAction<ParamSalaryAdjust, ResultSalaryAdjust>;
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
    "employee": {
        "name": "employee",
        "type": "tuid",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "name",
                "type": "char",
                "null": false,
                "size": 30
            },
            {
                "name": "no",
                "type": "char",
                "null": false,
                "size": 20
            },
            {
                "name": "firstName",
                "type": "char",
                "size": 20
            },
            {
                "name": "lastName",
                "type": "char",
                "size": 20
            },
            {
                "name": "title",
                "type": "char",
                "size": 20
            },
            {
                "name": "Status",
                "type": "char",
                "size": 2
            },
            {
                "name": "CreateTime",
                "type": "datetime"
            }
        ],
        "isOpen": true,
        "global": false,
        "sync": false,
        "id": "id",
        "unique": [
            "no"
        ],
        "search": [
            "name"
        ],
        "main": [
            "name"
        ]
    },
    "role": {
        "name": "Role",
        "type": "tuid",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "no",
                "type": "char",
                "null": false,
                "size": 50
            },
            {
                "name": "name",
                "type": "char",
                "null": false,
                "size": 50
            },
            {
                "name": "note",
                "type": "char",
                "size": 200
            },
            {
                "name": "IsValid",
                "type": "smallint",
                "null": false
            },
            {
                "name": "CreateTime",
                "type": "datetime"
            }
        ],
        "isOpen": true,
        "global": false,
        "sync": false,
        "id": "id",
        "unique": [
            "no"
        ],
        "search": [
            "name"
        ],
        "main": [
            "no",
            "name"
        ]
    },
    "employeerole": {
        "name": "EmployeeRole",
        "type": "map",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "StartTime",
                "type": "datetime"
            },
            {
                "name": "EndTime",
                "type": "datetime"
            }
        ],
        "keys": [
            {
                "name": "employee",
                "type": "id",
                "null": false,
                "ID": "employee",
                "tuid": "employee"
            },
            {
                "name": "role",
                "type": "id",
                "null": false,
                "ID": "role",
                "tuid": "role"
            }
        ],
        "isOpen": true,
        "actions": {
            "add": "$add$",
            "del": "$del$"
        },
        "queries": {
            "all": "$all$",
            "page": "$page$",
            "query": "$query$"
        }
    },
    "webuseremployee": {
        "name": "WebuserEmployee",
        "type": "map",
        "private": false,
        "sys": true,
        "fields": [] as any,
        "keys": [
            {
                "name": "webuser",
                "type": "id",
                "null": false,
                "ID": "$user",
                "tuid": "$user"
            },
            {
                "name": "employee",
                "type": "id",
                "null": false,
                "ID": "employee",
                "tuid": "employee"
            }
        ],
        "isOpen": true,
        "actions": {
            "add": "$add$",
            "del": "$del$"
        },
        "queries": {
            "all": "$all$",
            "page": "$page$",
            "query": "$query$"
        }
    },
    "getwebuser": {
        "name": "getWebUser",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "employee",
                "type": "id",
                "ID": "employee",
                "tuid": "employee"
            }
        ],
        "returns": [
            {
                "name": "ret",
                "fields": [
                    {
                        "name": "webuser",
                        "type": "id",
                        "ID": "$user",
                        "tuid": "$user"
                    },
                    {
                        "name": "employee",
                        "type": "id",
                        "ID": "employee",
                        "tuid": "employee"
                    }
                ]
            }
        ]
    },
    "addwebuseemployee": {
        "name": "addWebuseEmployee",
        "type": "action",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "webuser",
                "type": "id",
                "ID": "$user",
                "tuid": "$user"
            },
            {
                "name": "employee",
                "type": "id",
                "ID": "employee",
                "tuid": "employee"
            }
        ],
        "returns": [] as any
    },
    "deletewebuseemployee": {
        "name": "deleteWebuseEmployee",
        "type": "action",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "webuser",
                "type": "id",
                "ID": "$user",
                "tuid": "$user"
            },
            {
                "name": "employee",
                "type": "id",
                "ID": "employee",
                "tuid": "employee"
            }
        ],
        "returns": [] as any
    },
    "employeerelation": {
        "name": "EmployeeRelation",
        "type": "map",
        "private": false,
        "sys": true,
        "fields": [] as any,
        "keys": [
            {
                "name": "parent",
                "type": "id",
                "null": false,
                "ID": "employee",
                "tuid": "employee"
            },
            {
                "name": "child",
                "type": "id",
                "null": false,
                "ID": "employee",
                "tuid": "employee"
            }
        ],
        "isOpen": true,
        "actions": {
            "add": "$add$",
            "del": "$del$"
        },
        "queries": {
            "all": "$all$",
            "page": "$page$",
            "query": "$query$"
        }
    },
    "searchemployee": {
        "name": "SearchEmployee",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "key",
                "type": "char",
                "size": 100
            }
        ],
        "returns": [
            {
                "name": "$page",
                "fields": [
                    {
                        "name": "id",
                        "type": "bigint"
                    },
                    {
                        "name": "no",
                        "type": "char",
                        "null": false,
                        "size": 20
                    },
                    {
                        "name": "name",
                        "type": "char",
                        "null": false,
                        "size": 30
                    },
                    {
                        "name": "firstName",
                        "type": "char",
                        "size": 20
                    },
                    {
                        "name": "lastName",
                        "type": "char",
                        "size": 20
                    },
                    {
                        "name": "title",
                        "type": "char",
                        "size": 20
                    },
                    {
                        "name": "Status",
                        "type": "char",
                        "size": 2
                    },
                    {
                        "name": "CreateTime",
                        "type": "datetime"
                    }
                ],
                "order": "asc"
            }
        ]
    },
    "searchteam": {
        "name": "SearchTeam",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "key",
                "type": "char",
                "size": 100
            }
        ],
        "returns": [
            {
                "name": "$page",
                "fields": [
                    {
                        "name": "id",
                        "type": "bigint"
                    },
                    {
                        "name": "webuser",
                        "type": "id",
                        "ID": "$user",
                        "tuid": "$user"
                    },
                    {
                        "name": "employee",
                        "type": "id",
                        "ID": "employee",
                        "tuid": "employee"
                    }
                ],
                "order": "asc"
            }
        ]
    },
    "company": {
        "name": "Company",
        "type": "tuid",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "no",
                "type": "char",
                "size": 10
            },
            {
                "name": "name",
                "type": "char",
                "null": false,
                "size": 30
            }
        ],
        "global": false,
        "sync": false,
        "id": "id",
        "search": [] as any,
        "main": [] as any
    },
    "salarypaid": {
        "name": "SalaryPaid",
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
                "name": "employee",
                "type": "id",
                "ID": "employee",
                "tuid": "employee"
            },
            {
                "name": "post",
                "type": "id"
            },
            {
                "name": "performance",
                "type": "dec",
                "scale": 4,
                "precision": 18
            },
            {
                "name": "operator",
                "type": "id",
                "ID": "employee",
                "tuid": "employee"
            },
            {
                "name": "createDate",
                "type": "datetime"
            }
        ],
        "keys": [] as any,
        "global": true,
        "idType": 11,
        "isMinute": false
    },
    "paysalary": {
        "name": "PaySalary",
        "type": "action",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "employee",
                "type": "id",
                "ID": "employee",
                "tuid": "employee"
            },
            {
                "name": "post",
                "type": "id"
            },
            {
                "name": "performance",
                "type": "dec",
                "scale": 4,
                "precision": 18
            },
            {
                "name": "operator",
                "type": "id",
                "ID": "employee",
                "tuid": "employee"
            }
        ],
        "returns": [] as any
    },
    "salaryadjusted": {
        "name": "SalaryAdjusted",
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
                "name": "employee",
                "type": "id",
                "ID": "employee",
                "tuid": "employee"
            },
            {
                "name": "post",
                "type": "id"
            },
            {
                "name": "performance",
                "type": "dec",
                "scale": 4,
                "precision": 18
            },
            {
                "name": "operator",
                "type": "id",
                "ID": "employee",
                "tuid": "employee"
            },
            {
                "name": "note",
                "type": "char",
                "size": 200
            },
            {
                "name": "createDate",
                "type": "datetime"
            }
        ],
        "keys": [] as any,
        "global": true,
        "idType": 11,
        "isMinute": false
    },
    "salaryadjust": {
        "name": "salaryAdjust",
        "type": "action",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "employee",
                "type": "id",
                "ID": "employee",
                "tuid": "employee"
            },
            {
                "name": "post",
                "type": "id"
            },
            {
                "name": "performance",
                "type": "dec",
                "scale": 4,
                "precision": 18
            },
            {
                "name": "operator",
                "type": "id",
                "ID": "employee",
                "tuid": "employee"
            },
            {
                "name": "note",
                "type": "char",
                "size": 200
            }
        ],
        "returns": [] as any
    },
    "employeerole$page$": {
        "name": "EmployeeRole$page$",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "employee",
                "type": "id",
                "ID": "employee",
                "tuid": "employee"
            },
            {
                "name": "role",
                "type": "id",
                "ID": "role",
                "tuid": "role"
            }
        ],
        "returns": [
            {
                "name": "$page",
                "fields": [
                    {
                        "name": "$order",
                        "type": "bigint"
                    },
                    {
                        "name": "employee",
                        "type": "id",
                        "ID": "employee",
                        "tuid": "employee"
                    },
                    {
                        "name": "role",
                        "type": "id",
                        "ID": "role",
                        "tuid": "role"
                    },
                    {
                        "name": "StartTime",
                        "type": "datetime"
                    },
                    {
                        "name": "EndTime",
                        "type": "datetime"
                    }
                ],
                "order": "asc"
            }
        ]
    },
    "employeerole$query$": {
        "name": "EmployeeRole$query$",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "employee",
                "type": "id",
                "ID": "employee",
                "tuid": "employee"
            },
            {
                "name": "role",
                "type": "id",
                "ID": "role",
                "tuid": "role"
            }
        ],
        "returns": [
            {
                "name": "ret",
                "fields": [
                    {
                        "name": "employee",
                        "type": "id",
                        "ID": "employee",
                        "tuid": "employee"
                    },
                    {
                        "name": "role",
                        "type": "id",
                        "ID": "role",
                        "tuid": "role"
                    },
                    {
                        "name": "StartTime",
                        "type": "datetime"
                    },
                    {
                        "name": "EndTime",
                        "type": "datetime"
                    }
                ]
            }
        ]
    },
    "employeerole$add$": {
        "name": "EmployeeRole$add$",
        "type": "action",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "employee",
                "type": "id",
                "ID": "employee",
                "tuid": "employee"
            }
        ],
        "arrs": [
            {
                "name": "arr1",
                "fields": [
                    {
                        "name": "role",
                        "type": "id",
                        "ID": "role",
                        "tuid": "role"
                    },
                    {
                        "name": "StartTime",
                        "type": "datetime"
                    },
                    {
                        "name": "EndTime",
                        "type": "datetime"
                    }
                ]
            }
        ],
        "returns": [] as any
    },
    "employeerole$del$": {
        "name": "EmployeeRole$del$",
        "type": "action",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "employee",
                "type": "id",
                "ID": "employee",
                "tuid": "employee"
            }
        ],
        "arrs": [
            {
                "name": "arr1",
                "fields": [
                    {
                        "name": "role",
                        "type": "id",
                        "ID": "role",
                        "tuid": "role"
                    }
                ]
            }
        ],
        "returns": [] as any
    },
    "webuseremployee$page$": {
        "name": "WebuserEmployee$page$",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "webuser",
                "type": "id",
                "ID": "$user",
                "tuid": "$user"
            },
            {
                "name": "employee",
                "type": "id",
                "ID": "employee",
                "tuid": "employee"
            }
        ],
        "returns": [
            {
                "name": "$page",
                "fields": [
                    {
                        "name": "$order",
                        "type": "bigint"
                    },
                    {
                        "name": "webuser",
                        "type": "id",
                        "ID": "$user",
                        "tuid": "$user"
                    },
                    {
                        "name": "employee",
                        "type": "id",
                        "ID": "employee",
                        "tuid": "employee"
                    }
                ],
                "order": "asc"
            }
        ]
    },
    "webuseremployee$query$": {
        "name": "WebuserEmployee$query$",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "webuser",
                "type": "id",
                "ID": "$user",
                "tuid": "$user"
            },
            {
                "name": "employee",
                "type": "id",
                "ID": "employee",
                "tuid": "employee"
            }
        ],
        "returns": [
            {
                "name": "ret",
                "fields": [
                    {
                        "name": "webuser",
                        "type": "id",
                        "ID": "$user",
                        "tuid": "$user"
                    },
                    {
                        "name": "employee",
                        "type": "id",
                        "ID": "employee",
                        "tuid": "employee"
                    }
                ]
            }
        ]
    },
    "webuseremployee$add$": {
        "name": "WebuserEmployee$add$",
        "type": "action",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "webuser",
                "type": "id",
                "ID": "$user",
                "tuid": "$user"
            }
        ],
        "arrs": [
            {
                "name": "arr1",
                "fields": [
                    {
                        "name": "employee",
                        "type": "id",
                        "ID": "employee",
                        "tuid": "employee"
                    }
                ]
            }
        ],
        "returns": [] as any
    },
    "webuseremployee$del$": {
        "name": "WebuserEmployee$del$",
        "type": "action",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "webuser",
                "type": "id",
                "ID": "$user",
                "tuid": "$user"
            }
        ],
        "arrs": [
            {
                "name": "arr1",
                "fields": [
                    {
                        "name": "employee",
                        "type": "id",
                        "ID": "employee",
                        "tuid": "employee"
                    }
                ]
            }
        ],
        "returns": [] as any
    },
    "employeerelation$page$": {
        "name": "EmployeeRelation$page$",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "parent",
                "type": "id",
                "ID": "employee",
                "tuid": "employee"
            },
            {
                "name": "child",
                "type": "id",
                "ID": "employee",
                "tuid": "employee"
            }
        ],
        "returns": [
            {
                "name": "$page",
                "fields": [
                    {
                        "name": "$order",
                        "type": "bigint"
                    },
                    {
                        "name": "parent",
                        "type": "id",
                        "ID": "employee",
                        "tuid": "employee"
                    },
                    {
                        "name": "child",
                        "type": "id",
                        "ID": "employee",
                        "tuid": "employee"
                    }
                ],
                "order": "asc"
            }
        ]
    },
    "employeerelation$query$": {
        "name": "EmployeeRelation$query$",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "parent",
                "type": "id",
                "ID": "employee",
                "tuid": "employee"
            },
            {
                "name": "child",
                "type": "id",
                "ID": "employee",
                "tuid": "employee"
            }
        ],
        "returns": [
            {
                "name": "ret",
                "fields": [
                    {
                        "name": "parent",
                        "type": "id",
                        "ID": "employee",
                        "tuid": "employee"
                    },
                    {
                        "name": "child",
                        "type": "id",
                        "ID": "employee",
                        "tuid": "employee"
                    }
                ]
            }
        ]
    },
    "employeerelation$add$": {
        "name": "EmployeeRelation$add$",
        "type": "action",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "parent",
                "type": "id",
                "ID": "employee",
                "tuid": "employee"
            }
        ],
        "arrs": [
            {
                "name": "arr1",
                "fields": [
                    {
                        "name": "child",
                        "type": "id",
                        "ID": "employee",
                        "tuid": "employee"
                    }
                ]
            }
        ],
        "returns": [] as any
    },
    "employeerelation$del$": {
        "name": "EmployeeRelation$del$",
        "type": "action",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "parent",
                "type": "id",
                "ID": "employee",
                "tuid": "employee"
            }
        ],
        "arrs": [
            {
                "name": "arr1",
                "fields": [
                    {
                        "name": "child",
                        "type": "id",
                        "ID": "employee",
                        "tuid": "employee"
                    }
                ]
            }
        ],
        "returns": [] as any
    }
}