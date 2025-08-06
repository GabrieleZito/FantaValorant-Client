import { useSelector } from "react-redux";

export function Dashboard() {
    const user = useSelector((state) => state.user);
    //console.log(user);

    return (
        <>
            <div className="flex flex-col flex-1 gap-4 p-4">
                <div className="grid gap-4 auto-rows-min md:grid-cols-3">
                    <div className="aspect-video rounded-xl bg-blue-200/50" />
                    <div className="aspect-video rounded-xl bg-blue-200/50" />
                    <div className="aspect-video rounded-xl bg-blue-200/50" />
                </div>
                <div className="min-h-[100vh] flex-1 rounded-xl bg-blue-200/50 md:min-h-min" ></div>
            </div>
        </>
    );
}
