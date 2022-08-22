import { Band, BandString, FA, Form, LMR, MutedSmall, Page, stringFormat, Submit, useNav } from "tonwa-com";
import { UserUnit } from "tonwa-uq";
import { Image, useUqApp } from "tonwa-uq-com";
import { OnAdminChanged } from "./defines";
import { roleT } from "./res";

interface Props {
    user: UserUnit;
    onAssignChanged: (assigned: string) => Promise<void>;
    pageHeader: string;
    onAdminChanged: OnAdminChanged;
}

export function ViewUser({ user, onAssignChanged, pageHeader, onAdminChanged }: Props) {
    let nav = useNav();
    let uqApp = useUqApp();
    let { name, icon, nick, assigned, isOwner, isAdmin, addBy } = user;
    let vUser;
    let tUser = roleT('user');
    let tAdmin = roleT('admin');
    let tOwner = roleT('owner');
    if (nick) {
        vUser = <>{nick} <MutedSmall>用户:{name}</MutedSmall></>;
    }
    else {
        vUser = name;
    }

    let vAssignedUser: any;
    if (assigned) {
        vAssignedUser = <><div>{assigned}</div> <MutedSmall>{nick} {tUser}:{name}</MutedSmall></>
    }
    else {
        vAssignedUser = vUser;
    }
    function onEdit() {
        function PageEdit() {
            let { user: userId } = user;
            async function onSubmit(data: any): Promise<[name: string, err: string][] | string[] | string | void> {
                let { assigned } = data;
                await uqApp.uqUnit.addUser(userId, assigned);
                await onAssignChanged(assigned);
                nav.close();
                return;
            }
            function ButtonRemove({ admin }: { admin: 'owner' | 'admin'; }) {
                let caption: string;
                let adminFlag: 1 | 2;
                if (admin === 'owner') {
                    caption = tOwner;
                    adminFlag = 2;
                }
                else {
                    caption = tAdmin;
                    adminFlag = 1;
                }
                async function onRemove() {
                    if (await nav.confirm(stringFormat(roleT('userReallyDelete'), caption, user.name)) === true) {
                        await uqApp.uqUnit.delAdmin(userId, adminFlag);
                        onAdminChanged(userId);
                        nav.close();
                    }
                }
                return <button onClick={onRemove} className="btn btn-sm btn-outline-primary">
                    {stringFormat(roleT('deleteThe'), caption)}
                </button>;
            }
            let btnRemove: any;
            if (isOwner === true) {
                if (addBy === uqApp.me) {
                    btnRemove = <ButtonRemove admin="owner" />;
                }
            }
            else if (isAdmin === true) {
                btnRemove = <ButtonRemove admin="admin" />;
            }

            return <Page header={pageHeader}>
                <LMR className="mb-3 p-3 border-bottom tonwa-bg-gray-1">
                    <div>{vAssignedUser}</div>
                    <span>{btnRemove}</span>
                </LMR>
                <Form values={user} className="m-3">
                    <BandString name="assigned" label={roleT('assigned')} />
                    <Band contentContainerClassName="text-center my-3">
                        <Submit onSubmit={onSubmit}><div className='mx-5'>{roleT('save')}</div></Submit>
                    </Band>
                </Form>
            </Page>;
        }
        nav.open(<PageEdit />);
    }
    return <LMR className="my-2">
        <Image className="w-2c h-2c me-3" src={icon} />
        <div>
            {vAssignedUser}
        </div>
        <div className="cursor-pointer text-info" onClick={onEdit}>
            <FA name="pencil" />
        </div>
    </LMR>;
}
