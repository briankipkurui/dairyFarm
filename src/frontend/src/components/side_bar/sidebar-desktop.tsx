"use client";

import {Link, useLocation} from 'react-router-dom';
import {LogOut, MoreHorizontal} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {Separator} from '@/components/ui/separator';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';
import {SidebarItems} from '@/types';
import {SidebarButton} from './sidebar-button';

interface SidebarDesktopProps {
    sidebarItems: SidebarItems;
}

export function SidebarDesktop(props: SidebarDesktopProps) {
    const location = useLocation();
    // const navigate = useNavigate();


    return (

        <aside
            className='w-[270px] bg-green-600 text-white  max-w-xs h-screen fixed left-0 top-0 z-40 border-r font-bold'>
            <div className='h-full px-3 py-4'>
                <h3 className='mx-3 text-lg font-semibold text-foreground'>Easy Track</h3>
                <div className='mt-5'>
                    <div className='flex flex-col gap-1 w-full overflow-y-auto max-h-[calc(100vh-8rem)] '>
                        {props.sidebarItems.links.map((link, index) => (
                            <Link key={index} to={link.href}>
                                <SidebarButton
                                    variant={location.pathname === link.href ? 'secondary' : 'ghost'}
                                    // variant={isActive ? 'secondary' : 'ghost'}
                                    icon={link.icon}
                                    className='w-full'
                                >
                                    {link.label}
                                </SidebarButton>
                            </Link>
                        ))}
                        {props.sidebarItems.extras}
                    </div>
                    <div className='absolute left-0 bottom-3 w-full px-3  '>
                        <Separator className='absolute -top-3 left-0 w-full '/>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant='ghost' className='w-full justify-start'>
                                    <div className='flex justify-between items-center w-full'>
                                        <div className='flex gap-2'>
                                            <Avatar className='h-5 w-5'>
                                                <AvatarImage
                                                    src='https://github.com/briankipkurui/TutorialMobileApps/blob/main/Game-App/assets/images/background.png'/>
                                                <AvatarFallback>Max Programming</AvatarFallback>
                                            </Avatar>
                                            <span>more...</span>
                                        </div>
                                        <MoreHorizontal size={20}/>
                                    </div>
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className='mb-2 w-56 p-3 rounded-[1rem]'>
                                <div className='space-y-1'>
                                    {/* <SidebarButton onClick={() => navigate('/')} size='sm' icon={Settings} className='w-full'>
                    Account Settings
                  </SidebarButton> */}
                                    <SidebarButton
                                        size='sm'
                                        icon={LogOut}
                                        className='w-full'
                                        // onClick={signOut}
                                    >
                                        Log Out
                                    </SidebarButton>
                                </div>
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>
            </div>
        </aside>
    );
}
