import { Debug } from '@rckit/debug';
import Link from 'next/link';
import Avatar from 'react-avatar';
import { Container, Dropdown, Nav, Navbar, NavDropdown } from 'react-bootstrap';

import { useAppConfig } from '@/layouts/app/useAppConfig';

import { AppLogo } from './AppLogo';
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

export const AppNavbarDebug = () => {
  const appConfig = useAppConfig();
  const { isDebug, setAppConfig } = appConfig;
  return (
    <>
      <input
        type="checkbox"
        defaultChecked={isDebug}
        onClick={() => {
          setAppConfig({ ...appConfig, isDebug: !isDebug });
        }}
        style={{ opacity: isDebug ? 1 : 0.01, cursor: 'pointer' }}
      />
      <Debug>Debug mode</Debug>
    </>
  );
};
export const AppNavbarUser = () => {
  const { session, sessionStatus } = useAppConfig();
  const user = session?.user;

  // if (user) {
  //   return (
  //     <Nav.Link href="/auth">
  //       <Debug json={user} />
  //       user...
  //     </Nav.Link>
  //   );
  // }
  if (user) {
    // @ts-ignore
    const title = user.title || user.email;
    // @ts-ignore
    const { avatar } = user;
    return (
      <>
        <NavDropdown
          title={
            <>
              <Avatar name={title} src={avatar} size={String(20)} round={true} />
              {/* <Image
                src={avatar}
                alt={title}
                width={20}
                height={20}
                className="rounded-circle"
              /> */}
              <span className="d-none d-sm-inline mx-1">{title}</span>
            </>
          }
          className="dropdown-menu-dark"
        >
          <NavDropdown.Item as={Link} href="/cabinet/profile">
            Profile
          </NavDropdown.Item>
          <NavDropdown.Item as={Link} href="/cabinet/settings">
            Settings
          </NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item as={Link} href="/auth/logout">
            Logout
          </NavDropdown.Item>
        </NavDropdown>

        <Debug>
          <Dropdown>
            <Dropdown.Toggle
              className="d-flex align-items-center text-white text-decoration-none"
              aria-expanded="false"
            >
              <>
                <Avatar name={title} src={avatar} size={String(20)} round={true} />
                {/* <Image src={avatar} alt={title} width={20} height={20} className="rounded-circle" /> */}
                <span className="d-none d-sm-inline mx-1">{title}</span>
              </>
            </Dropdown.Toggle>
            <Dropdown.Menu className="dropdown-menu-dark text-small shadow">
              <Dropdown.Item as={Link} href="/cabinet/profile">
                Profile
              </Dropdown.Item>
              <Dropdown.Item as={Link} href="/cabinet/settings">
                Settings
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item as={Link} href="/auth/logout">
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Debug>
      </>
    );
  }

  if (sessionStatus === 'loading') {
    return <Nav.Link href="/auth">Loading...</Nav.Link>;
  }

  return <Nav.Link href="/auth">Sign In</Nav.Link>;
};

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
          <AppNavbarUser />
        </Nav>
      </Container>
    </Navbar>
  );
};
