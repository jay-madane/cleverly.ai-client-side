import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const testimonials = [
    {
        name: "Tony",
        avatar: "T",
        title: "Software Engineer",
        description: "This AI tool is like having a super-smart friend who always knows the right thing to say, making every interaction a breeze!"
    },
    {
        name: "Harvey",
        avatar: "H",
        title: "Content Writer",
        description: "This AI tool has truly exceeded my expectations, offering unparalleled assistance and remarkable depth of knowledge."
    },
    {
        name: "Rachael",
        avatar: "R",
        title: "Accounting Manager",
        description: "I've tried several AI tools, but none come close to the level of sophistication and versatility that this one provides."
    },
    {
        name: "Michael",
        avatar: "M",
        title: "Systems Analyst",
        description: "Using this AI tool feels like having a personal genius at my fingertips - it consistently delivers accurate and insightful information across a wide range of topics."
    },
]

export const LandingContent = () => {
    return (
        <div className="px-10 pb-20">
            <h2 className="text-center text-4xl text-white font-extrabold mb-10">
                Testimonials
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {testimonials.map((item) => (
                    <Card className="border-none bg-stone-700 text-white" key={item.description}>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-x-2">
                                <div>
                                    <p className="text-lg">{item.name}</p>
                                    <p className="text-zinc-400 text-sm">{item.title}</p>
                                </div>
                            </CardTitle>
                            <CardContent className="pt-4 px-0">
                                {item.description}
                            </CardContent>
                        </CardHeader>
                    </Card>
                ))}
            </div>
        </div>
    );
}
