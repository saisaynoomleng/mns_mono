'use client';

import { PageBreadcrumb } from '@/components/PageBreadcrumb';
import { useTRPC } from '@/components/Provider';
import {
  Bounded,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableRow,
} from '@mns/ui';
import { formatDateUS, formatPriceInUSD, toTitleCase } from '@mns/utils';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { ContactStatusBadge } from '../_components/ContactStatusBadge';

const ContactDetailPage = () => {
  const params = useParams<{ id: string }>();
  const trpc = useTRPC();

  const { data, isPending, isError } = useQuery(
    trpc.contacts.byId.queryOptions({
      id: params.id,
    }),
  );

  if (isPending) {
    return <div>Loading</div>;
  }

  if (isError) {
    return <Bounded as="main">Unable to get the contact detail</Bounded>;
  }

  const {
    name,
    status,
    email,
    companyName,
    position,
    createdAt,
    minBudget,
    maxBudget,
    message,
  } = data;

  return (
    <Bounded as="main" padding="none" spacing="md">
      <PageBreadcrumb />

      <div className="grid md:grid-cols-[auto_1fr] md:gap-x-6 gap-y-4">
        <ContactStatusBadge status={status} className="col-span-full" />

        <div className="space-y-2">
          <Table className="caption-top table-fixed max-w-100 md:max-w-130">
            <TableCaption>Contact Details</TableCaption>

            <TableBody>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>{toTitleCase(name)}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Email</TableCell>
                <TableCell>{email}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Company Name</TableCell>
                <TableCell>{companyName ? companyName : '-'}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Position</TableCell>
                <TableCell>{position ? toTitleCase(position) : '-'}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Minimum Budget</TableCell>
                <TableCell>{formatPriceInUSD(minBudget)}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Maximum Budget</TableCell>
                <TableCell>{formatPriceInUSD(maxBudget)}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Contacted Date</TableCell>
                <TableCell>{formatDateUS(createdAt)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <div
          className="space-y-4 shadow p-2 rounded-lg
        "
        >
          <p className="font-semibold">Message</p>

          <p className="prose prose-md min-w-full">{message}</p>
        </div>
      </div>
    </Bounded>
  );
};

export default ContactDetailPage;
