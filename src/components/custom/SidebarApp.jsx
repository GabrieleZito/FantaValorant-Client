import { User, Settings, LogOut, Trophy, Users, ChevronDown, Crown, Medal, Award, Mail, UserPlus, LayoutDashboard } from "lucide-react";
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
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { setUser } from "@/redux/slices/userSlice";
import authAPI from "@/API/authAPI";
import { logoutSuccess, setToken } from "@/redux/slices/authSlice";

const leaderboardItems = [
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
];

const leagueItems = [
    {
        title: "My Leagues",
        url: "/dashboard/my-leagues",
    },
    {
        title: "Create League",
        url: "/dashboard/new-league",
    },
    {
        title: "League Settings",
        url: "#",
    },
];

export function SidebarApp({ ...props }) {
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const sendLogout = useMutation({
        mutationFn: authAPI.logout,
        mutationKey: ["logout"],
        onSuccess: () => {
            //dispatch(setUser({}));
            //dispatch(setToken(null));
            navigate("/");
            dispatch(logoutSuccess());
        },
        onError: (err) => {
            console.log(err);
        },
    });
    const logout = () => {
        sendLogout.mutate();
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
                                        <AvatarImage src={user?.propic || "/placeholder.svg"} alt={user?.name} />
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
                <SidebarGroup>
                    <SidebarGroupLabel>Navigation</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link to={"/dashboard"}>
                                        <LayoutDashboard />
                                        <span>Dashboard</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupLabel>Leaderboards</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {leaderboardItems.map((item) => (
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
                <SidebarGroup>
                    <SidebarGroupLabel>Leagues</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {leagueItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link to={item.url}>
                                            <Users />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupLabel>Network</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link to="/dashboard/friends">
                                        <UserPlus />
                                        <span>Friends</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link to="/dashboard/invites">
                                        <Mail />
                                        <span>Invites</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
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
                            <div onClick={logout} className="hover:cursor-pointer">
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
