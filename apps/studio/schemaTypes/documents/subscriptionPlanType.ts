import { formatPriceInUSD, toTitleCase } from '@mns/utils';
import { BiSolidCategoryAlt } from 'react-icons/bi';
import { defineType, defineField } from 'sanity';

export const subscriptionPlanType = defineType({
  name: 'subscriptionPlan',
  type: 'document',
  icon: BiSolidCategoryAlt,
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'name' },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'pricePerMonth',
      type: 'number',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'includedFeatures',
      title: 'Included Features',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'notIncludedFeatures',
      title: 'NOT included features',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'service',
      type: 'reference',
      to: [{ type: 'service' }],
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      name: 'name',
      price: 'pricePerMonth',
      service: 'service.name',
    },
    prepare({ name, service, price }) {
      const formatName = name ? toTitleCase(name) : 'Name not provided';
      const formatPrice = price
        ? formatPriceInUSD(price)
        : 'Price per month not specified';
      const formatService = service
        ? toTitleCase(service)
        : 'Service not specified';

      return {
        title: formatName,
        subtitle: `Price: ${formatPrice}/month | Service: ${formatService}`,
        media: BiSolidCategoryAlt,
      };
    },
  },
});
