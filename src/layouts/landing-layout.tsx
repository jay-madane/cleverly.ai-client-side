import LandingPage from "@/routes/landing";

export default function LandingLayout() {
    return (
        <main className="h-full bg-gradient-to-r from-stone-950 to-stone-900 overflow-auto">
            <div className="mx-auto max-w-screen-xl h-screen w-full">
                <LandingPage />
            </div>
        </main>
    );
}