import { UserSessionProvider } from '@/components/UserSessionProvider';
import UserSidebar from '@/components/UserSidebar';
import { Bounded, SidebarInset, SidebarProvider } from '@mns/ui';

const UserLayout = ({ children }: LayoutProps<'/user'>) => {
  return (
    <Bounded size="md" isCentered className="flex items-start">
      <UserSessionProvider>
        <SidebarProvider>
          <UserSidebar />

          <SidebarInset>
            <div className="w-full">{children}</div>
          </SidebarInset>
        </SidebarProvider>
      </UserSessionProvider>
    </Bounded>
  );
};

export default UserLayout;
