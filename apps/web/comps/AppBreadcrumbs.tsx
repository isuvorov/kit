import { isActive } from '@rckit/navbar';
import { PropsWithChildren } from 'react';
import { Breadcrumb } from 'react-bootstrap';

import { findAppBreadcrumbs } from '@/comps/findAppBreadcrumbs';

export type AppBreadcrumbsProps = PropsWithChildren<{
  title?: string;
  activeHref?: string;
}>;
export const AppBreadcrumbs = ({ title: initTitle, activeHref = '' }: AppBreadcrumbsProps) => {
  const breadcrumbs = findAppBreadcrumbs(activeHref);
  const title = initTitle || breadcrumbs[breadcrumbs.length - 1]?.title;
  return (
    <>
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
    </>
  );
};
