import { AgencyFooter } from '@/components/AgencyFooter';
import { QueryProvider } from '@/components/QueryProvider';
import { Toaster } from '@mns/ui';

const FrontendLayout = ({ children }: LayoutProps<'/'>) => {
  return (
    <QueryProvider>
      <div className="w-full">
        {children}
        <AgencyFooter />
      </div>

      <Toaster closeButton duration={3000} position="top-center" richColors />
    </QueryProvider>
  );
};

export default FrontendLayout;
