/* eslint-disable no-continue */
/* eslint-disable no-restricted-syntax */
import { PropsWithChildren } from 'react';
import { Container } from 'react-bootstrap';

import { AppBreadcrumbs } from '@/comps/AppBreadcrumbs';

import { LayoutNavbar } from './LayoutNavbar';

type AdminLayoutProps = PropsWithChildren<{
  showNavbar?: boolean;
  title?: string;
  activeHref?: string;
  actions?: React.ReactNode;
}>;
// export const AdminLayout = ({ children }: React.PropsWithChildren<{}>) => (
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
