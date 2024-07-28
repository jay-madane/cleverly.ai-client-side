import { useEffect, useState } from 'react';
import { Menu } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import SideNav from '@/components/side-nav';

interface MobileSideNavProps {
    apiLimitCount: number;
    isPremium: boolean;
}

const MobileSideNav = ({
    apiLimitCount = 0,
    isPremium = false,
}: MobileSideNavProps) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <Sheet>
            <SheetTrigger>
                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu />
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0">
                <SideNav apiLimitCount={apiLimitCount} isPremium={isPremium} />
            </SheetContent>
        </Sheet>
    );
}

export default MobileSideNav;