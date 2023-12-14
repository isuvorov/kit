import dynamic from 'next/dynamic';
import React from 'react';

const NoSsr2 = ({ children }: React.PropsWithChildren<any>) => (
  <React.Fragment>{children}</React.Fragment>
);

export const NoSsr = dynamic(() => Promise.resolve(NoSsr2), {
  ssr: false,
});
