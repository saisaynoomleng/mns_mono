import { QueryProvider } from '@/components/QueryProvider';
import { UserSessionProvider } from '@/components/UserSessionProvider';
import UserSidebar from '@/components/UserSidebar';
import { SidebarProvider, SidebarTrigger } from '@mns/ui';

const UserLayout = ({ children }: LayoutProps<'/user'>) => {
  return (
    <QueryProvider>
      <UserSessionProvider>
        <SidebarProvider>
          <UserSidebar />

          <div className="w-full">
            <SidebarTrigger />
            {children}
          </div>
        </SidebarProvider>
      </UserSessionProvider>
    </QueryProvider>
  );
};

export default UserLayout;
