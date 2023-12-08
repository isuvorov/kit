/* eslint-disable no-continue */
/* eslint-disable no-restricted-syntax */
import { PropsWithChildren } from 'react';
import { Breadcrumb, Container } from 'react-bootstrap';

import { AppNavbar } from './app/AppNavbar';
import { findBreadcrumbsByActiveHref, isActive } from './app/menus';

type AdminLayoutProps = PropsWithChildren<{
  showNavbar?: boolean;
  title?: string;
  activeHref?: string;
}>;
// export const AdminLayout = ({ children }: React.PropsWithChildren<{}>) => (
export const AdminLayout = ({
  showNavbar = true,
  title: initTitle,
  activeHref = '',
  children,
}: AdminLayoutProps) => {
  const breadcrumbs = findBreadcrumbsByActiveHref(activeHref);
  const title = initTitle || breadcrumbs[breadcrumbs.length - 1]?.title;
  return (
    <>
      {Boolean(showNavbar) && <AppNavbar activeHref={activeHref} />}
      <Container>
        <div className="mt-4">
          {breadcrumbs && breadcrumbs.length > 1 && (
            <Breadcrumb>
              {breadcrumbs.map((item, index) => (
                <Breadcrumb.Item key={index} href={item.href} active={isActive(item, activeHref)}>
                  {item.title}
                </Breadcrumb.Item>
              ))}
            </Breadcrumb>
          )}
          {title && <h1>{title}</h1>}
        </div>
        <div className="mt-4">{children}</div>
      </Container>
    </>
  );
};
