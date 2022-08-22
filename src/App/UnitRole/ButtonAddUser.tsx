import { FA, useNav } from "tonwa-com";
import { User } from "tonwa-uq";
import { SelectUser } from "tonwa-uq-com";
import { roleT } from "./res";

interface Props {
    onUserAdded: (userId: number) => Promise<void>;
}
export function ButtonAddUser({ onUserAdded }: Props) {
    let nav = useNav();
    async function onAddUser() {
        let top = <div className="my-3">{roleT('searchUser')}</div>;
        let ret = await nav.call<User>(<SelectUser header={roleT('user')} top={top} />);
        await onUserAdded(ret.id);
        nav.close(0);
    }
    return <button className="btn btn-small btn-link" onClick={onAddUser}><FA name="plus" />{roleT('new')}</button>
}
