'use client';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@mns/ui';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

export const PageBreadcrumb = () => {
  const pathname = usePathname();

  const lists = pathname.split('/').filter(Boolean);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbSeparator />

        {lists.map((l, i) => {
          const isLast = i === lists.length - 1;

          if (!isLast) {
            return (
              <React.Fragment key={l}>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href={l} className="capitalize">
                      {l}
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbSeparator />
              </React.Fragment>
            );
          }

          return (
            <BreadcrumbItem key={l}>
              <BreadcrumbPage className="capitalize">{l}</BreadcrumbPage>
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
