import { fn } from 'storybook/test';

export const mockFormAction = fn(async () => {
  return {
    success: true,
    message: 'form submitted!',
  };
});

export const mockAllServiceData = [
  {
    sanityId: '0af90c0f-1dda-4ec3-9ab5-8e64eabd99e6',
    createdAt: '2026-10-27T17:26:45Z',
    name: 'Plug & Play',
    status: 'active' as 'active' | 'no_longer_available',
  },
  {
    sanityId: '1e4a3006-9128-477b-b2ef-b6c012a94e15',
    createdAt: '2026-10-27T17:35:52Z',
    name: 'Enterprise',
    status: 'active' as 'active' | 'no_longer_available',
  },
  {
    sanityId: '25dfecff-dd30-4a5d-bf59-efa733a24f25',
    createdAt: '2026-10-27T17:36:40Z',
    name: 'Onboarding',
    status: 'active' as 'active' | 'no_longer_available',
  },
  {
    sanityId: 'asdfasdf-dd30-4a5d-bf59-efa733a24f25',
    createdAt: '2026-10-27T17:36:40Z',
    name: 'Test',
    status: 'no_longer_available' as 'active' | 'no_longer_available',
  },
];

export const mockSubscriptionServiceData = [
  {
    id: '08d5c209-da43-48c2-9740-a9e5aa260f7b',
    name: 'Plug & Play',
  },
  {
    id: 'eb7991f7-8326-4157-95c8-1a7375718546',
    name: 'Enterprise',
  },
];
