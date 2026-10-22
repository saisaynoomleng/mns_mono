'use client';

import { Bounded, SidebarTrigger, useSidebar } from '@mns/ui';
import UserBasicInfo from './_components/BasicInfo';
import UserChangeEmail from './_components/Email';
import UserUpdatePassword from './_components/UpdatePassword';
import { LinkAccounts } from './_components/LinkAccounts';
import UserAddress from './_components/Address';

const UsersPage = () => {
  const { isMobile } = useSidebar();

  return (
    <Bounded spacing="md">
      {isMobile ? (
        <div className="border w-fit text-primary border-primary/20">
          <SidebarTrigger />
        </div>
      ) : null}

      <UserBasicInfo />

      <UserAddress />

      <UserChangeEmail />

      <UserUpdatePassword />

      <LinkAccounts />
    </Bounded>
  );
};

export default UsersPage;
