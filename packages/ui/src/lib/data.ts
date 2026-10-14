import { fn } from 'storybook/test';

export const mockFormAction = fn(async () => {
  return {
    success: true,
    message: 'form submitted!',
  };
});
