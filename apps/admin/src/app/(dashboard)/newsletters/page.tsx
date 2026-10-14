'use client';

import { PageBreadcrumb } from '@/components/PageBreadcrumb';
import { useTRPC } from '@/components/Provider';
import { NewslettersPageSkeleton } from '@/components/Skeletons';
import { queryKeys } from '@/lib/querykeys';
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

const NewsletterPage = () => {
  const trpc = useTRPC();

  const { data, isPending, isError } = useQuery(
    trpc.newsletters.list.queryOptions(),
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

      <div className="grid grid-cols-[auto_1fr] p-2">
        <div className="border border-muted rounded-lg p-2">
          <p className="font-semibold ">Total Subscribers</p>
          <p className="tabular-nums">total</p>
        </div>

        <div></div>
      </div>

      {/* filter and query */}

      <Table className="caption-top border-collapse table-fixed">
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
