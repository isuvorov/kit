import { isDev } from '@lsk4/env';
import { SecretCheckbox } from '@rckit/secret-checkbox';
import { Navbar } from 'react-bootstrap';

import { useAppConfig } from '@/layouts/app/useAppConfig';

export const AppNavbarDebug = () => {
  const appConfig = useAppConfig();
  const { isDebug, setAppConfig } = appConfig;
  return (
    <>
      <Navbar.Brand href="/">
        <SecretCheckbox
          count={isDev ? 2 : 5}
          value={isDebug}
          onChange={(value) => {
            setAppConfig({ ...appConfig, isDebug: Boolean(value) });
          }}
          style={{ opacity: isDebug ? 1 : 0.01, cursor: 'pointer' }}
        />
        {/* <input
          type="checkbox"
          defaultChecked={isDebug}
          onClick={() => {
            setAppConfig({ ...appConfig, isDebug: !isDebug });
          }}
          style={{ opacity: isDebug ? 1 : 0.01, cursor: 'pointer' }}
        /> */}
        {/* {isDebug && 'Debug mode'} */}
      </Navbar.Brand>
    </>
  );
};
