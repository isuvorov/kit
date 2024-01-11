import { MenuItem } from '@rckit/breadcrumbs';

export const menus: MenuItem[] = [
  {
    type: ['nav', 'cabinet'],
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
    type: ['nav', 'cabinet'],
    title: 'My products',
    image: '/assets/logo.svg',
    href: '/cabinet/products',
  },
  // {
  //   title: 'Admin',
  //   href: '/admin',
  // },
  {
    type: ['admin'],
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
    type: ['profile'],
    title: 'Profile',
    href: '/cabinet/profile',
  },
  {
    type: ['profile'],
    title: 'Settings',
    href: '/cabinet/settings',
  },
];
