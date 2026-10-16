import { ListContactByIdOutputType } from '@mns/api/types';

type Status = NonNullable<ListContactByIdOutputType['status']>;

export const CONTACT_STATUS_COLOR: Record<Status, string> = {
  new: '#009f79',
  in_progress: '#223e58',
  resolved: '#db2358',
  spam: '#b12724',
} as const;
