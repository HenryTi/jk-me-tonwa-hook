import { useUqApp } from "App/MyUqApp";
import { useQuery } from "react-query";
import { List, Page } from "tonwa-com";
import { ModelLink } from "../ModelLink";

const caption = '轻代理销售额列表';

const modelLink: ModelLink = {
    caption,
    iconColor: undefined,
    page: <PageAgents />,
}

export default modelLink;

function PageAgents() {
    const { uqs } = useUqApp();
    const { data } = useQuery(['agents'], async () => {
        let ret = await uqs.JkMe.GetAgents.query({});
        return ret.ret;
    })
    return <Page header={caption}>
        <List items={data} />
    </Page>;
}
