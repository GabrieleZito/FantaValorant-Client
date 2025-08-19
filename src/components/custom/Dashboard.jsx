import { setBreadcrumb } from "@/redux/slices/breadcrumbSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";

export function Dashboard() {
    const location = useLocation();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setBreadcrumb(location.pathname));
    }, []);

    return (
        <>
            <div className="flex flex-col flex-1 gap-4 p-4">
                <div className="grid gap-4 auto-rows-min md:grid-cols-3">
                    <div className="aspect-video rounded-xl bg-blue-200/50" />
                    <div className="aspect-video rounded-xl bg-blue-200/50" />
                    <div className="aspect-video rounded-xl bg-blue-200/50" />
                </div>
                <div className="min-h-[100vh] flex-1 rounded-xl bg-blue-200/50 md:min-h-min"></div>
            </div>
        </>
    );
}
