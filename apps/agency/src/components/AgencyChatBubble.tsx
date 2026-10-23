import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Bounded,
  Bubble,
  BubbleContent,
  Message,
  MessageAvatar,
  MessageContent,
  MessageHeader,
} from '@mns/ui';
import React from 'react';
import { CONTACT_PAGE_QUERY_RESULT } from '@/sanity/types';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import { urlFor } from '@/sanity/image';
import { env } from '@/lib/env/client';

type ChatBubbleProps = {
  className?: string;
  bubbles: NonNullable<CONTACT_PAGE_QUERY_RESULT>['chatBubble'];
};

export const AgencyChatBubble = ({
  className,
  bubbles,
}: ChatBubbleProps): React.JSX.Element => {
  return (
    <Bounded size="full" className={twMerge(clsx('', className))}>
      {bubbles?.messages?.map((m) => (
        <React.Fragment key={m._key}>
          <Message align="end">
            <MessageAvatar>
              <Avatar>
                <AvatarImage
                  src={env.NEXT_PUBLIC_CLIENT_IMAGE_URL}
                  alt="client photo"
                />
                <AvatarFallback>Client</AvatarFallback>
              </Avatar>
            </MessageAvatar>

            <MessageContent>
              <MessageHeader>You</MessageHeader>
              <Bubble>
                <BubbleContent className="bg-brand-primary-300!">
                  {m.inbound}
                </BubbleContent>
              </Bubble>
            </MessageContent>
          </Message>

          <Message>
            <MessageAvatar>
              <Avatar>
                <AvatarImage
                  src={env.NEXT_PUBLIC_MNS_STAFF_IMAGE_URL}
                  alt="mns staff photo"
                />
                <AvatarFallback>mns.</AvatarFallback>
              </Avatar>
            </MessageAvatar>

            <MessageContent>
              <MessageHeader>mns.</MessageHeader>
              <Bubble>
                <BubbleContent className="bg-brand-secondary-300!">
                  {m.outbound}
                </BubbleContent>
              </Bubble>
            </MessageContent>
          </Message>
        </React.Fragment>
      ))}
    </Bounded>
  );
};
