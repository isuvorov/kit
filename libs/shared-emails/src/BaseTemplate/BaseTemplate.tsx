/* eslint-disable max-len */
import { Body, Container, Head, Html, Preview } from '@react-email/components';
import React from 'react';

import { container, main } from '../styles';
import { Footer } from './Footer';
import { Header } from './Header';

type BaseTemplateProps = React.PropsWithChildren<{
  preview: string;
  header: string | React.ReactNode;
}>;

export const BaseTemplate = ({ preview, header, children }: BaseTemplateProps) => {
  const social = [
    {
      src: 'https://react-email-demo-ijnnx5hul-resend.vercel.app/static/slack-twitter.png',
      alt: 'Twitter',
      href: 'https://react-email-demo-ijnnx5hul-resend.vercel.app/',
    },
    {
      src: 'https://react-email-demo-ijnnx5hul-resend.vercel.app/static/slack-facebook.png',
      alt: 'Facebook',
      href: 'https://react-email-demo-ijnnx5hul-resend.vercel.app/',
    },
    {
      src: 'https://react-email-demo-ijnnx5hul-resend.vercel.app/static/slack-linkedin.png',
      alt: 'LinkedIn',
      href: 'https://react-email-demo-ijnnx5hul-resend.vercel.app/',
    },
  ];
  const links = [
    {
      href: 'https://react-email-demo-ijnnx5hul-resend.vercel.app/',
      title: 'Terms of Service',
    },
    {
      href: 'https://react-email-demo-ijnnx5hul-resend.vercel.app/',
      title: 'Privacy Policy',
    },
    {
      href: 'https://react-email-demo-ijnnx5hul-resend.vercel.app/',
      title: 'Unsubscribe',
    },
    {
      href: 'https://react-email-demo-ijnnx5hul-resend.vercel.app/',
      title: 'Contact Us',
    },
  ];
  const copyright = (
    <>
      ©2022 Slack Technologies, LLC, a Salesforce company. <br />
      500 Howard Street, San Francisco, CA 94105, USA <br />
      <br />
      All rights reserved.
    </>
  );
  return (
    <Html>
      <Head />
      <Preview>{preview}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Header>{header}</Header>
          {children}
          <Footer social={social} links={links} copyright={copyright} />
        </Container>
      </Body>
    </Html>
  );
};
