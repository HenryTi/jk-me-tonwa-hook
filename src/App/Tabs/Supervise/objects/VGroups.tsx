import { useUqApp } from "App/MyUqApp";
import { useQuery } from "react-query";
import { List, Page } from "tonwa-com";
import { ModelLink } from "../ModelLink";

const caption = '部门销售额列表';

const modelLink: ModelLink = {
    caption,
    iconColor: undefined,
    page: <PageGroups />,
}

export default modelLink;

function PageGroups() {
    const { uqs } = useUqApp();
    const { data } = useQuery(['groups'], async () => {
        let ret = await uqs.JkMe.GetGroups.query({});
        return ret.ret;
    })
    return <Page header={caption}>
        <List items={data} />
    </Page>;
}
