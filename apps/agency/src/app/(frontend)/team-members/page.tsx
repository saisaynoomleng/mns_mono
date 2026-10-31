import HandwritingTitle from '@/components/HandwritingTitle';
import { pageSEOQuery } from '@/lib/utils';
import { urlFor } from '@/sanity/image';
import { sanityFetch } from '@/sanity/live';
import { ALL_TEAM_MEMBERS_QUERY } from '@/sanity/queries';
import { Bounded, SectionTitle } from '@mns/ui';
import type { Metadata } from 'next';
import Image from 'next/image';
import React from 'react';

export async function generateMetadata(): Promise<Metadata> {
  const data = await pageSEOQuery('team-member-page');

  return {
    title: data?.title ?? '',
    description: data?.description ?? '',
  };
}

const TeamMembersPage = async (): Promise<React.JSX.Element> => {
  const { data: members } = await sanityFetch({
    query: ALL_TEAM_MEMBERS_QUERY,
    stega: false,
    perspective: 'published',
  });

  if (!members) {
    return <div>loading...</div>;
  }

  return (
    <Bounded as="main" size="md" isCentered>
      <div className="space-y-4 md:space-y-6">
        <SectionTitle as="h1" size="lg">
          Say hi to the <HandwritingTitle>crew.</HandwritingTitle>
        </SectionTitle>
        <p>
          We&apos;re the people who design, build and polish everything you see
          here. Come say hello, get to know who&apos;s on your side, and see
          who&apos;ll be plugging in with you.
        </p>
      </div>

      <div className="space-y-4 md:space-y-6">
        <div className="space-y-2 md:space-y-4 text-center">
          <SectionTitle as="h2" size="sm">
            The faces behind the code
          </SectionTitle>
          <p>
            Real people, real coffee habits, one shared goal: making your
            business run a little smoother.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 md:gap-6">
          {members.map((member) => (
            <div
              key={member._id}
              className="flex flex-col gap-y-4 text-center p-2 border border-input rounded-lg"
            >
              <div className="overflow-hidden">
                {member.imageUrl && (
                  <Image
                    src={urlFor(member.imageUrl).format('webp').url()}
                    alt={member.imageAlt ?? ''}
                    width={400}
                    height={400}
                    priority
                    className=""
                  />
                )}
              </div>

              <div className="flex flex-col gap-y-1">
                <p className="text-fs-300 font-semibold">{member.name}</p>
                <p>
                  {member.positions?.map((p, i) => {
                    const last =
                      member.positions && i === member.positions?.length - 1;

                    if (last) {
                      return <span key={i}>{p}</span>;
                    }

                    return <span key={i}>{p}, </span>;
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Bounded>
  );
};

export default TeamMembersPage;
