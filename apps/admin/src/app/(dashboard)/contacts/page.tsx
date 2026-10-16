'use client';

import { PageBreadcrumb } from '@/components/PageBreadcrumb';
import { useTRPC } from '@/components/Provider';
import { SortBy } from '@/components/SortBy';
import {
  Bounded,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@mns/ui';
import { formatDateUS, replaceUnderscore, toTitleCase } from '@mns/utils';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React from 'react';

const ContactsPage = (): React.JSX.Element => {
  const trpc = useTRPC();

  const searchParams = useSearchParams();
  const page = searchParams.get('page');
  const sortOrder = searchParams.get('sortOrder');
  const sortBy = searchParams.get('sortBy');
  const limit = searchParams.get('limit');
  const search = searchParams.get('search');

  const { data, isPending, isError } = useQuery(
    trpc.contacts.list.queryOptions(),
  );

  if (isPending) {
    return <div>loading</div>;
  }

  if (isError) {
    return (
      <Bounded as="main" padding="none">
        Error getting the cotacts. Try reloading the page.
      </Bounded>
    );
  }

  const { data: allContacts } = data;

  const contactStatuses = allContacts.reduce(
    (acc, contact) => {
      acc[contact.status] += 1;

      return acc;
    },
    {
      new: 0,
      in_progress: 0,
      resolved: 0,
      spam: 0,
    },
  );

  return (
    <Bounded spacing="md">
      <PageBreadcrumb />

      <div className="flex gap-y-4 md:gap-x-6 flex-col md:flex-row">
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Total Contacts</CardTitle>
          </CardHeader>

          <CardContent>
            <p className="tabular-nums">2</p>
          </CardContent>
        </Card>

        {Object.entries(contactStatuses).map(([contact, count], i) => (
          <Card key={i} className="flex-1">
            <CardHeader>
              <CardTitle>
                Total {toTitleCase(replaceUnderscore(contact))} Contacts
              </CardTitle>

              <CardContent>
                <p className="tabular-nums">{count}</p>
              </CardContent>
            </CardHeader>
          </Card>
        ))}
      </div>

      {/* filters, query */}
      <div className="flex justify-between items-center">
        <div></div>

        <div className="flex gap-x-2 items-center">
          <SortBy
            lists={[
              { name: 'Name', href: 'name' },
              { name: 'Email', href: 'email' },
              { name: 'Date', href: 'createdAt' },
            ]}
            pathname="/contacts"
          />
        </div>
      </div>

      <Table className="caption-top table-fixed">
        <TableCaption>All Contacts</TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Date</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {allContacts.map((contact) => (
            <TableRow key={contact.id}>
              <TableCell>
                <Link href={`/contacts/${contact.id}`}>
                  {toTitleCase(contact.name)}
                </Link>
              </TableCell>

              <TableCell>{contact.email}</TableCell>

              <TableCell>
                {toTitleCase(replaceUnderscore(contact.status))}
              </TableCell>

              <TableCell className="text-right">
                {formatDateUS(contact.createdAt)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Bounded>
  );
};

export default ContactsPage;
