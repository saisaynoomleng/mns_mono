'use client';

import { PageBreadcrumb } from '@/components/PageBreadcrumb';
import { useTRPC } from '@/components/Provider';
import { Bounded, CreateServiceForm, SectionTitle, toast } from '@mns/ui';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { ServiceTable } from './_components/ServiceTable';
import { ServicePageSkeleton } from '@/components/Skeletons';

const ServicePage = (): React.JSX.Element => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const { data, isPending, isError } = useQuery(
    trpc.services.list.queryOptions(),
  );

  const queryKey = trpc.services.list.queryKey();

  const invalidateQueries = async () => {
    await queryClient.invalidateQueries({
      queryKey,
    });
  };

  const createServiceAction = useMutation(
    trpc.services.create.mutationOptions({
      onSuccess: async (result) => {
        await invalidateQueries();
        toast.success(result.message);
      },

      onError: (result) => {
        toast.error(result.message);
      },
    }),
  );

  if (isPending) {
    return <ServicePageSkeleton />;
  }

  if (isError) {
    return (
      <Bounded as="main">
        <p className="font-semibold text-fs-500">
          Error Getting Services, try refresh the page.
        </p>
      </Bounded>
    );
  }

  const { data: serviceData } = data;

  return (
    <Bounded as="main">
      <PageBreadcrumb />

      <div className="space-y-4 md:space-y-6">
        <SectionTitle as="h1" size="sm">
          services
        </SectionTitle>

        <div className="max-w-100">
          <CreateServiceForm
            action={async (input) => createServiceAction.mutateAsync(input)}
            isPending={createServiceAction.isPending}
          />
        </div>

        <div className="max-w-100">
          <div className="max-w-100"></div>
        </div>

        {serviceData.length ? (
          <ServiceTable services={serviceData} />
        ) : (
          <p>There are no services yet, please create a service.</p>
        )}
      </div>
    </Bounded>
  );
};

export default ServicePage;
