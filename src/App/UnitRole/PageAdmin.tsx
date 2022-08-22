import { useCallback, useState } from "react";
import { Page, useEffectOnce, Waiting } from "tonwa-com";
import { useUqApp } from "tonwa-uq-com";
import { ViewAdmin } from "./admin/ViewAdmin";
import { OnAdminChanged } from "./defines";
import { ViewOwner } from "./owner";
import { roleT } from "./res";
import { ViewRoles } from "./roles";

interface Props {
    admin: 'admin' | 'owner';
    triggerRefreshFlag: () => void;
    onOpenUnit: () => void;
    ViewUnit: ({ entity, unit }: { entity: string; unit: any; }) => JSX.Element;
}

export function PageAdmin({ admin, triggerRefreshFlag, onOpenUnit, ViewUnit }: Props) {
    let uqApp = useUqApp();
    let [unitRoles, setUnitRoles] = useState(undefined);
    let loadUnitRoles = useCallback(async () => {
        let ret = await uqApp.uqUnit.loadUnitUsers();
        setUnitRoles(ret);
    }, [uqApp]);
    useEffectOnce(() => {
        loadUnitRoles();
    });
    if (unitRoles === undefined) return <Waiting />;

    let { entity, unit, isOwner, isAdmin } = uqApp.userUnit;
    let { owners, admins, users } = unitRoles;
    let roleItems = uqApp.uq.Role[unit === 0 ? '$' : entity];
    const onAdminChanged: OnAdminChanged = async () => {
        await uqApp.uqUnit.reloadMyRoles();
        await loadUnitRoles();
        triggerRefreshFlag();
    }
    let me = uqApp.responsive.user.id;
    let vOpenUnit: any;
    if (onOpenUnit) {
        vOpenUnit = <div className="px-3 py-2 bg-light border-bottom cursor-pointer" onClick={vOpenUnit}>
            <ViewUnit unit={unit} entity={entity} />
        </div>
    }
    return <Page header={roleT(admin)}>
        {vOpenUnit}
        {isOwner === true && <>
            <ViewOwner me={me} userUnits={owners} onAdminChanged={onAdminChanged} />
            <ViewAdmin me={me} userUnits={admins} onAdminChanged={onAdminChanged} />
        </>}
        {isAdmin === true && <ViewRoles roleItems={roleItems} users={users} />}
    </Page>;
}

