/* eslint-disable react/no-unescaped-entities */
import { Button, Text } from '@react-email/components';
import React from 'react';

import { BaseTemplate } from './BaseTemplate';
import { button, link as linkStyle, text } from './styles';
import { EmailsConfigProps } from './types';

interface WelcomeTemplateProps {
  preview: string;
  header: string | React.ReactNode;
  link: string;
  username: string;
  config: EmailsConfigProps;
}

export const WelcomeTemplate = ({
  preview,
  header,
  username,
  link,
  config,
}: WelcomeTemplateProps) => (
  <BaseTemplate preview={preview} header={header} config={config}>
    <Text style={text}>
      Dear {username}, Welcome to {config.title}!
    </Text>
    <Text style={text}>
      We are thrilled to have you on board, and we appreciate you choosing us.
    </Text>
    <Text style={text}>
      At {config.title}, we are committed to providing you with a seamless and enjoyable experience.
      Whether you're here for exploring what we have to offer, we want to make sure you get the most
      out of your time with us.
    </Text>
    <Button style={button} href={link} target="_blank" rel="noopener noreferrer">
      Go to the platform
    </Button>

    <Text style={text}>
      If you have any questions or need assistance along the way, our support team is here to help.
      Feel free to reach out to{' '}
      <a style={linkStyle} href={`mailto:${config.email}`}>
        {config.email}
      </a>{' '}
      with any inquiries.
    </Text>
    <Text style={text}>
      Once again, welcome to {config.title}! We're excited to have you as part of our community and
      look forward to seeing you thrive on our platform.
    </Text>
  </BaseTemplate>
);
