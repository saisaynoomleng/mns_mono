import { Provider } from '@/components/Provider';

const DashBoardLayout = ({ children }: LayoutProps<'/'>) => {
  return <Provider>{children}</Provider>;
};

export default DashBoardLayout;
