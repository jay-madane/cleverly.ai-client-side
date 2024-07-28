import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("1f087a5b-399c-4a22-a211-17c9a681bf2b");
  }, []);

  return null;
}