import Link from 'next/link';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';

import { useAppConfig } from '@/layouts/app/useAppConfig';

import { AppLogo } from './AppLogo';
import { AppNavbarDebug } from './AppNavbarDebug';
import { AppNavbarSettings } from './AppNavbarSettings';
import { adminMenuItems, isActive, MenuItem, menuItems } from './menus';

interface MenuProps {
  items: MenuItem[];
  activeHref: string;
}
const Menu = ({ items, activeHref }: MenuProps) => (
  <>
    {items.map((item, index) =>
      item.items ? (
        <NavDropdown
          key={index}
          title={item.title}
          id={`${item.title.toLowerCase()}-nav-dropdown`}
          active={item.active}
        >
          {item.items?.map((subitem, i) => (
            <NavDropdown.Item
              as={Link}
              key={i}
              href={subitem.href}
              active={isActive(subitem, activeHref)}
            >
              {subitem.title}
            </NavDropdown.Item>
          ))}
        </NavDropdown>
      ) : (
        <Nav.Link key={index} href={item.href} active={isActive(item, activeHref)}>
          {item.title}
        </Nav.Link>
      ),
    )}
  </>
);
// export const AdminLayout = ({ children }: React.PropsWithChildren<{}>) => (

export const AppNavbar = ({ activeHref }: any) => {
  const { session } = useAppConfig();
  const role = session?.user?.role;

  return (
    <Navbar bg="dark" variant="dark" className="ml-auto">
      <Container>
        <Nav
          className="ml-auto"
          // style={{
          //   maxHeight: '100px',
          //   overflowY: 'auto',
          // }}
        >
          <Navbar.Brand href="/">
            <AppLogo type="tiny" />
          </Navbar.Brand>
          <Menu items={menuItems} activeHref={activeHref} />
        </Nav>

        <Nav className="ml-auto">
          <AppNavbarDebug />
          {role === 'admin' && <Menu items={adminMenuItems} activeHref={activeHref} />}
          <AppNavbarSettings />
        </Nav>
      </Container>
    </Navbar>
  );
};
