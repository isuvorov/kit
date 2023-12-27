/* eslint-disable react/no-unescaped-entities */
import { Button, Text } from '@react-email/components';
import React from 'react';

import { BaseTemplate } from './BaseTemplate';
import { button, link, text } from './styles';

export const InviteTemplate = () => {
  const preview = 'Someone invited you to join their team';
  const header = 'You have been invited to join a team!';
  return (
    <BaseTemplate preview={preview} header={header}>
      <Text style={text}>Dear [User's Name],</Text>
      <Text style={text}>
        We hope this message finds you well! [Inviter's Name](
        <a style={link} href="mailto:inviter@gmail.com">
          inviter@gmail.com
        </a>
        ) has invited you to join [Team/Organization Name] on [Your Platform Name], and we're
        excited to extend this invitation to you.
      </Text>
      <Button style={button} href="https://google.com" target="_blank" rel="noopener noreferrer">
        Join the team
      </Button>
      <Text style={text}>or copy and paste this URL into your browser:</Text>
      <a style={link} href="https://google.com" target="_blank" rel="noopener noreferrer">
        https://google.com
      </a>
      <Text style={text}>
        We're looking forward to having you as part of [Team/Organization Name] on [Your Platform
        Name]!
      </Text>
    </BaseTemplate>
  );
};
