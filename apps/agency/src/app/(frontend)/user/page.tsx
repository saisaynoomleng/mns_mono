'use client';

import { Bounded } from '@mns/ui';
import UserBasicInfo from './_components/BasicInfo';

const UsersPage = () => {
  return (
    <Bounded spacing="md" size="md" isCentered>
      <UserBasicInfo />
    </Bounded>
  );
};

export default UsersPage;
