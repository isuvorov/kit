import { Debug } from '@rckit/debug';
import Link from 'next/link';
import Avatar from 'react-avatar';
import { Dropdown, Nav, NavDropdown } from 'react-bootstrap';

import { useAppConfig } from '@/layouts/app/useAppConfig';

export const AppNavbarSettings = () => {
  const { session, sessionStatus } = useAppConfig();
  const user = session?.user;

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
