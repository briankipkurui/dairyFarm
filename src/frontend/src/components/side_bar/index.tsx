'use client';

import {
    UserCog,
    ShoppingBasket,
    KeyRound,
    HandPlatter,
    Warehouse,
    Layers,
    Layers2,
    CircleDollarSign,
    BusFront,
    Car,
    UsersRound,
    ShieldAlert
} from 'lucide-react';
import {SidebarDesktop} from './sidebar-desktop';
import {SidebarItems} from '@/types';
import {useMediaQuery} from 'usehooks-ts';
import {SidebarMobile} from './sidebar-mobile';
import { GiBarn,GiFlake,GiHeadshot } from "react-icons/gi"


const sidebarItems: SidebarItems = {
    links: [

        {
            label: 'Cattle',
            href: '/cattle',
            icon: GiHeadshot,
        },
        {
            label: 'Breeds',
            href: '/breeds',
            icon: GiFlake,
        },
        {
            label: 'Livestock',
            href: '/livestock',
            icon: GiBarn,
        },


    ],
    extras: (
        <div className='flex flex-col gap-2'>
            {/* <SidebarButton icon={MoreHorizontal} className='w-full'>
        More
      </SidebarButton> */}
            {/* <SidebarButton
        className='w-full justify-center text-white'
        variant='default'
      >
        Tweet
      </SidebarButton> */}
        </div>
    ),
};


export function Sidebar() {
    const isDesktop = useMediaQuery('(min-width: 640px)', {
        initializeWithValue: false,
    });

    if (isDesktop) {
        return <SidebarDesktop sidebarItems={sidebarItems}/>;
    }

    return <SidebarMobile sidebarItems={sidebarItems}/>;
}
