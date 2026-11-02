'use client';

import { PageBreadcrumb } from '@/components/PageBreadcrumb';
import { useTRPC } from '@/components/Provider';
import {
  Bounded,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CreateServiceForm,
  SectionTitle,
  toast,
} from '@mns/ui';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react';

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
    return <div>loading...</div>;
  }

  if (isError) {
    return <div>cannot get services</div>;
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
          <div className="max-w-100">
            <CreateServiceForm
              action={async (input) => createServiceAction.mutateAsync(input)}
              isPending={createServiceAction.isPending}
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-y-4 md:gap-x-6">
          {/* all services lists */}
          <div className="space-y-2">
            <p>services</p>
            {serviceData.length ? (
              serviceData.map((s) => (
                <div className="space-y-2" key={s.id}>
                  <p>{s.name}</p>
                </div>
              ))
            ) : (
              <p>No services data, create one?</p>
            )}
          </div>

          {/* selected service plans */}
        </div>
      </div>
    </Bounded>
  );
};

export default ServicePage;
