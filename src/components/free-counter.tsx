import { useEffect, useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ChevronsUpIcon } from "lucide-react";
import { useProModal } from "@/hooks/use-pro-modal";

interface FreeCounterProps {
    apiLimitCount: number;
    isPremium: boolean;
}

const MAX_FREE_COUNTS = 5;

export const FreeCounter = ({
    apiLimitCount,
    isPremium,
}: FreeCounterProps) => {
    const [mounted, setMounted] = useState(false);
    const proModal = useProModal();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    if (isPremium) {
        return null;
    }

    return (
        <div className="px-3">
            <Card className="bg-white/10 border-0">
                <CardContent className="py-6">
                    <div className="text-sm text-center text-white mb-4 space-y-2">
                        <p>{apiLimitCount} / {MAX_FREE_COUNTS} Free Queries</p>
                        <Progress
                            className="h-3"
                            value={(apiLimitCount / MAX_FREE_COUNTS) * 100}
                        />
                    </div>
                    <Button onClick={proModal.onOpen} className="w-full" variant="premium">
                        Premium Plan<ChevronsUpIcon className="ml-2" />
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}