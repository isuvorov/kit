/* eslint-disable react/no-unescaped-entities */
import { Button, Text } from '@react-email/components';
import React from 'react';

import { BaseTemplate } from './BaseTemplate';
import { button, link as linkStyle, text } from './styles';
import { EmailsConfigProps } from './types';

interface ResetTemplateProps {
  preview: string;
  header: string | React.ReactNode;
  link: string;
  username: string;
  config: EmailsConfigProps;
}

export const ResetTemplate = ({ link, preview, header, username, config }: ResetTemplateProps) => (
  <BaseTemplate preview={preview} header={header} config={config}>
    <Text style={text}>Dear {username}!</Text>
    <Text style={text}>
      Someone recently requested a password change for your {config.title} account. If this was you,
      you can set a new password here:
    </Text>
    <Button style={button} href={link} target="_blank" rel="noopener noreferrer">
      Reset password
    </Button>
    <Text style={text}>
      If you don't want to change your password or didn't request this, just ignore and delete this
      message.
    </Text>
    <Text style={text}>
      To keep your account secure, please don't forward this email to anyone. See our{' '}
      <a style={linkStyle} href={config.help}>
        Help Center
      </a>{' '}
      for more security tips.
    </Text>
  </BaseTemplate>
);

export default ResetTemplate;
