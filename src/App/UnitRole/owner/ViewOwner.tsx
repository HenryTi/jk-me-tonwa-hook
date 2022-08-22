import { useState } from "react";
import { FA, LMR, Page, useNav } from "tonwa-com";
import { UserUnit } from "tonwa-uq";
import { ListEdit, ListEditContext, useUqApp } from "tonwa-uq-com";
import { ButtonAddUser } from "../ButtonAddUser";
import { None, OnAdminChanged, propertyOf } from "../defines";
import { Me } from "../Me";
import { roleT } from "../res";
import { ViewUser } from "../ViewUser";

export function ViewOwner({ me, userUnits, onAdminChanged }:
    {
        me: number;
        userUnits: UserUnit[];
        onAdminChanged: OnAdminChanged;
    }) {
    let nav = useNav();
    let uqApp = useUqApp();
    let listEditContext = new ListEditContext<UserUnit>(userUnits, propertyOf<UserUnit>('unit'));
    let tOwner = roleT('owner');

    function ItemView({ value }: { value: UserUnit }) {
        let [userUnit, setUserUnit] = useState(value);
        async function onAssignChanged(assigned: string) {
            setUserUnit({ ...value, assigned });
        }
        function iQuitOwner() {
            function PageIQuitOwner() {
                async function confirmQuit() {
                    await uqApp.uqUnit.quitOwner();
                    await onAdminChanged(value.user);
                    nav.close(2);
                }
                return <Page header={tOwner}>
                    <div className="w-20c rounded border px-3 py-4 mx-auto my-3 text-center">
                        <LMR>
                            <FA name="question-circle-o" size="3x" className="text-danger me-3" />
                            <div className="text-start">
                                <b>{roleT('ownerReallyQuit')}</b>
                                <br />
                                <small className="text-muted">{roleT('ownerLost')}</small>
                                <br />
                                <br />
                                <button className="btn btn-outline-primary" onClick={confirmQuit}>{roleT('ownerConfirmQuit')}</button>
                            </div>
                            <span></span>
                        </LMR>
                    </div>
                </Page>;
            }
            nav.open(<PageIQuitOwner />);
        }
        if (value.user === me) {
            let vIQuitOwner: any;
            if (userUnits.length > 1) {
                vIQuitOwner = <span className="cursor-pointer" onClick={iQuitOwner}>
                    <FA name="times" className="text-info" />
                </span>;
            }
            return <Me right={vIQuitOwner} />;
        }
        return <div className="px-3 py-2">
            <ViewUser user={userUnit} onAssignChanged={onAssignChanged} pageHeader={tOwner} onAdminChanged={onAdminChanged} />
        </div>;

    }
    async function onUserAdded(userId: number) {
        await uqApp.uqUnit.addAdmin(userId, 3, undefined);
        onAdminChanged(userId);
    }
    return <>
        <div className="card mt-3 mx-1">
            <div className="card-header pe-0 py-0">
                <LMR className="align-items-center">
                    <span>{tOwner}</span>
                    <ButtonAddUser onUserAdded={onUserAdded} />
                </LMR>
            </div>
            <ListEdit context={listEditContext} none={<None />} ItemView={ItemView} />
        </div>
        <ul className="small text-muted mt-2 mb-5 mx-3">
            <li>{roleT("ownerMemo1")}</li>
            <li>{roleT("ownerMemo2")}</li>
        </ul>
    </>;
}
