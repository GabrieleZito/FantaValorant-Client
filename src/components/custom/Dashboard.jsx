import { useBreadcrumb } from "@/hooks/useBreadcrumb";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router";

export function Dashboard() {
    const location = useLocation();
    const dispatch = useDispatch();

    useBreadcrumb(dispatch, location.pathname);

    return (
        <>
            <div className="flex flex-1 flex-col gap-4 p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="aspect-video rounded-xl bg-blue-200/50" />
                    <div className="aspect-video rounded-xl bg-blue-200/50" />
                    <div className="aspect-video rounded-xl bg-blue-200/50" />
                </div>
                <div className="min-h-[100vh] flex-1 rounded-xl bg-blue-200/50 md:min-h-min"></div>
            </div>
        </>
    );
}
