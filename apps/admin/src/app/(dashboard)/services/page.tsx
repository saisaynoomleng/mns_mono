'use client';

import { PageBreadcrumb } from '@/components/PageBreadcrumb';
import { useTRPC } from '@/components/Provider';
import { Bounded, SectionTitle } from '@mns/ui';
import { useQueryClient } from '@tanstack/react-query';
import React from 'react';

const ServicePage = (): React.JSX.Element => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  return (
    <Bounded as="main">
      <PageBreadcrumb />

      <div className="space-y-4 md:space-y-6">
        <div className="space-y-2 md:space-y-4">
          <SectionTitle as="h1" size="sm">
            Main services
          </SectionTitle>
        </div>

        <div className="grid md:grid-cols-2 gap-y-4 md:gap-x-6">
          {/* all services lists */}
          <div className="flex flex-col gap-y-4"></div>

          {/* selected service plans */}
        </div>
      </div>
    </Bounded>
  );
};

export default ServicePage;
