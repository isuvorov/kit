import { AppBreadcrumbs } from '@rckit/breadcrumbs';
import type { PropsWithChildren } from 'react';
import { Container } from 'react-bootstrap';

import { LayoutNavbar } from './components/LayoutNavbar';

type CabinetLayoutProps = PropsWithChildren<{
  showNavbar?: boolean;
  title?: string;
  activeHref?: string;
  actions?: React.ReactNode;
}>;
export function CabinetLayout({
  showNavbar = true,
  title,
  activeHref = '',
  children,
  actions,
}: CabinetLayoutProps) {
  return (
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
}
