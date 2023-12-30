import { MenuItem } from '@rckit/breadcrumbs';

export const menus: MenuItem[] = [
  {
    types: ['nav', 'cabinet'],
    title: 'Cabinet',
    href: '/cabinet',
    items: [
      {
        title: 'Cabinet Index',
        href: '/cabinet',
        hidden: true,
      },
      {
        title: 'Products',
        href: '/cabinet/products',
      },
    ],
  },
  {
    types: ['nav', 'cabinet'],
    title: 'My products',
    href: '/cabinet/products',
  },
  // {
  //   title: 'Admin',
  //   href: '/admin',
  // },
  {
    types: ['admin'],
    title: 'Admin',
    href: '/admin',
    items: [
      {
        title: 'Admin Index',
        href: '/admin',
        hidden: true,
      },
      {
        title: 'Users',
        href: '/admin/users',
      },
      {
        title: 'Emails',
        href: '/admin/emails',
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
  {
    types: ['profile'],
    title: 'Profile',
    href: '/cabinet/profile',
  },
  {
    types: ['profile'],
    title: 'Settings',
    href: '/cabinet/settings',
  },
];
