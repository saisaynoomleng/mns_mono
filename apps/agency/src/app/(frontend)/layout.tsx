import { AgencyFooter } from '@/components/AgencyFooter';
import { Toaster } from '@mns/ui';

const FrontendLayout = ({ children }: LayoutProps<'/'>) => {
  return (
    <>
      <div className="w-full">
        {children}
        <AgencyFooter />

        <Toaster closeButton duration={3000} position="top-center" richColors />
      </div>
    </>
  );
};

export default FrontendLayout;
