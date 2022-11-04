import { useQuery } from "react-query";
import { UqTuid } from "tonwa-uq";

export function ViewTuid({ id, Tuid }: { id: number; Tuid: UqTuid<any>; }): JSX.Element {
    if (!id) {
        return <>{noTuid(Tuid, id)}</>;
    }
    return <ViewTuidContent id={id} Tuid={Tuid} />;
}

function noTuid(Tuid: UqTuid<any>, id: number) {
    return `no ${Tuid.name} id=${id}`;
}

function ViewTuidContent({ id, Tuid }: { id: number; Tuid: UqTuid<any>; }): JSX.Element {
    const { data } = useQuery([Tuid.name, id], async () => {
        let ret = await Tuid.loadMain(id);
        return ret;
    });
    return <>{data?.name ?? noTuid(Tuid, id)}</>;
}
