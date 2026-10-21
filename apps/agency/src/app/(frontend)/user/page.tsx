'use client';

import { Bounded } from '@mns/ui';
import UserBasicInfo from './_components/BasicInfo';
import UserChangeEmail from './_components/Email';
import UserUpdatePassword from './_components/UpdatePassword';
import { LinkAccounts } from './_components/LinkAccounts';

const UsersPage = () => {
  return (
    <Bounded spacing="md" size="md" isCentered>
      <UserBasicInfo />

      <UserChangeEmail />

      <UserUpdatePassword />

      <LinkAccounts />
    </Bounded>
  );
};

export default UsersPage;
