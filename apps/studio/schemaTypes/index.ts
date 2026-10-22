import { capabilityType } from './documents/capabilityType';
import { chatBubbleType } from './documents/chatBubbleType';
import { faqsType } from './documents/faqsType';
import { pageType } from './documents/pageType';
import { portfolioType } from './documents/portfolioType';
import { teamMemberType } from './documents/teamMemberType';
import {
  blockContent,
  faq,
  footerColumn,
  imageWithAlt,
  navDropdown,
  navLink,
  seo,
  socialLink,
  videoEmbedded,
} from './sharedTypes';

export const schemaTypes = [
  // shared
  imageWithAlt,
  blockContent,
  seo,
  socialLink,
  faq,
  videoEmbedded,
  navLink,
  navDropdown,
  footerColumn,

  // documents
  pageType,
  faqsType,
  capabilityType,
  chatBubbleType,
  portfolioType,
  teamMemberType,
];
