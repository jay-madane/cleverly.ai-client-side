import axios from "axios";
import { useState } from "react";
import { Check, ChevronsUp, Code2, ImageIcon, MessageCircle, Music4, VideoIcon } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from '@clerk/clerk-react';

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useProModal } from "@/hooks/use-pro-modal";
import { cn } from "@/lib/utils";
import { domainUrl } from "@/domain";

const tools = [
    {
        label: "Conversation",
        icon: MessageCircle,
        color: "text-sky-500",
        bgColor: "bg-sky-500/10",
    },
    {
        label: "Image Generation",
        icon: ImageIcon,
        color: "text-yellow-500",
        bgColor: "bg-yellow-500/10",
    },
    {
        label: "Video Generation",
        icon: VideoIcon,
        color: "text-orange-500",
        bgColor: "bg-orange-500/10",
    },
    {
        label: "Music Generation",
        icon: Music4,
        color: "text-rose-700",
        bgColor: "bg-rose-500/10",
    },
    {
        label: "Code Generation",
        icon: Code2,
        color: "text-emerald-500",
        bgColor: "bg-emerald-500/10",
    },
];

export const ProModal = () => {
    const { getToken } = useAuth();
    const proModal = useProModal();
    const [loading, setLoading] = useState(false);

    const onSubscribe = async () => {
        try {
            setLoading(true);
            const token = await getToken();
            const response = await axios.get(`${domainUrl}/api/stripe`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            window.location.href = response.data.url;
        } catch (error) {
            toast.error("Something went wrong");
            console.log(error, "STRIPE_CLIENT_ERROR");
        } finally {
            setLoading(false);
        }
    }

    return (
        <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
                        <div className="flex items-center gap-x-2 font-bold py-1">
                            Premium Plan for cleverly.ai
                            <Badge className="uppercase text-sm py-1" variant="premium">Pro</Badge>
                        </div>
                    </DialogTitle>
                    <DialogDescription className="text-center pt-2 space-y-2 text-zinc-900 font-medium">
                        {tools.map((tool) => (
                            <Card key={tool.label} className="p-3 border-black/5 flex items-center justify-between">
                                <div className="flex items-center gap-x-4">
                                    <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                                        <tool.icon className={cn("w-6 h-6", tool.color)} />
                                    </div>
                                    <div className="font-semibold text-sm">
                                        {tool.label}
                                    </div>
                                </div>
                                <Check className="text-primary w-5 h-5" />
                            </Card>
                        ))}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button disabled={loading} onClick={onSubscribe} size="lg" variant="premium" className="w-full">
                        Upgrade<ChevronsUp className=" ml-0.5" />
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}