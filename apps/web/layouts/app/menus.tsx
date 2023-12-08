/* eslint-disable no-nested-ternary */
/* eslint-disable no-continue */
/* eslint-disable no-restricted-syntax */

export interface MenuItem {
  title: string;
  href: string;
  items?: MenuItem[];
  active?: boolean;
  parent?: string;
}

export const menuItems: MenuItem[] = [
  {
    title: 'Cabinet',
    href: '/cabinet',
    items: [
      {
        title: 'Cabinet Index',
        href: '/cabinet',
      },
      {
        title: 'Products',
        href: '/cabinet/products',
      },
    ],
  },
  // {
  //   title: 'My products',
  //   href: '/cabinet/products',
  // },
  // {
  //   title: 'Admin',
  //   href: '/admin',
  // },
];

export const adminMenuItems: MenuItem[] = [
  {
    title: 'Admin',
    href: '/admin',
    items: [
      {
        title: 'Admin Index',
        href: '/admin',
      },
      {
        title: 'Users',
        href: '/admin/users',
      },
      {
        title: 'Products',
        href: '/admin/products',
      },
      {
        title: 'Orders',
        href: '/admin/billing/orders',
      },
      {
        title: 'Transactions',
        href: '/admin/billing/transactions',
      },
    ],
  },
];

// const user = {
//   id: '1',
//   title: 'Igor Suvorov',
//   avatar: 'https://picsum.photos/32/32',
// };

export const isActive = (item: MenuItem, activeHref: string) => item?.href === activeHref;
const findBreadcrumbs = (items: MenuItem[], activeHref: string) => {
  for (const item of items) {
    if (item.items) {
      const subitem = item.items.find((it) => isActive(it, activeHref));
      if (subitem) return [item, subitem];
    }
    if (isActive(item, activeHref)) return [item];
  }
  return [];
};

export const findBreadcrumbsByActiveHref = (activeHref: string) =>
  findBreadcrumbs([...menuItems, ...adminMenuItems], activeHref);
