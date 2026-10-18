import { UserSessionProvider } from '@/components/UserSessionProvider';
import UserSidebar from '@/components/UserSidebar';
import { SidebarProvider } from '@mns/ui';

const UserLayout = ({ children }: LayoutProps<'/users'>) => {
  return (
    <UserSessionProvider>
      <SidebarProvider>
        <UserSidebar />

        <div className="w-full">{children}</div>
      </SidebarProvider>
    </UserSessionProvider>
  );
};

export default UserLayout;
