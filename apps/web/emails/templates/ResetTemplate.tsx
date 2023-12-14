/* eslint-disable react/no-unescaped-entities */
import { Button, Text } from '@react-email/components';
import React from 'react';

import { BaseTemplate } from './BaseTemplate';

const text = {
  fontSize: '20px',
  lineHeight: '28px',
  marginBottom: '30px',
  color: '#4a4a4a',
};

const button = {
  backgroundColor: '#8b12fc',
  borderRadius: '8px',
  color: '#fff',
  fontSize: '20px',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  width: '100%',
  padding: '14px 7px',
  fontWeight: 'bold' as const,
};

const link = {
  ...text,
  color: '#8b12fc',
};

export const ResetTemplate = () => {
  const preview = 'Did you forget your password?';
  const header = 'Reset your password';
  return (
    <BaseTemplate preview={preview} header={header}>
      <Text style={text}>Dear [User's Name]!</Text>
      <Text style={text}>
        Someone recently requested a password change for your [Your website name] account. If this
        was you, you can set a new password here:
      </Text>
      <Button style={button} href="https://google.com" target="_blank" rel="noopener noreferrer">
        Reset password
      </Button>
      <Text style={text}>
        If you don't want to change your password or didn't request this, just ignore and delete
        this message.
      </Text>
      <Text style={text}>
        To keep your account secure, please don't forward this email to anyone. See our{' '}
        <a style={link} href="https://google.com">
          Help Center
        </a>{' '}
        for more security tips.
      </Text>
    </BaseTemplate>
  );
};
