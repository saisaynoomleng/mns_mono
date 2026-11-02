import { Bounded, Skeleton } from '@mns/ui';

export const NewslettersPageSkeleton = () => {
  return (
    <div>
      <div className="grid md:grid-cols-2 gap-x-4">
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

export const ServicePageSkeleton = () => {
  return (
    <Bounded as="main">
      <Skeleton className="w-full h-10" />

      <div className="grid md:grid-cols-2 gap-x-4">
        <Skeleton className="w-full h-50" />
        <Skeleton className="w-full h-50" />
      </div>

      <div className="grid md:grid-cols-2 gap-x-4">
        <Skeleton className="w-full h-150" />
        <Skeleton className="w-full h-150" />
      </div>
    </Bounded>
  );
};
