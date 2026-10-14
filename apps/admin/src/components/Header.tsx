'use client';

import { SidebarTrigger } from '@mns/ui';
import React from 'react';

export const AdminHeader = (): React.JSX.Element => {
  return (
    <header className="p-2 shadow flex justify-between items-center rounded">
      <div>
        <SidebarTrigger />
      </div>
    </header>
  );
};
