import { Bounded, Button } from '@mns/ui';
import Link from 'next/link';
import React from 'react';

const NotFoundPage = (): React.JSX.Element => {
  return (
    <Bounded>
      NotFoundPage
      <Button asChild>
        <Link href="/">Back to Home</Link>
      </Button>
    </Bounded>
  );
};

export default NotFoundPage;
