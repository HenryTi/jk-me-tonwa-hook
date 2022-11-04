import { useUqApp } from "App/MyUqApp";
import { ViewTuid } from "./ViewTuid";

export function ViewEmployee({ id }: { id: number; }): JSX.Element {
    const { uqs } = useUqApp();
    return <ViewTuid id={id} Tuid={uqs.JkHr.Employee} />;
}
