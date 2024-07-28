import { useAuth } from "@clerk/clerk-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export const LandingNavbar = () => {
    const { isSignedIn } = useAuth();

    return (
        <nav className="p-4 bg-transparent flex items-center justify-between">
            <Link to="/" className="flex items-center">
                <div className="relative lg:h-20 lg:w-20 h-14 w-14">
                    <img
                        alt="logo"
                        src="/logo.png"
                    />
                </div>
                <h1 className={cn("text-2xl lg:text-4xl font-bold text-white")}>cleverly.ai</h1>
            </Link>
            <div className="flex items-center gap-x-2">
                <Link to={isSignedIn ? "/dashboard" : "/sign-up"}>
                    <Button variant="outline" className="mb-1.5 rounded-full hover:bg-white/75">
                        Start Here <ArrowRight className="h-4 w-4 ml-1" />
                    </Button>
                </Link>
            </div>
        </nav>
    );
}