import { Link, useLocation } from "react-router-dom";
import { Code2, ImageIcon, LayoutDashboard, MessageCircle, Music4, Settings, VideoIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import { FreeCounter } from "@/components/free-counter";

const routes = [
    {
        label: "Dashboard",
        icon: LayoutDashboard,
        href: "/dashboard",
        color: "text-violet-500",
    },
    {
        label: "Conversation",
        icon: MessageCircle,
        href: "/conversation",
        color: "text-sky-500",
    },
    {
        label: "Image Generation",
        icon: ImageIcon,
        href: "/image",
        color: "text-yellow-500",
    },
    {
        label: "Video Generation",
        icon: VideoIcon,
        href: "/video",
        color: "text-orange-500",
    },
    {
        label: "Music Generation",
        icon: Music4,
        href: "/music",
        color: "text-rose-700",
    },
    {
        label: "Code Generation",
        icon: Code2,
        href: "/code",
        color: "text-emerald-500",
    },
    {
        label: "Settings",
        icon: Settings,
        href: "/settings",
        color: "text-gray-300",
    },
];

interface SideNavProps {
    apiLimitCount: number;
    isPremium: boolean;
}

const SideNav = ({
    apiLimitCount,
    isPremium,
}: SideNavProps) => {
    const location = useLocation();
    const pathname = location.pathname;

    return (
        <div className="space-y-4 py-2 flex flex-col h-full bg-stone-900 text-white">
            <div className="px-3 flex-1 ">
                <Link className="flex items-center mb-14" to="/dashboard">
                    <div className="relative w-16 h-16">
                        <img
                            alt="logo"
                            src="/logo.png"
                        />
                    </div>
                    <h1 className="text-2xl font-bold">Cleverly.ai</h1>
                </Link>
                <div className="space-y-1">
                    {routes.map((route) => (
                        <Link to={route.href} key={route.href} className={cn("text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                            pathname === route.href ? "text-white bg-white/10" : "text-zinc-400")}>
                            <div className="flex items-center flex-1 ml-2">
                                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                                {route.label}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            <FreeCounter
                apiLimitCount={apiLimitCount}
                isPremium={isPremium}
            />
        </div>
    );
}

export default SideNav;