import { useUqApp } from "App/MyUqApp";
import { useQuery } from "react-query";

export function ViewEmployee({ id }: { id: number; }): JSX.Element {
    const { uqs } = useUqApp();
    const { data } = useQuery(['employee'], async () => {
        let ret = await uqs.JkHr.Employee.loadMain(id);
        return ret;
    });
    return <>{data.name}</>;
}
