import Image from 'next/image';

import { brandLogo, brandTitle, brandVersion } from '@/config/branding';

export const AppLogo = ({ type = 'tiny' }: { type?: string }) => (
  <>
    <span
      style={{
        position: 'relative',
      }}
    >
      <Image
        src={brandLogo}
        alt="Logo"
        width="30"
        height="24"
        className="d-inline-block align-text-top pr-2"
      />
      {brandVersion && (
        <span
          style={{
            position: 'absolute',
            right: '-10%',
            top: '-40%',
            fontSize: '0.4em',
            color: '#ccc',
          }}
        >
          {brandVersion}
        </span>
      )}
    </span>
    {type !== 'tiny' && (
      <>
        <span className="px-2">{brandTitle}</span>
      </>
    )}
  </>
);
