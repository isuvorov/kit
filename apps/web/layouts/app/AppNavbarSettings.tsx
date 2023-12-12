import { useAppSession } from '@rckit/auth';
import { Avatar } from '@rckit/avatar';
import { Debug } from '@rckit/debug';
import Link from 'next/link';
import { Dropdown, Nav, NavDropdown } from 'react-bootstrap';

const AvatarWithTitle = ({ title, ...props }: any) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
    }}
  >
    <Avatar name={title} {...props} />
    <span className="d-none d-sm-inline mx-1">{title}</span>
  </div>
);

export const AppNavbarSettings = () => {
  const { session, sessionStatus } = useAppSession();
  const user = session?.user;

  if (user) {
    // @ts-ignore
    const title = user.title || user.email;
    // @ts-ignore
    const { avatar } = user;
    return (
      <>
        <Debug>
          <NavDropdown
            title={
              <div style={{ display: 'inline-block' }}>
                <AvatarWithTitle title={title} src={avatar} size={20} />
              </div>
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
        </Debug>

        <Dropdown>
          <Dropdown.Toggle
            className="d-flex align-items-center text-white text-decoration-none"
            aria-expanded="false"
          >
            <AvatarWithTitle title={title} src={avatar} size={20} />
            {/* <>
                <Avatar name={title} src={avatar} size={20} />
                <span className="d-none d-sm-inline mx-1">{title}</span>
              </> */}
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
      </>
    );
  }

  if (sessionStatus === 'loading') {
    return <Nav.Link href="/auth">Loading...</Nav.Link>;
  }

  return <Nav.Link href="/auth">Sign In</Nav.Link>;
};
