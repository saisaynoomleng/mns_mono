import { Toaster } from '@mns/ui';

const FrontendLayout = ({ children }: LayoutProps<'/'>) => {
  return (
    <>
      <div className="w-full">
        {children}

        <Toaster closeButton duration={3000} position="top-center" />
      </div>
    </>
  );
};

export default FrontendLayout;
