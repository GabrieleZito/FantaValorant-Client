import { Award, ChevronDown, Crown, LayoutDashboard, LogOut, Mail, Medal, Settings, Trophy, User, UserPlus, Users } from "lucide-react";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link, useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { logout, selectUser } from "@/redux/slices/authSlice";

const sidebarItems = [
    {
        title: "Navigation",
        items: [
            {
                title: "Dashboard",
                url: "/dashboard",
                icon: LayoutDashboard,
            },
        ],
    },
    {
        title: "Leaderboards",
        items: [
            {
                title: "Weekly Rankings",
                icon: Crown,
                url: "#",
            },
            {
                title: "Monthly Champions",
                icon: Trophy,
                url: "#",
            },
            {
                title: "All Time Leaders",
                icon: Medal,
                url: "#",
            },
            {
                title: "Achievement Board",
                icon: Award,
                url: "#",
            },
        ],
    },
    {
        title: "Leagues",
        items: [
            {
                title: "My Leagues",
                url: "/dashboard/my-leagues",
                icon: Users,
            },
            {
                title: "Create League",
                url: "/dashboard/new-league",
                icon: Users,
            },
            {
                title: "League Settings",
                url: "#",
                icon: Users,
            },
        ],
    },
    {
        title: "Network",
        items: [
            {
                title: "Friends",
                url: "/dashboard/friends",
                icon: UserPlus,
            },
            {
                title: "Invites",
                url: "/dashboard/friends",
                icon: Mail,
            },
        ],
    },
    {
        title: "Game",
        items: [
            {
                title: "Agents",
                url: "/dashboard/agents",
                icon: User,
            },
        ],
    },
];

export function SidebarApp(props: any) {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const user = useAppSelector(selectUser);

    const onLogout = async () => {
        const logoutResult = await dispatch(logout());
        if (logout.fulfilled.match(logoutResult)) {
            navigate("/");
        }
    };

    return (
        <Sidebar {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton
                                    size="lg"
                                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                                >
                                    <Avatar className="w-8 h-8 rounded-lg">
                                        <AvatarImage src={user?.propic || "/placeholder.svg"} alt={user?.firstName || ""} />
                                        <AvatarFallback className="rounded-lg">
                                            {user?.firstName?.charAt(0) || "" + "" + user?.lastName?.charAt(0) || ""}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="grid flex-1 text-sm leading-tight text-left">
                                        <span className="font-semibold truncate">{user?.username}</span>
                                        <span className="text-xs truncate">{user?.email}</span>
                                    </div>
                                    <ChevronDown className="ml-auto size-4" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                                side="bottom"
                                align="end"
                                sideOffset={4}
                            >
                                <DropdownMenuItem>
                                    <User className="w-4 h-4 mr-2" />
                                    <span>Account</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Settings className="w-4 h-4 mr-2" />
                                    <span>Settings</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <LogOut className="w-4 h-4 mr-2" />
                                    <span>Log out</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                {sidebarItems.map((s) => (
                    <SidebarGroup key={s.title}>
                        <SidebarGroupLabel>{s.title}</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {s.items.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild>
                                            <Link to={item.url}>
                                                <item.icon />
                                                <span>{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
            </SidebarContent>

            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <a href="#">
                                <User />
                                <span>Account</span>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <a href="#">
                                <Settings />
                                <span>Settings</span>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <div onClick={onLogout} className="hover:cursor-pointer">
                                <LogOut />
                                <span>Logout</span>
                            </div>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>

            <SidebarRail />
        </Sidebar>
    );
}
