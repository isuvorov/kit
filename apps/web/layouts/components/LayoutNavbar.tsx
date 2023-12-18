import { AppNavbar as BaseAppNavbar } from '@rckit/navbar';

import { adminMenuItems, menuItems } from '@/config/menus';

import { AppLogo } from './AppLogo';

export const LayoutNavbar = (props: any = {}) => (
  <BaseAppNavbar
    logo={<AppLogo />}
    menuItems={menuItems}
    adminMenuItems={adminMenuItems}
    // sticky="top"
    // fixed="top"
    {...props}
  />
);
