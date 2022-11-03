import { useUqApp } from "App/MyUqApp";
import { useQuery } from "react-query";

export function ViewProduct({ id }: { id: number; }): JSX.Element {
    const { uqs } = useUqApp();
    const { data } = useQuery(['product'], async () => {
        let ret = await uqs.JkProduct.ProductX.loadMain(id);
        return ret;
    });
    return <>{data.descriptionC}</>;
}
