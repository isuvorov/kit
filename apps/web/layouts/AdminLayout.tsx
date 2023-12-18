import { PropsWithChildren } from 'react';
import { Container } from 'react-bootstrap';

import { AppBreadcrumbs } from './components/AppBreadcrumbs';
import { LayoutNavbar } from './components/LayoutNavbar';

type AdminLayoutProps = PropsWithChildren<{
  showNavbar?: boolean;
  title?: string;
  activeHref?: string;
  actions?: React.ReactNode;
}>;
export const AdminLayout = ({
  showNavbar = true,
  title,
  activeHref = '',
  children,
  actions,
}: AdminLayoutProps) => (
  <>
    {Boolean(showNavbar) && <LayoutNavbar />}
    <Container>
      <AppBreadcrumbs title={title} activeHref={activeHref} actions={actions} />
      <div className="mt-4">{children}</div>
    </Container>
  </>
);
