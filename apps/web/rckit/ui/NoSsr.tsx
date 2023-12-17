import dynamic from 'next/dynamic';
import React from 'react';

const NoSsr2 = ({ children }: React.PropsWithChildren<any>) => (
  <React.Fragment>{children}</React.Fragment>
);

// TODO: перенести куда нибудь
export const NoSsr = dynamic(() => Promise.resolve(NoSsr2), {
  ssr: false,
});
