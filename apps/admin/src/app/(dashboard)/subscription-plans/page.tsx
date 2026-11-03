'use client';

import { PageBreadcrumb } from '@/components/PageBreadcrumb';
import { useTRPC } from '@/components/Provider';
import {
  Bounded,
  CreateSubscriptionForm,
  SectionTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  toast,
} from '@mns/ui';
import { formatDateUS } from '@mns/utils';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react';

const SubscriptionPlansPage = (): React.JSX.Element => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const serviceQueryKey = trpc.services.list.queryKey();

  const {
    data: services,
    isPending: servicePending,
    isError: serviceError,
  } = useQuery(trpc.services.list.queryOptions());

  const {
    data: plans,
    isPending: plansPending,
    isError: plansError,
  } = useQuery(trpc.subscriptionPlan.list.queryOptions());

  const invalidateQueries = async () => {
    await queryClient.invalidateQueries({
      queryKey: serviceQueryKey,
    });
  };

  const createPlanAction = useMutation(
    trpc.subscriptionPlan.create.mutationOptions({
      onSuccess: async (result) => {
        await invalidateQueries();
        toast.success(result.message);
      },

      onError: (result) => {
        toast.error(result.message);
      },
    }),
  );

  if (servicePending || plansPending) {
    return <div>Loading...</div>;
  }

  if (serviceError || plansError) {
    return <div>Cannot get services</div>;
  }

  const { data: servicesData } = services;
  const { data: planData } = plans;

  return (
    <Bounded as="main">
      <PageBreadcrumb />

      <SectionTitle as="h1" size="sm">
        Subscription Plans
      </SectionTitle>

      <CreateSubscriptionForm
        action={async (input) => createPlanAction.mutateAsync(input)}
        services={servicesData}
        isPending={createPlanAction.isPending}
      />

      <div className="space-y-4 md:space-y-6">
        <SectionTitle as="h2" size="sm">
          All Plans
        </SectionTitle>

        {planData.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Service Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-left">Created On</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {planData.map((plan) => (
                <TableRow key={plan.id}>
                  <TableCell>{plan.name}</TableCell>
                  <TableCell>{plan.service?.name}</TableCell>
                  <TableCell>{plan.status}</TableCell>
                  <TableCell>
                    {plan.createdAt && formatDateUS(plan.createdAt)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p>No plans to display yet</p>
        )}
      </div>
    </Bounded>
  );
};

export default SubscriptionPlansPage;
