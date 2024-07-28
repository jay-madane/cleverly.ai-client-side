import axios from "axios";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

import { domainUrl } from "@/domain";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const fetchData = async (getToken: any, setApiLimitCount: any, setIsPremium: any) => {
  try {
    const token = await getToken();
    const [apiLimitCountResponse, isPremiumResponse] = await Promise.all([
      axios.get(`${domainUrl}/api/get-api-limit-count`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }),
      axios.get(`${domainUrl}/api/check-subscription`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
    ]);

    setApiLimitCount(apiLimitCountResponse.data.count);
    setIsPremium(isPremiumResponse.data.isValid);
  } catch (error) {
    console.error('Error fetching data', error);
  }
}