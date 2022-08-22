import { useState } from "react";
import { LMR } from "tonwa-com";
import { UserUnit } from "tonwa-uq";
import { ListEdit, ListEditContext, useUqApp } from "tonwa-uq-com";
import { ButtonAddUser } from "../ButtonAddUser";
import { None, OnAdminChanged, propertyOf } from "../defines";
import { Me } from "../Me";
import { roleT } from "../res";
import { ViewUser } from "../ViewUser";

export function ViewAdmin({ me, userUnits, onAdminChanged }:
    {
        me: number;
        userUnits: UserUnit[];
        onAdminChanged: OnAdminChanged;
    }) {
    let uqApp = useUqApp();
    let listEditContext = new ListEditContext<UserUnit>(userUnits, propertyOf<UserUnit>('unit'));
    let tAdmin = roleT('admin');
    function ItemView({ value }: { value: UserUnit }) {
        let [userUnit, setUserUnit] = useState(value);
        async function onAssignChanged(assigned: string) {
            setUserUnit({ ...value, assigned });
        }
        if (value.user === me) return <Me />;
        return <div className="px-3 py-2">
            <ViewUser user={userUnit} onAssignChanged={onAssignChanged} pageHeader={tAdmin} onAdminChanged={onAdminChanged} />
        </div>;
    }

    async function onUserAdded(userId: number) {
        await uqApp.uqUnit.addAdmin(userId, 1, undefined);
        onAdminChanged(userId);
    }

    return <>
        <div className="card mt-3 mx-1">
            <div className="card-header pe-0 py-0">
                <LMR className="align-items-center">
                    <span>{tAdmin}</span>
                    <ButtonAddUser onUserAdded={onUserAdded} />
                </LMR>
            </div>
            <ListEdit context={listEditContext} none={<None />} ItemView={ItemView} />
        </div>
        <ul className="small text-muted mt-2 mb-5 mx-3">
            <li>{roleT('adminMemo1')}</li>
            <li>{roleT('adminMemo2')}</li>
        </ul>
    </>;
}
