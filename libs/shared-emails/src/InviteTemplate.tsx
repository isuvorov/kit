/* eslint-disable react/no-unescaped-entities */
import { Button, Text } from '@react-email/components';
import React from 'react';

import { BaseTemplate } from './BaseTemplate';
import { button, link as linkStyle, text } from './styles';
import { EmailsConfigProps } from './types';

interface InviterProps {
  username: string;
  email: string;
  teamName: string;
}

interface InviteTemplateProps {
  preview: string;
  header: string | React.ReactNode;
  username: string;
  inviter: InviterProps;
  link: string;
  config: EmailsConfigProps;
}

export const InviteTemplate = ({
  preview,
  header,
  username,
  inviter,
  link,
  config,
}: InviteTemplateProps) => (
  <BaseTemplate preview={preview} header={header} config={config}>
    <Text style={text}>Dear {username},</Text>
    <Text style={text}>
      We hope this message finds you well! {inviter.username}(
      <a style={linkStyle} href={`mailto:${inviter.email}`}>
        {inviter.email}
      </a>
      ) has invited you to join {inviter.teamName} on {config.title}, and we're excited to extend
      this invitation to you.
    </Text>
    <Button style={button} href={link} target="_blank" rel="noopener noreferrer">
      Join the team
    </Button>
    <Text style={text}>or copy and paste this URL into your browser:</Text>
    <a style={linkStyle} href={link} target="_blank" rel="noopener noreferrer">
      {link}
    </a>
    <Text style={text}>
      We're looking forward to having you as part of {inviter.teamName} on {config.title}!
    </Text>
  </BaseTemplate>
);
