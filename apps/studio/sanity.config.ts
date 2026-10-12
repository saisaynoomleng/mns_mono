import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemaTypes';
import { media } from 'sanity-plugin-media';

export default defineConfig({
  name: 'default',
  title: 'mns-mono',

  projectId: 'u8g9bo5v',
  dataset: 'production',

  plugins: [structureTool(), media(), visionTool()],

  schema: {
    types: schemaTypes,
  },
});
