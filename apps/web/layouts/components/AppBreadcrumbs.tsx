import { isActive } from '@rckit/navbar';
import { PropsWithChildren } from 'react';
import { Breadcrumb, Col, Row } from 'react-bootstrap';

import { findAppBreadcrumbs } from '@/layouts/components/findAppBreadcrumbs';

export type AppBreadcrumbsProps = PropsWithChildren<{
  title?: string;
  activeHref?: string;
  actions?: React.ReactNode;
}>;

export const AppBreadcrumbs = ({
  title: initTitle,
  activeHref = '',
  actions,
}: AppBreadcrumbsProps) => {
  const breadcrumbs = findAppBreadcrumbs(activeHref);
  const title = initTitle || breadcrumbs[breadcrumbs.length - 1]?.title;
  if (!breadcrumbs && !title && !actions) return null;
  return (
    <>
      <div className="mt-4">
        {breadcrumbs?.length > 1 && (
          <Breadcrumb>
            {breadcrumbs.map((item, index) => (
              <Breadcrumb.Item key={index} href={item.href} active={isActive(item, activeHref)}>
                {item.title}
              </Breadcrumb.Item>
            ))}
          </Breadcrumb>
        )}
        {(title || actions) && (
          <Row>
            <Col md={10}>{title && <h1 style={{ margin: 0 }}>{title}</h1>}</Col>
            <Col md={2} className="text-end align-self-center">
              {actions}
            </Col>
          </Row>
        )}
      </div>
    </>
  );
};
