import { Column, Hr, Img, Link, Row, Section, Text } from '@react-email/components';
import React from 'react';

const baseUrl = process.env.SITE_URL ? `https://${process.env.SITE_URL}` : '';

const footerText = {
  fontSize: '12px',
  color: '#b7b7b7',
  lineHeight: '15px',
  textAlign: 'left' as const,
  marginBottom: '50px',
};

const footerLink = {
  color: '#b7b7b7',
  textDecoration: 'underline',
};

const footerLogos = {
  marginBottom: '32px',
  paddingLeft: '8px',
  paddingRight: '8px',
  width: '100%',
};

const socialIcon = {
  display: 'inline',
};

const socialWrapper = {
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  gap: '10px',
};

const hr = {
  borderColor: '#a9a9a9',
  margin: '20px 0',
};

interface SocialProps {
  src: string;
  alt: string;
  href: string;
}

interface LinksProps {
  href: string;
  title: string;
}

interface FooterProps {
  social?: SocialProps[];
  links?: LinksProps[];
  copyright?: string | React.ReactNode;
}

export const Footer = ({ social = [], links = [], copyright }: FooterProps) => (
  <>
    <Hr style={hr} />

    <Section>
      <Row style={footerLogos}>
        <Column style={{ width: '66%' }}>
          <Img src={`${baseUrl}/assets/logo.svg`} width="46" height="36" alt="Logo" />
        </Column>
        <Column style={socialWrapper}>
          {social.map((item) => (
            <Link key={item.alt} href={item.href}>
              <Img src={item.src} width="32" height="32" alt={item.alt} style={socialIcon} />
            </Link>
          ))}
        </Column>
      </Row>
    </Section>

    <Section>
      {links.map((item, idx) => (
        <>
          {idx !== 0 && <>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;</>}
          <Link
            key={item.title}
            style={footerLink}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {item.title}
          </Link>
        </>
      ))}
      <Text style={footerText}>{copyright}</Text>
    </Section>
  </>
);
