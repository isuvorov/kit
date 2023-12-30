import { AppBreadcrumbs } from '@rckit/breadcrumbs';
import { PropsWithChildren } from 'react';
import { Container } from 'react-bootstrap';

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
      <div className="mt-4">
        <AppBreadcrumbs title={title} activeHref={activeHref} actions={actions} />
      </div>
      <div className="mt-4">{children}</div>
    </Container>
  </>
);
