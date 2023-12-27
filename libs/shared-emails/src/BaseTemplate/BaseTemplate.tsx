import { Body, Container, Head, Html, Preview } from '@react-email/components';
import React from 'react';

import { container, main } from '../styles';
import { EmailsConfigProps } from '../types';
import { Footer } from './Footer';
import { Header } from './Header';

type BaseTemplateProps = React.PropsWithChildren<{
  preview: string;
  header: string | React.ReactNode;
  config: EmailsConfigProps;
}>;

export const BaseTemplate = ({ preview, header, children, config }: BaseTemplateProps) => (
  <Html>
    <Head />
    <Preview>{preview}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Header config={config}>{header}</Header>
        {children}
        <Footer config={config} />
      </Container>
    </Body>
  </Html>
);
