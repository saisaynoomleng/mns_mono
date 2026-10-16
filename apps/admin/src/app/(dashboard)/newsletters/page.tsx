'use client';

import { PageBreadcrumb } from '@/components/PageBreadcrumb';
import { useTRPC } from '@/components/Provider';
import { NewslettersPageSkeleton } from '@/components/Skeletons';
import { queryKeys } from '@/lib/querykeys';
import {
  Bounded,
  SendProductEmailForm,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  toast,
} from '@mns/ui';
import { formatDateUS } from '@mns/utils';
import { useMutation, useQuery } from '@tanstack/react-query';
import { NewsletterSortby } from './_components/SortBy';
import { useSearchParams } from 'next/navigation';
import { NewsletterSortOrder } from './_components/SortOrder';
import { NewsletterSearch } from './_components/Search';

const NewsletterPage = () => {
  const trpc = useTRPC();

  const searchParams = useSearchParams();
  const page = searchParams.get('page');
  const sortOrder = searchParams.get('sortOrder');
  const sortBy = searchParams.get('sortBy');
  const search = searchParams.get('search');
  const limit = searchParams.get('limit');

  const { data, isPending, isError } = useQuery(
    trpc.newsletters.list.queryOptions(),
  );

  const sendEmailAction = useMutation(
    trpc.newsletters.sendProductUpdateEmail.mutationOptions({
      onSuccess: (result) => {
        if (!result.success) {
          toast.error(result.message);
          return;
        }

        toast.success(result.message);
      },

      onError: (ctx) => {
        toast.error(ctx.message);
      },
    }),
  );

  if (isPending) {
    return <NewslettersPageSkeleton />;
  }

  if (isError) {
    return (
      <Bounded>
        <p>Error getting newsletters. Try refreshing a page</p>
      </Bounded>
    );
  }

  const { data: newsletters } = data;

  return (
    <Bounded padding="none" spacing="sm">
      <PageBreadcrumb />

      <div className="grid md:grid-cols-[auto_1fr] gap-4 md:gap-6 items-start">
        <div className="border border-muted rounded-lg p-2">
          <p className="font-semibold ">Total Subscribers</p>
          <p className="tabular-nums">total</p>
        </div>

        <SendProductEmailForm
          action={async (input) => {
            const result = await sendEmailAction.mutateAsync(input);

            return result;
          }}
          isPending={sendEmailAction.isPending}
        />
      </div>

      {/* sort and query */}
      <div className="flex md:justify-between md:items-center flex-col md:flex-row gap-y-4">
        {/* query */}
        <NewsletterSearch />

        {/* sort */}
        <div className="flex gap-x-2">
          <NewsletterSortby />
          <NewsletterSortOrder />
        </div>
      </div>

      <Table className="caption-top border-collapse table-fixed ">
        <TableCaption>Active Subscribers</TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>No.</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className="text-right">Subscribed On</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {newsletters.map((n, i) => (
            <TableRow key={n.id}>
              <TableCell>{i + 1}</TableCell>
              <TableCell>{n.email}</TableCell>
              <TableCell className="text-right">
                {formatDateUS(n.createdAt)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* pagination */}
    </Bounded>
  );
};

export default NewsletterPage;
