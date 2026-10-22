import { AgencyFooter } from '@/components/AgencyFooter';
import AgencyHeader from '@/components/AgencyHeader';
import { QueryProvider } from '@/components/QueryProvider';
import { SidebarProvider, Toaster } from '@mns/ui';

const FrontendLayout = ({ children }: LayoutProps<'/'>) => {
  return (
    <QueryProvider>
      <SidebarProvider>
        <div className="w-full">
          <AgencyHeader />
          {children}
          <AgencyFooter />
        </div>

        <Toaster closeButton duration={3000} position="top-center" richColors />
      </SidebarProvider>
    </QueryProvider>
  );
};

export default FrontendLayout;
