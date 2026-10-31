'use client';

import { PageBreadcrumb } from '@/components/PageBreadcrumb';
import { useTRPC } from '@/components/Provider';
import {
  Bounded,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@mns/ui';
import { formatDateUS } from '@mns/utils';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

const TestimonialPage = () => {
  const trpc = useTRPC();

  const { data, isPending, isError } = useQuery(
    trpc.testimonials.list.queryOptions(),
  );

  if (isError) {
    return <div>error getting testimonials</div>;
  }

  if (isPending) {
    return <div>Loading...</div>;
  }

  const { data: testimonials } = data;

  return (
    <Bounded>
      <PageBreadcrumb />

      <Table className="caption-top border-collapse border-input">
        <TableCaption>All Testimonials</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {testimonials.map((t) => (
            <TableRow key={t.id}>
              <TableCell>{t.user?.name}</TableCell>
              <TableCell>{t.title}</TableCell>
              <TableCell>{t.status}</TableCell>
              <TableCell>{formatDateUS(t.createdAt)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Bounded>
  );
};

export default TestimonialPage;
