import { useAuth } from "@clerk/clerk-react";
import TypeWriterComponent from "typewriter-effect";

import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const LandingHero = () => {
    const { isSignedIn } = useAuth();

    return (
        <div className="text-white font-bold py-36 text-center space-y-5">
            <div className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl space-y-5 font-extrabold">
                <h1>The Finest AI Tool-Kit for</h1>
                <div className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-pink-600">
                    <TypeWriterComponent
                        options={{
                            strings: [
                                "Conversation.",
                                "Code Generation.",
                                "Music Generation.",
                                "Photo Generation.",
                                "Video Generation.",
                            ],
                            autoStart: true,
                            loop: true
                        }}
                    />
                </div>
            </div>
            <div className="text-sm md:text-xl font-light text-zinc-400">
                Creating content using AI with cutting-edge models.
            </div>
            <div>
                <Link to={isSignedIn ? "/dashboard" : "/sign-up"}>
                    <Button variant="premium" className="md:text-lg p-4 md:p-6 rounded-full font-semibold">
                        Start Generating for Free
                    </Button>
                </Link>
            </div>
            <div className="text-zinc-400 text-xs md:text-sm font-normal">
                All features are free momentarily. No subscription required.
            </div>
        </div>
    );
}
