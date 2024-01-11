import { Column, Hr, Img, Link, Row, Section, Text } from '@react-email/components';
import React from 'react';

import { footerLink, footerLogos, footerText, hr, socialIcon, socialWrapper } from '../styles';
import { EmailsConfigProps } from '../types';

interface FooterProps {
  config: EmailsConfigProps;
}

export const Footer = ({ config }: FooterProps) => {
  const { footer, socials = [], links = [], copyright = '' } = config || {};
  const { src, width, height, alt = '' } = footer.logo || {};
  return (
    <>
      <Hr style={hr} />
      <Section>
        <Row style={footerLogos}>
          <Column style={{ width: '66%' }}>
            <React.Fragment>
              <Img src={src} width={width} height={height} alt={alt} />
            </React.Fragment>
          </Column>
          <Column style={socialWrapper}>
            {socials.map((item) => (
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
};
