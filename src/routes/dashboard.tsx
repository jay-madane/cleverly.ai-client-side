import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

import { ArrowRight, Code2, ImageIcon, MessageCircle, Music4, VideoIcon } from "lucide-react";

const tools = [
  {
    label: "Conversation",
    icon: MessageCircle,
    href: "/conversation",
    color: "text-sky-500",
    bgColor: "bg-sky-500/10",
  },
  {
    label: "Image Generation",
    icon: ImageIcon,
    href: "/image",
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
  },
  {
    label: "Video Generation",
    icon: VideoIcon,
    href: "/video",
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
  },
  {
    label: "Music Generation",
    icon: Music4,
    href: "/music",
    color: "text-rose-700",
    bgColor: "bg-rose-500/10",
  },
  {
    label: "Code Generation",
    icon: Code2,
    href: "/code",
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
  },
];

const DashboardPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="mb-8 space-y-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center">Experience the Power of Artificial Intelligence</h2>
        <p className="text-muted-foreground font-light text-sm md:text-lg text-center">Chat with the smartest AI tool. Explore the possibilities of the Future.</p>
      </div>
      <div className="px-4 md:px-20 lg:px-32 space-y-4">
        {tools.map((tool) => (
          <Card onClick={() => navigate(tool.href)} key={tool.href} className="p-4 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer">
            <div className="flex items-center gap-x-4">
              <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                <tool.icon className={cn("w-8 h-8", tool.color)} />
              </div>
              <div className="font-semibold">
                {tool.label}
              </div>
            </div>
            <ArrowRight className="w-5 h-5" />
          </Card>
        ))}
      </div>
    </div>
  );
}

export default DashboardPage;