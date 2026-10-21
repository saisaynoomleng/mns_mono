'use client';

import { Bounded } from '@mns/ui';
import UserBasicInfo from './_components/BasicInfo';
import UserChangeEmail from './_components/Email';
import UserUpdatePassword from './_components/UpdatePassword';

const UsersPage = () => {
  return (
    <Bounded spacing="md" size="md" isCentered>
      <UserBasicInfo />

      <UserChangeEmail />

      <UserUpdatePassword />
    </Bounded>
  );
};

export default UsersPage;
