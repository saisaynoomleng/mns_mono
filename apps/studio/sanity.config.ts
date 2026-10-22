import { defineConfig, defineSingleton } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemaTypes';
import { media } from 'sanity-plugin-media';
import { structure } from './structure';

export default defineConfig({
  name: 'default',
  title: 'mns-mono',

  projectId: 'u8g9bo5v',
  dataset: 'production',

  plugins: [structureTool({ structure }), media(), visionTool()],

  schema: {
    types: schemaTypes,
  },

  document: {
    singletons: [
      defineSingleton({
        id: 'siteSetting',
        documentId: 'ab74cade-e077-4510-b893-aa5e33963949',
        schemaType: 'siteSetting',
        title: 'Settings',
      }),
    ],
  },
});
