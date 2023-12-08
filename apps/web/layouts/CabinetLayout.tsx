import type { PropsWithChildren } from 'react';
import { Breadcrumb, Container } from 'react-bootstrap';

import { AppNavbar } from './app/AppNavbar';
import { findBreadcrumbsByActiveHref, isActive } from './app/menus';

type CabinetLayoutProps = PropsWithChildren<{
  showNavbar?: boolean;
  title?: string;
  activeHref?: string;
}>;
export function CabinetLayout({
  showNavbar = true,
  title: initTitle,
  activeHref = '',
  children,
}: CabinetLayoutProps) {
  const breadcrumbs = findBreadcrumbsByActiveHref(activeHref);
  const title = initTitle || breadcrumbs[breadcrumbs.length - 1]?.title;
  return (
    <>
      {Boolean(showNavbar) && <AppNavbar />}
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
      {/* <section className={clsx([styles.pageWrapper, styles.gradient])}>
        <Container className="py-5 h-100">
          <Row className="d-flex justify-content-center align-items-center h-100">
            <Col md={12} lg={12} className="d-flex align-items-center">
              <div className="card-body p-4 p-lg-5 text-black">{children}</div>
            </Col>
          </Row>
        </Container>
      </section> */}
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
