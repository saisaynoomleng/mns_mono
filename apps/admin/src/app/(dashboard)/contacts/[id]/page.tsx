'use client';

import { PageBreadcrumb } from '@/components/PageBreadcrumb';
import { useTRPC } from '@/components/Provider';
import {
  Bounded,
  ReplyToContactForm,
  SectionTitle,
  Table,
  TableBody,
  TableCell,
  TableRow,
  toast,
} from '@mns/ui';
import {
  formatDateTimeUS,
  formatDateUS,
  formatPriceInUSD,
  toTitleCase,
} from '@mns/utils';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { ContactStatusBadge } from '../_components/ContactStatusBadge';
import { MutateContactStatus } from '../_components/MutateContactStatus';

const ContactDetailPage = () => {
  const params = useParams<{ id: string }>();
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const { data, isPending, isError } = useQuery(
    trpc.contacts.byId.queryOptions({
      id: params.id,
    }),
  );

  const mutateStatus = useMutation(
    trpc.contacts.changeContactStatus.mutationOptions({
      onSuccess: (result) => {
        toast.success(result.message);
      },

      onError: (result) => {
        toast.error(result.message);
      },
    }),
  );

  const replyToContact = useMutation(
    trpc.contacts.replyToContact.mutationOptions({
      onSuccess: (result) => {
        toast.success(result.message);
      },

      onError: (result) => {
        toast.success(result.message);
      },
    }),
  );

  const mutateStatusQueryKey = trpc.contacts.byId.queryKey({
    id: params.id,
  });

  const invalidateContactStatusQueryKey = () => {
    queryClient.invalidateQueries({ queryKey: mutateStatusQueryKey });
  };

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
    messages,
  } = data;

  return (
    <Bounded as="main" padding="none" spacing="md">
      <PageBreadcrumb />

      <div className="grid md:grid-cols-2 md:gap-x-6 gap-y-4">
        <SectionTitle as="h3" size="sm">
          Contact Detail
        </SectionTitle>
        <ContactStatusBadge status={status} className="col-span-full" />

        <div className="space-y-4 md:space-y-6">
          <Table className="caption-top table-fixed ">
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

          <MutateContactStatus
            action={async (input) => {
              const result = await mutateStatus.mutateAsync({
                id: params.id,
                status: input,
              });

              invalidateContactStatusQueryKey();

              return result;
            }}
          />
        </div>

        <div
          className="space-y-4 shadow p-2 rounded-lg
        "
        >
          <p className="font-semibold">Message</p>

          <p className="prose prose-md min-w-full">{message}</p>
        </div>
      </div>

      <div className="space-y-4">
        <SectionTitle as="h3" size="sm">
          Reply to Contact
        </SectionTitle>

        <ReplyToContactForm
          action={async (data) => {
            return await replyToContact.mutateAsync({
              id: data.id,
              subject: data.subject,
              message: data.message,
            });
          }}
          id={params.id}
          isPending={replyToContact.isPending}
        />
      </div>

      <div className="space-y-4">
        <SectionTitle as="h3" size="sm">
          Chat History
        </SectionTitle>

        <div className="flex gap-x-2 overflow-auto p-5">
          {messages.map((m) => (
            <div
              key={m.id}
              className="flex-1 max-w-100 p-2 shadow-lg flex flex-col gap-y-2 rounded-lg"
            >
              <div className="flex justify-between items-center text-fs-300">
                <p className="p-1 border w-fit rounded-lg border-muted">
                  {toTitleCase(m.direction)}
                </p>
                <p className="p-1 border w-fit rounded-lg border-muted">
                  {formatDateTimeUS(m.createdAt)}
                </p>
              </div>
              <p>
                Status:{' '}
                <span className="font-semibold">{toTitleCase(m.status)}</span>
              </p>

              <p className="prose prose-sm">{m.message}</p>
            </div>
          ))}
        </div>
      </div>
    </Bounded>
  );
};

export default ContactDetailPage;
