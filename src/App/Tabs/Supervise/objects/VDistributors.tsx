import { useUqApp } from "App/MyUqApp";
import { useQuery } from "react-query";
import { List, Page } from "tonwa-com";
import { ModelLink } from "../ModelLink";

const caption = '代理商销售额列表';

const modelLink: ModelLink = {
    caption,
    iconColor: undefined,
    page: <PageDistributors />,
}

export default modelLink;

function PageDistributors() {
    const { uqs } = useUqApp();
    const { data } = useQuery(['distributors'], async () => {
        let ret = await uqs.JkMe.GetDistributors.query({});
        return ret.ret;
    })
    return <Page header={caption}>
        <List items={data} />
    </Page>;
}
