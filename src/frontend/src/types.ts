import { LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';
import { IconType } from 'react-icons';

export interface SidebarItems {
  links: Array<{
    label: string;
    href: string;
    icon?: LucideIcon | IconType;
    allowedPermissions?: string[];
  }>;
  extras?: ReactNode;
}
