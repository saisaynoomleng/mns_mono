import { Skeleton } from '@mns/ui';

export const NewslettersPageSkeleton = () => {
  return (
    <div>
      <div className="grid md:grid-cols-2">
        <Skeleton className="w-full h-50" />
        <Skeleton className="w-full h-50" />
      </div>

      <div className="space-y-6">
        <Skeleton className="w-full h-20" />
        <Skeleton className="w-full h-20" />
        <Skeleton className="w-full h-20" />
        <Skeleton className="w-full h-20" />
        <Skeleton className="w-full h-20" />
      </div>
    </div>
  );
};
