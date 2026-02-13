import { setBreadcrumb } from "@/redux/slices/breadcrumbSlice";
import { useEffect } from "react";
import { useAppDispatch } from "./reduxHooks";

export function useBreadcrumb(pathname: string) {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(setBreadcrumb(pathname));
    }, [dispatch, pathname]);
}
