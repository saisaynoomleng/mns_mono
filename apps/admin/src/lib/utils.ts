import { ListContactByIdOutputType } from '@mns/api/types';

type Status = NonNullable<ListContactByIdOutputType['status']>;

export const CONTACT_STATUS_COLOR: Record<Status, string> = {
  new: '#26547c',
  in_progress: '#223e58',
  resolved: '#007f64',
  spam: '#b12724',
} as const;
