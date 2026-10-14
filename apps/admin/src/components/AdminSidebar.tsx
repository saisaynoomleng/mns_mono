'use client';

import {
  Logo,
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
import Link from 'next/link';
import React from 'react';
import { SignOutButton } from './SignOutButton';
import { FaCcMastercard, FaNewspaper, FaUsers } from 'react-icons/fa';
import {
  MdDesignServices,
  MdOutlineContactSupport,
  MdOutlineHealthAndSafety,
  MdReviews,
} from 'react-icons/md';
import { AiFillAppstore } from 'react-icons/ai';
import { TfiSupport } from 'react-icons/tfi';
import { LuMessageCircleWarning } from 'react-icons/lu';

const MARKETING_LINKS = [
  { label: 'Newsletters', href: '/newsletters', icon: <FaNewspaper /> },
  { label: 'Contacts', href: '/contacts', icon: <MdOutlineContactSupport /> },
  { label: 'Testimonials', href: '/testimonials', icon: <MdReviews /> },
];

const OPERATION_LINKS = [
  { label: 'Services', href: '/services', icon: <MdDesignServices /> },
  {
    label: 'Subscription Plans',
    href: '/subscription-plans',
    icon: <MdOutlineHealthAndSafety />,
  },
  {
    label: 'Payment Providers',
    href: '/payment-providers',
    icon: <FaCcMastercard />,
  },
];

const APPLICATION_LINKS = [
  { label: 'Applications', href: '/applications', icon: <AiFillAppstore /> },
  {
    label: 'Feature Requests',
    href: '/feature-requests',
    icon: <TfiSupport />,
  },
  {
    label: 'Issue Reports',
    href: '/issue-reports',
    icon: <LuMessageCircleWarning />,
  },
];

const USER_LINKS = [{ label: 'Users', href: '/users', icon: <FaUsers /> }];

export const AdminSidebar = (): React.JSX.Element => {
  const { open: sidebarOpen } = useSidebar();

  return (
    <Sidebar collapsible="icon" variant="floating">
      <SidebarHeader>
        <Link href="/" className="w-fit mx-auto">
          {sidebarOpen ? <Logo size="md" /> : <Logo fullText={false} />}
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Operations</SidebarGroupLabel>
          <SidebarMenu>
            {OPERATION_LINKS.map((l) => (
              <SidebarMenuItem key={l.label}>
                <SidebarMenuButton asChild>
                  <Link href={l.href}>
                    {sidebarOpen ? (
                      <>
                        <span>{l.icon}</span>
                        <span>{l.label}</span>
                      </>
                    ) : (
                      <>
                        <span>{l.icon}</span>
                        <span className="sr-only">{l.label}</span>
                      </>
                    )}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Applications</SidebarGroupLabel>
          <SidebarMenu>
            {APPLICATION_LINKS.map((l) => (
              <SidebarMenuItem key={l.label}>
                <SidebarMenuButton asChild>
                  <Link href={l.href}>
                    {sidebarOpen ? (
                      <>
                        <span>{l.icon}</span>
                        <span>{l.label}</span>
                      </>
                    ) : (
                      <>
                        <span>{l.icon}</span>
                        <span className="sr-only">{l.label}</span>
                      </>
                    )}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Users</SidebarGroupLabel>
          <SidebarMenu>
            {USER_LINKS.map((l) => (
              <SidebarMenuItem key={l.label}>
                <SidebarMenuButton asChild>
                  <Link href={l.href}>
                    {sidebarOpen ? (
                      <>
                        <span>{l.icon}</span>
                        <span>{l.label}</span>
                      </>
                    ) : (
                      <>
                        <span>{l.icon}</span>
                        <span className="sr-only">{l.label}</span>
                      </>
                    )}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Marketing</SidebarGroupLabel>
          <SidebarMenu>
            {MARKETING_LINKS.map((l) => (
              <SidebarMenuItem key={l.label}>
                <SidebarMenuButton asChild>
                  <Link href={l.href}>
                    {sidebarOpen ? (
                      <>
                        <span>{l.icon}</span>
                        <span>{l.label}</span>
                      </>
                    ) : (
                      <>
                        <span>{l.icon}</span>
                        <span className="sr-only">{l.label}</span>
                      </>
                    )}
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
