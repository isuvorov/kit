/* eslint-disable react/no-unescaped-entities */
import { Button, Text } from '@react-email/components';
import React from 'react';

import { BaseTemplate } from './BaseTemplate';
import { button, link as linkStyle, text } from './styles';
import { EmailsConfigProps } from './types';

interface TrialTemplateProps {
  preview: string;
  header: string | React.ReactNode;
  link: string;
  username: string;
  expirationDate: string;
  config: EmailsConfigProps;
}

export const TrialTemplate = ({
  preview,
  header,
  link,
  username,
  expirationDate,
  config,
}: TrialTemplateProps) => (
  <BaseTemplate preview={preview} header={header} config={config}>
    <Text style={text}>Dear {username},</Text>
    <Text style={text}>
      We hope you've been enjoying your time with {config.title} during your trial period. We
      appreciate the opportunity to have you on board.
    </Text>
    <Text style={text}>
      As of {expirationDate}, your trial period has unfortunately come to an end. We hope you've had
      the chance to explore the many features and benefits our platform has to offer.
    </Text>
    <Text style={text}>
      Renewing your subscription is quick and easy. Simply click on the following link to choose a
      subscription plan that best fits your needs:
    </Text>
    <Button style={button} href={link} target="_blank" rel="noopener noreferrer">
      Renew subscription
    </Button>
    <Text style={text}>
      If you have any questions or need assistance with the renewal process, our support team is
      ready to help. Contact us at{' '}
      <a style={linkStyle} href={`mailto:${config.email}`}>
        {config.email}
      </a>
      .
    </Text>
  </BaseTemplate>
);
