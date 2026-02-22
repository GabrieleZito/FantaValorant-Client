import { useBreadcrumb } from "@/hooks/useBreadcrumb";
import { useLocation } from "react-router";

export function Dashboard() {
    const location = useLocation();
    useBreadcrumb(location.pathname);

    return (
        <>
            <div className="flex flex-col flex-1 h-full gap-4 p-4">
                <div className="grid gap-4 auto-rows-min md:grid-cols-3">
                    <div className="aspect-video rounded-xl bg-blue-200/50" />
                    <div className="aspect-video rounded-xl bg-blue-200/50" />
                    <div className="aspect-video rounded-xl bg-blue-200/50" />
                </div>
                <div className="grid max-h-137.5 min-h-50 gap-4 md:grid-cols-2">
                    <div className="rounded-xl bg-blue-200/50"></div>
                    <div className="rounded-xl bg-blue-200/50"></div>
                </div>
            </div>
        </>
    );
}
