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

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const formatSegment = (segment: string) =>
  segment.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());

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

        {lists.map((segment, i) => {
          const isLast = i === lists.length - 1;
          const isUUID = UUID_REGEX.test(segment);
          const href = `/${lists.slice(0, i + 1).join('/')}`;

          const label = isUUID
            ? `${formatSegment(lists[i - 1] ?? 'Record')} Details`
            : formatSegment(segment);

          return (
            <React.Fragment key={href}>
              <BreadcrumbSeparator />

              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={href}>{label}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
