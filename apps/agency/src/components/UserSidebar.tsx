'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@mns/ui';
import React from 'react';
import { SignOutButton } from './SignOutButton';
import Link from 'next/link';
import { IoSettingsSharp } from 'react-icons/io5';
import { MdOutlineHealthAndSafety, MdOutlinePayments } from 'react-icons/md';
import { LuMessageCircleWarning, LuMessageSquareHeart } from 'react-icons/lu';
import { TfiSupport } from 'react-icons/tfi';
import { useUserSessionContext } from './UserSessionProvider';
import Image from 'next/image';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { AiFillAppstore } from 'react-icons/ai';

const GENERAL_LINKS = [
  {
    name: 'Account Settings',
    href: '/user',
    icon: <IoSettingsSharp />,
  },
  {
    name: 'Share your thoughts',
    href: '/user/testimonials',
    icon: <LuMessageSquareHeart />,
  },
];

const BILLING_LINKS = [
  {
    name: 'Subscription',
    href: '/user/subscriptions',
    icon: <MdOutlineHealthAndSafety />,
  },
  {
    name: 'Payment History',
    href: '/user/payment-histories',
    icon: <MdOutlinePayments />,
  },
];

const APPLICATION_LINKS = [
  {
    name: 'Apps Hub',
    href: '/user/apps-hub',
    icon: <AiFillAppstore />,
  },
  {
    name: 'Report Issues',
    href: '/user/report-issues',
    icon: <LuMessageCircleWarning />,
  },
  {
    name: 'Feature Requests',
    href: '/user/feature-requests',
    icon: <TfiSupport />,
  },
];

const UserSidebar = (): React.JSX.Element | null => {
  const { session } = useUserSessionContext();
  const { open, isMobile } = useSidebar();
  const pathname = usePathname();

  if (!session) return null;

  const { user } = session;

  const userProfile = user.image
    ? user.image
    : `https://placehold.co/50?text=${user.name.charAt(0)}`;

  const isPlacehold = userProfile.includes('placehold.co');

  return (
    <Sidebar
      collapsible={isMobile ? 'offcanvas' : 'none'}
      variant="floating"
      className={clsx('sticky top-6', isMobile ? '' : 'border border-input/10')}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className={clsx('flex gap-x-2', open ? 'flex' : 'hidden')}>
              <Image
                src={userProfile}
                alt="user profile"
                width={50}
                height={50}
                className="rounded-full"
                unoptimized={isPlacehold}
              />

              <div className="space-y-1 text-fs-300 overflow-hidden">
                <p>{user.name}</p>
                <p className="truncate">{user.email}</p>
              </div>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center gap-x-2">
            General
          </SidebarGroupLabel>

          <SidebarMenu>
            {GENERAL_LINKS.map((l) => (
              <SidebarMenuItem key={l.name}>
                <SidebarMenuButton asChild isActive={pathname === l.href}>
                  <Link href={l.href}>
                    <span>{l.icon}</span>
                    <span>{l.name}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center gap-x-2">
            Billings
          </SidebarGroupLabel>

          <SidebarMenu>
            {BILLING_LINKS.map((l) => (
              <SidebarMenuItem key={l.name}>
                <SidebarMenuButton asChild isActive={pathname === l.href}>
                  <Link href={l.href}>
                    <span>{l.icon}</span>
                    <span>{l.name}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center gap-x-2">
            Applications
          </SidebarGroupLabel>

          <SidebarMenu>
            {APPLICATION_LINKS.map((l) => (
              <SidebarMenuItem key={l.name}>
                <SidebarMenuButton asChild isActive={pathname === l.href}>
                  <Link href={l.href}>
                    <span>{l.icon}</span>
                    <span>{l.name}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SignOutButton />
      </SidebarFooter>
    </Sidebar>
  );
};

export default UserSidebar;
