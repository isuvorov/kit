/* eslint-disable no-continue */
/* eslint-disable no-restricted-syntax */
import { Breadcrumb, Container } from 'react-bootstrap';

import { AppNavbar, findBreadcrumbsByActiveHref, isActive } from './components/AppNavbar';

// export const AdminLayout = ({ children }: React.PropsWithChildren<{}>) => (
export const AdminLayout = ({ title: initTitle, activeHref, children }: any) => {
  const breadcrumbs = findBreadcrumbsByActiveHref(activeHref);
  const title = initTitle || breadcrumbs[breadcrumbs.length - 1]?.title;
  return (
    <>
      <AppNavbar activeHref={activeHref} />
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
