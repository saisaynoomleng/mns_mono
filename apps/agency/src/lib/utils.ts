import { sanityFetch } from '@/sanity/live';
import { PAGE_SEO_QUERY } from '@/sanity/queries';

export const pageSEOQuery = async (pageName: string) => {
  const params = {
    pageName,
  };

  const { data } = await sanityFetch({
    query: PAGE_SEO_QUERY,
    stega: false,
    perspective: 'published',
    params,
  });

  return data;
};
