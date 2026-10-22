import { env } from '@/lib/env/client';
import { Bounded, Button, SectionTitle } from '@mns/ui';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export const metadata: Metadata = {
  title: 'Not found',
};

const NotFoundPage = (): React.JSX.Element => {
  return (
    <Bounded
      size="md"
      isCentered
      className="flex justify-center items-center h-dvh flex-col md:flex-row md:gap-x-6"
    >
      <div className="flex flex-col gap-y-4">
        <p className="text-fs-800 md:text-fs-900 font-black text-primary">
          404
        </p>
        <SectionTitle as="h1" size="md" className="">
          Opps...
        </SectionTitle>
        <p>The resource you are looking for isn't found</p>
        <Button asChild>
          <Link href="/">Back to Home</Link>
        </Button>
      </div>

      <div className="overflow-hidden w-100 aspect-square relative">
        <Image
          src={`${env.NEXT_PUBLIC_NOT_FOUND_IMAGE_URL}`}
          alt="not found image"
          fill
          sizes="(max-width: 400px) 100vw,66vw"
          className="min-w-full object-contain"
        />
      </div>
    </Bounded>
  );
};

export default NotFoundPage;
