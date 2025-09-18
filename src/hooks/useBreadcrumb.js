import { setBreadcrumb } from "@/redux/slices/breadcrumbSlice";
import { useEffect } from "react";

export function useBreadcrumb(dispatch, pathname) {
    useEffect(() => {
        console.log(pathname);
        
        dispatch(setBreadcrumb(pathname));
    }, [dispatch, pathname]);
}
