import { Heading, Hr, Img, Section } from '@react-email/components';
import React from 'react';

import { h1, hr, logoContainer } from '../styles';
import { EmailsConfigProps } from '../types';

interface HeaderProps {
  config: EmailsConfigProps;
}

export const Header = ({ children, config }: React.PropsWithChildren<HeaderProps>) => {
  const { src, width, height, alt = '' } = config.header.logo || {};
  return (
    <>
      <Section style={logoContainer}>
        <Img src={src} width={width} height={height} alt={alt} />
      </Section>
      <Heading style={h1}>{children}</Heading>
      <Hr style={hr} />
    </>
  );
};
