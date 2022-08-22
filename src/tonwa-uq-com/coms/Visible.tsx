import { useUqApp } from "../UqApp";

interface Props {
    children: JSX.Element;
    role: string[] | string;
}

export function Visible({ children, role }: Props): JSX.Element {
    let uqApp = useUqApp();
    if (uqApp.hasRole(role) === true) return children;
    return null;
}
