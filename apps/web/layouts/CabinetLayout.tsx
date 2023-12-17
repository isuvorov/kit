import type { PropsWithChildren } from 'react';
import { Container } from 'react-bootstrap';

import { AppBreadcrumbs } from '@/comps/AppBreadcrumbs';

import { LayoutNavbar } from './LayoutNavbar';

type CabinetLayoutProps = PropsWithChildren<{
  showNavbar?: boolean;
  title?: string;
  activeHref?: string;
}>;
export function CabinetLayout({
  showNavbar = true,
  title,
  activeHref = '',
  children,
}: CabinetLayoutProps) {
  return (
    <>
      {Boolean(showNavbar) && <LayoutNavbar />}
      <Container>
        <AppBreadcrumbs title={title} activeHref={activeHref} />
        <div className="mt-4">{children}</div>
      </Container>
    </>
  );
}

CabinetLayout.Footer = function CabinetLayoutFooter({ children }: PropsWithChildren<unknown>) {
  return (
    <div className="text-center mt-4">
      <div className="small">{children}</div>
    </div>
  );
};
