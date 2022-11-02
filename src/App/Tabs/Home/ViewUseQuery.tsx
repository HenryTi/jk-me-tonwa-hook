import { useState, Suspense } from 'react';
import { useQuery, QueryClient, QueryClientProvider } from "react-query";

//import "./styles.css";

const useRandomUser = () =>
    useQuery("user", async () => {
        return fetch("https://randomuser.me/api/").then(res => res.json());
    });

function FirstName({ userId }: { userId?: number; }) {
    const { data } = useRandomUser();
    return <>
        <div>{data.results[0].name.first}</div>
    </>;
}

function LastName({ userId }: { userId?: number; }) {
    const { data } = useRandomUser();

    return <div>{data.results[0].name.last}</div>;
}

function Gender({ userId }: { userId?: number; }) {
    const { data } = useRandomUser();
    return <div>{data.results[0].gender}</div>;
}

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            suspense: true,
        },
    },
});
export function ViewUseQuery() {
    const [show, setShow] = useState(false);
    return (
        <div className="App">
            <QueryClientProvider client={queryClient}>
                <Suspense fallback={<div>Loading...</div>}>
                    <h1>Hello CodeSandbox</h1>
                    <h2>Start editing to see some magic happen!</h2>
                    <FirstName />
                    <LastName />
                    {show && <Gender />}
                </Suspense>
                <div onClick={() => setShow(true)}>Click</div>
            </QueryClientProvider>
        </div>
    );
}
