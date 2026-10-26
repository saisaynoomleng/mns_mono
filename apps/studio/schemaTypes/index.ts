import { appsType } from './documents/appsType';
import { capabilityType } from './documents/capabilityType';
import { chatBubbleType } from './documents/chatBubbleType';
import { faqsType } from './documents/faqsType';
import { pageType } from './documents/pageType';
import { portfolioType } from './documents/portfolioType';
import { serviceType } from './documents/serviceType';
import { subscriptionPlanType } from './documents/subscriptionPlanType';
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
import { siteSettingType } from './singletons/siteSettingType';

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
  appsType,
  serviceType,
  subscriptionPlanType,

  // singletons
  siteSettingType,
];
