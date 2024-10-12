'use client';

import {
    Package,
    DollarSign,
    Layout,
    Coins,
    KeyRound
} from 'lucide-react';
import {SidebarDesktop} from './sidebar-desktop';
import {SidebarItems} from '@/types';
import {useMediaQuery} from 'usehooks-ts';
import {SidebarMobile} from './sidebar-mobile';
import { GiBarn,GiFlake,GiHeadshot } from "react-icons/gi"


const sidebarItems: SidebarItems = {
    links: [
        {
            label: 'DashBoard',
            href: '/dashBoard',
            icon: Layout,
        },
        {
            label: 'ValueChain',
            href: '/valueChains',
            icon: Layout,
        },
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
            label: 'LivestockType',
            href: '/livestock',
            icon: GiBarn,
        },
        {
            label: 'FeedsTypes',
            href: '/feedsTypes',
            icon: Package,
        },
        {
            label: 'FeedingFormulas',
            href: '/feedingFormulas',
            icon: Package,
        },
        {
            label: 'FeedingRecords',
            href: '/feedingRecords',
            icon: Package,
        },
        {
            label: 'IncomeTypes',
            href: '/incomeTypes',
            icon: Coins,
        },
        {
            label: 'ExpenseTypes',
            href: '/expenseTypes',
            icon: Coins,
        },
        {
            label: 'Incomes',
            href: '/incomes',
            icon: Coins,
        },
        {
            label: 'Expenses',
            href: '/expenses',
            icon: Coins,
        },
        {
            label: 'Roles',
            href: '/roles',
            icon: Coins,
        },
        {
            label: 'Permissions',
            href: '/permissions',
            icon: KeyRound,
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
