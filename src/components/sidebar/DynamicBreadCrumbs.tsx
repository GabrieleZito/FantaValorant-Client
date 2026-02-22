import { useAppSelector } from "@/hooks/reduxHooks";
import { selectBreadcrumb } from "@/redux/slices/breadcrumbSlice";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from "react-router";
import React from "react";

export function DynamicBreadcrumbs() {
    const breadcrumbs = useAppSelector(selectBreadcrumb);
    const strings = breadcrumbs.replaceAll("%20", " ").split("/");
    return (
        <Breadcrumb>
            <BreadcrumbList>
                {strings.map((s, i) => {
                    if (s) {
                        const url = strings.slice(0, i + 1).join("/");
                        //console.log(url);

                        return (
                            <React.Fragment key={i}>
                                <BreadcrumbItem className="hidden md:block">
                                    <Link to={url}>
                                        {s
                                            .split("-")
                                            .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                                            .join(" ")}
                                    </Link>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator className="hidden md:block" />
                            </React.Fragment>
                        );
                    }
                })}
            </BreadcrumbList>
        </Breadcrumb>
    );
}
