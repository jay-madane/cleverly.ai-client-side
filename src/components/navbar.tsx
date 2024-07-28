import { UserButton } from "@clerk/clerk-react";

import MobileSideNav from "@/components/mobile-sidenav";

interface NavProps {
  apiLimitCount: number;
  isPremium: boolean;
}

const Navbar = ({
  apiLimitCount = 0,
  isPremium = false,
}: NavProps) => {

  return (
    <div className="flex items-center p-4">
      <MobileSideNav apiLimitCount={apiLimitCount} isPremium={isPremium} />
      <div className="flex w-full justify-end">
        <UserButton />
      </div>
    </div>
  );
}

export default Navbar;