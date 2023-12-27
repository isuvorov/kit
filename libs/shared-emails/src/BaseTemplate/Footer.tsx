import { Column, Hr, Img, Link, Row, Section, Text } from '@react-email/components';
import React from 'react';

import { footerLink, footerLogos, footerText, hr, socialIcon, socialWrapper } from '../styles';

const baseUrl = process.env.SITE_URL ? `https://${process.env.SITE_URL}` : '';

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
          <React.Fragment>
            <Img src={`${baseUrl}/assets/logo.svg`} width="46" height="36" alt="Logo" />
          </React.Fragment>
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
