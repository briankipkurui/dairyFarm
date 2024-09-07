'use client';

import {SidebarItems} from '@/types';
import {LogOut, Menu, MoreHorizontal, Settings, X} from 'lucide-react';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetTrigger,
} from '@/components/ui/sheet';
import {Button} from '@/components/ui/button';
import {SidebarButtonSheet as SidebarButton} from './sidebar-button';
import {Separator} from '@/components/ui/separator';
import {Drawer, DrawerContent, DrawerTrigger} from '@/components/ui/drawer';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import {useLocation, useNavigate} from 'react-router-dom';
import useLogout from '@/hooks/UseLogOut';
import useAuth from '@/hooks/useAuth';
import {jwtDecode} from "jwt-decode"

interface SidebarMobileProps {
    sidebarItems: SidebarItems;
}

export function SidebarMobile(props: SidebarMobileProps) {
    const {pathname} = useLocation();
    const navigate = useNavigate()


    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button size='icon' variant='ghost' className='fixed top-3 left-3'>
                    <Menu size={20}/>
                </Button>
            </SheetTrigger>
            <SheetContent side='left' className='px-3 py-4   bg-green-600'>
                <SheetHeader className='flex flex-row justify-between items-center space-y-0  '>
          <span className='text-lg font-semibold text-foreground mx-3'>
            Easy track
          </span>
                    <SheetClose asChild>
                        <Button className='h-7 w-7 p-0' variant='ghost'>
                            <X size={15}/>
                        </Button>
                    </SheetClose>
                </SheetHeader>
                <div className='h-full'>
                    <div className='flex flex-col gap-1 w-full overflow-y-auto max-h-[calc(100vh-8rem)]'>
                        {props.sidebarItems.links.map((link, idx) => (
                            <SidebarButton
                                variant={pathname === link.href ? 'secondary' : 'ghost'}
                                icon={link.icon}
                                className='w-full'
                                onClick={() => navigate(link.href)}
                            >
                                {link.label}
                            </SidebarButton>
                        ))}
                        {props.sidebarItems.extras}
                    </div>
                    <div className='absolute w-full bottom-4 px-1 left-0'>
                        <Separator className='absolute -top-3 left-0 w-full'/>
                        <Drawer>
                            <DrawerTrigger asChild>
                                <Button variant='ghost' className='w-full justify-start'>
                                    <div className='flex justify-between items-center w-full'>
                                        <div className='flex gap-2'>
                                            <Avatar className='h-5 w-5'>
                                                <AvatarImage
                                                    src='https://github.com/briankipkurui/TutorialMobileApps/blob/main/Game-App/assets/images/background.png'/>
                                                <AvatarFallback>More.......</AvatarFallback>
                                            </Avatar>
                                            <span>more...</span>
                                        </div>
                                        <MoreHorizontal size={20}/>
                                    </div>
                                </Button>
                            </DrawerTrigger>
                            <DrawerContent className='mb-2 p-2'>
                                <div className='flex flex-col space-y-2 mt-2'>
                                    <SidebarButton onClick={() => navigate('/')} size='sm' icon={Settings}
                                                   className='w-full'>
                                        Account Settings
                                    </SidebarButton>

                                    <SidebarButton size='sm' icon={LogOut} className='w-full'>
                                        Log Out
                                    </SidebarButton>
                                </div>
                            </DrawerContent>
                        </Drawer>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}
