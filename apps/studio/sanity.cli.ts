import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
  api: {
    projectId: 'u8g9bo5v',
    dataset: 'production',
  },
  deployment: {
    autoUpdates: false,
  },
});
