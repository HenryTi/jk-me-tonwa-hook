import { FA, LMR, MutedSmall } from "tonwa-com";
import { useUqApp } from "tonwa-uq-com";
import { roleT } from "./res";

export function Me({ right }: { right?: JSX.Element; }) {
    let uqApp = useUqApp();

    return <LMR className="px-3 py-3 border-bottom align-items-center">
        <span>
            [ <FA name="user-circle" className="me-2 text-danger" /> {roleT('self')} - <MutedSmall>{uqApp.responsive.user.name}</MutedSmall> ]
        </span>
        <span>{right}</span>
    </LMR>;
}
