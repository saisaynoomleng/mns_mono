import { AdminSidebar } from '@/components/AdminSidebar';
import { AdminHeader } from '@/components/Header';
import { Provider } from '@/components/Provider';
import { UserSessionContextProvider } from '@/components/UserSessionContextProvider';
import { SidebarProvider } from '@mns/ui';

const DashBoardLayout = ({ children }: LayoutProps<'/'>) => {
  return (
    <Provider>
      <UserSessionContextProvider>
        <SidebarProvider>
          <AdminSidebar />

          <div className="w-full px-4 py-3">
            <AdminHeader />
            {children}
          </div>
        </SidebarProvider>
      </UserSessionContextProvider>
    </Provider>
  );
};

export default DashBoardLayout;
