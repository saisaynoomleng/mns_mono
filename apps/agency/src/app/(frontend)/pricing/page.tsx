import SubscriptionPlanCard from '@/components/SubscriptionPlanCard';
import { pageSEOQuery } from '@/lib/utils';
import { sanityFetch } from '@/sanity/live';
import { ALL_PRICING_QUERY } from '@/sanity/queries';
import { Bounded, Button, DashedTitle, SectionTitle } from '@mns/ui';
import { formatPriceInUSD, toTitleCase } from '@mns/utils';
import type { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';

export async function generateMetadata(): Promise<Metadata> {
  const data = await pageSEOQuery('pricing-page');

  return {
    title: data?.title ?? '',
    description: data?.description ?? '',
  };
}

const PricingPage = async (): Promise<React.JSX.Element> => {
  const { data: pricings } = await sanityFetch({
    query: ALL_PRICING_QUERY,
    stega: false,
    perspective: 'published',
  });

  if (!pricings) {
    return <div>loading...</div>;
  }

  const { onboarding } = pricings;

  return (
    <Bounded as="main" size="md" isCentered>
      <div className="space-y-2 md:space-y-4">
        <DashedTitle label="Pricings" />
        <SectionTitle as="h1">Simple plans. No plot twists.</SectionTitle>
        <p>
          Pick an app, pick a plan, and plug in. Need something built just for
          you? We&apos;ve got friendly plans for that too.
        </p>
      </div>

      <div className="space-y-2">
        <SectionTitle as="h2" size="sm">
          The easy-going fine print
        </SectionTitle>
        <p>
          Plans renew monthly on the same day. You can cancel anytime and keep
          your access until the end of the period you&apos;ve paid for. If you
          change plans, the switch kicks in next month. Payments are by card,
          handled safely through Stripe.
        </p>
        <Button asChild>
          <Link href="/contact-us">Talk to us</Link>
        </Button>
      </div>

      <div className="space-y-4 md:space-y-6">
        <div className="space-y-2 md:space-y-4 text-center">
          <SectionTitle as="h2" size="sm">
            Plug & play plans
          </SectionTitle>
          <p>
            Grab a ready-made app for your business and start playing right
            away. Every plan is billed monthly, and you can pick the one that
            fits your team.
          </p>
        </div>

        <div className="flex flex-col md:flex-row md:justify-center md:gap-x-6 gap-y-4">
          {pricings.plugs.map((plan) => (
            <SubscriptionPlanCard key={plan._id} plan={plan} />
          ))}
        </div>
      </div>

      <div className="space-y-4 md:space-y-6">
        <div className="space-y-2 md:space-y-4 text-center">
          <SectionTitle as="h2" size="sm">
            Care plans for custom sites
          </SectionTitle>
          <p>
            Got a custom website built by us? These plans keep it fresh, healthy
            and humming after launch. They start once your site is finished, so
            you&apos;ll always know where things stand.
          </p>
        </div>

        <div className="flex flex-col md:flex-row md:justify-center md:gap-x-6 gap-y-4">
          {pricings.enterprises.map((plan) => (
            <SubscriptionPlanCard key={plan._id} plan={plan} />
          ))}
        </div>
      </div>

      <div className="space-y-4 md:space-y-6">
        <div className="space-y-2 md:space-y-4 text-center">
          <SectionTitle as="h2" size="sm">
            Quick setup, one time only
          </SectionTitle>
          <p>
            Want us to load your starting data so everything&apos;s ready on day
            one? Onboarding is a single one-time fee, not a monthly one. Pay
            once and you&apos;re all set.
          </p>
        </div>

        <div className="flex flex-col gap-y-4 p-2 border border-input rounded-lg w-fit">
          <p className="text-fs-500 font-semibold">
            {toTitleCase(onboarding?.name as string)}
          </p>
          <p>{onboarding?.slogan}</p>
          {onboarding?.price && (
            <p className="font-semibold text-primary">
              {formatPriceInUSD(onboarding.price)}
            </p>
          )}
        </div>
      </div>
    </Bounded>
  );
};

export default PricingPage;
