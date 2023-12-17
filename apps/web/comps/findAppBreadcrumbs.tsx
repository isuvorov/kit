import { findBreadcrumbs } from '@rckit/navbar';

import { allMenuItems } from '@/config/menus';

export const findAppBreadcrumbs = (activeHref: string) => findBreadcrumbs(allMenuItems, activeHref);
