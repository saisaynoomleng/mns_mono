'use client';

import { Bounded } from '@mns/ui';
import UserBasicInfo from './_components/BasicInfo';
import UserChangeEmail from './_components/Email';

const UsersPage = () => {
  return (
    <Bounded spacing="md" size="md" isCentered>
      <UserBasicInfo />

      <UserChangeEmail />
    </Bounded>
  );
};

export default UsersPage;
