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
}>;
// export const AdminLayout = ({ children }: React.PropsWithChildren<{}>) => (
export const AdminLayout = ({
  showNavbar = true,
  title,
  activeHref = '',
  children,
}: AdminLayoutProps) => (
  <>
    {Boolean(showNavbar) && <LayoutNavbar />}
    <Container>
      <AppBreadcrumbs title={title} activeHref={activeHref} />
      <div className="mt-4">{children}</div>
    </Container>
  </>
);
