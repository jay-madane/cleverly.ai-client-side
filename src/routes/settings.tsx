import React from "react";
import { Settings } from "lucide-react";
import { useAuth } from "@clerk/clerk-react"
import axios from "axios";

import Heading from "@/components/heading";
import { SubscriptionButton } from "@/components/subscription-btn";
import { domainUrl } from "@/domain";

const SettingsPage = () => {
    const { getToken } = useAuth();
    const [isPremium, setIsPremium] = React.useState(false);
    const [token, setToken] = React.useState("");

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const token = await getToken();
                setToken(token!);
                const isPremiumResponse = await axios.get(`${domainUrl}/api/check-subscription`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                setIsPremium(isPremiumResponse.data.isValid);
            } catch (error) {
                console.error('Error fetching data', error);
            }
        }
        fetchData();
    }, [getToken]);

    return (
        <div>
            <Heading
                title="Settings"
                description="Manage Account Settings"
                icon={Settings}
                iconColor="text-gray-600"
                bgColor="bg-gray-600/10"
            />
            <div className="px-4 lg:px-8 space-y-4">
                <div className="text-lg text-gray-900">
                    {isPremium ? "You are currently on a Premium Subscription" : "You are currently under free trial."}
                </div>
                <SubscriptionButton isPremium={isPremium} token={token} />
            </div>
        </div>
    );
}

export default SettingsPage;