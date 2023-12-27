import { Heading, Hr, Img, Section } from '@react-email/components';
import React from 'react';

import { h1, hr, logoContainer } from '../styles';

const baseUrl = process.env.SITE_URL ? `https://${process.env.SITE_URL}` : '';

export const Header = ({ children }: React.PropsWithChildren) => (
  <>
    <Section style={logoContainer}>
      <Img src={`${baseUrl}/assets/logo.svg`} width="120" height="100" alt="Logo" />
    </Section>
    <Heading style={h1}>{children}</Heading>
    <Hr style={hr} />
  </>
);
