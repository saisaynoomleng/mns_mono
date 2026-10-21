import { QueryProvider } from '@/components/QueryProvider';
import { UserSessionProvider } from '@/components/UserSessionProvider';
import UserSidebar from '@/components/UserSidebar';
import { SidebarProvider } from '@mns/ui';

const UserLayout = ({ children }: LayoutProps<'/users'>) => {
  return (
    <QueryProvider>
      <UserSessionProvider>
        <SidebarProvider>
          <UserSidebar />

          <div className="w-full">{children}</div>
        </SidebarProvider>
      </UserSessionProvider>
    </QueryProvider>
  );
};

export default UserLayout;
