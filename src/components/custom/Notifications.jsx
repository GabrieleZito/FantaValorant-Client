import { useDispatch } from "react-redux";
import { useLocation } from "react-router";
import { useBreadcrumb } from "@/hooks/useBreadcrumb";
import { FriendRequests } from "./Friendrequests";
import { Invites } from "./Invites";

export function Notifications() {
    const dispatch = useDispatch();
    const location = useLocation();
    useBreadcrumb(dispatch, location.pathname);

    

    return (
        <>
            <div className="h-full p-4">
                <FriendRequests />
                <Invites />
            </div>
        </>
    );
}
