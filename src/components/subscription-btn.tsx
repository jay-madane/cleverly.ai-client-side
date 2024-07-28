import axios from "axios";
import { useState } from "react";
import { ChevronsUp } from "lucide-react";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { domainUrl } from "@/domain";

interface SubscriptionButtonProps {
    isPremium: boolean;
    token: string;
}

export const SubscriptionButton = ({
    isPremium,
    token
}: SubscriptionButtonProps) => {
    const [loading, setLoading] = useState(false);

    const onClick = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${domainUrl}/api/stripe`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            window.location.href = response.data.url;
        } catch (error) {
            toast.error("Something went wrong");
            console.log("BILLING_ERROR", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Button className="bg-stone-700 text-white hover:bg-stone-800" disabled={loading} variant={isPremium ? null : "premium"} onClick={onClick}>
            {isPremium ? 'Manage Subscription' : 'Go Premium'}
            {!isPremium && <ChevronsUp className="ml-0.5" />}
        </Button>
    );
}