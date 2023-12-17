import { NavbarMenuItem } from '@rckit/navbar';

export const menuItems: NavbarMenuItem[] = [
  {
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
    title: 'My products',
    href: '/cabinet/products',
  },
  // {
  //   title: 'Admin',
  //   href: '/admin',
  // },
];

export const adminMenuItems: NavbarMenuItem[] = [
  {
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
];

export const allMenuItems = [...menuItems, ...adminMenuItems];
