import { Heading, Hr, Img, Section } from '@react-email/components';
import React from 'react';

const baseUrl = process.env.SITE_URL ? `https://${process.env.SITE_URL}` : '';

const logoContainer = {
  marginTop: '32px',
};

const h1 = {
  color: '#1d1c1d',
  fontSize: '36px',
  fontWeight: '700',
  margin: '30px 0',
  padding: '0',
  lineHeight: '42px',
};

const hr = {
  borderColor: '#a9a9a9',
  margin: '20px 0',
};

export const Header = ({ children }: React.PropsWithChildren) => (
  <>
    <Section style={logoContainer}>
      <Img src={`${baseUrl}/assets/bootstrap-logo.svg`} width="120" height="100" alt="Logo" />
    </Section>
    <Heading style={h1}>{children}</Heading>
    <Hr style={hr} />
  </>
);
