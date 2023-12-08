import Image from 'next/image';

import { brandLogo, brandTitle, brandVersion } from '@/config/branding';

export const AppLogo = ({ type = 'tiny' }: { type: string }) => (
  <>
    <Image
      src={brandLogo}
      alt="Logo"
      width="30"
      height="24"
      className="d-inline-block align-text-top pr-2"
    />
    <span className="px-2">
      {brandTitle}
      <sup
        style={{
          fontSize: '0.5em',
          fontWeight: 300,
          color: 'var(--bs-gray-500)',

          marginRight: -18,
          textAlign: 'right',
          display: 'block',
          marginTop: -25,
        }}
      >
        {brandVersion}
      </sup>
    </span>
  </>
);
