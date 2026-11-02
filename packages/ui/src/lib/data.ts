import { fn } from 'storybook/test';

export const mockFormAction = fn(async () => {
  return {
    success: true,
    message: 'form submitted!',
  };
});

export const AllServiceData = [
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
