import { AdminSidebar } from '@/components/AdminSidebar';
import { Provider } from '@/components/Provider';
import { SidebarProvider } from '@mns/ui';

const DashBoardLayout = ({ children }: LayoutProps<'/'>) => {
  return (
    <Provider>
      <SidebarProvider>
        <AdminSidebar />

        <div>{children}</div>
      </SidebarProvider>
    </Provider>
  );
};

export default DashBoardLayout;
