import { AgencyFooter } from '@/components/AgencyFooter';
import AgencyHeader from '@/components/AgencyHeader';
import { QueryProvider } from '@/components/QueryProvider';
import { sanityFetch } from '@/sanity/live';
import { HEADER_QUERY } from '@/sanity/queries';
import { Toaster } from '@mns/ui';

const FrontendLayout = async ({ children }: LayoutProps<'/'>) => {
  const { data: header } = await sanityFetch({
    query: HEADER_QUERY,
    stega: false,
    perspective: 'published',
  });

  if (!header) return null;

  return (
    <QueryProvider>
      <div className="w-full">
        <AgencyHeader header={header} />
        {children}
        <AgencyFooter />
      </div>

      <Toaster closeButton duration={3000} position="top-center" richColors />
    </QueryProvider>
  );
};

export default FrontendLayout;
