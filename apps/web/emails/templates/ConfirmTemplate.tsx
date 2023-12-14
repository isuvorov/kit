/* eslint-disable react/no-unescaped-entities */
import { Section, Text } from '@react-email/components';
import React from 'react';

import { BaseTemplate } from './BaseTemplate';

const text = {
  fontSize: '20px',
  lineHeight: '28px',
  marginBottom: '30px',
  color: '#4a4a4a',
};

const codeBox = {
  background: 'rgb(245, 244, 245)',
  borderRadius: '4px',
  marginRight: '50px',
  marginBottom: '30px',
  padding: '43px 23px',
};

const code = {
  fontSize: '30px',
  textAlign: 'center' as const,
  verticalAlign: 'middle',
};

export const ConfirmTemplate = () => {
  const preview = "It's time to confirm your email address";
  const header = 'Confirm your email address';
  return (
    <BaseTemplate preview={preview} header={header}>
      <Text style={text}>
        Your confirmation code is below - enter it in your open browser window and we'll help you
        get signed in.
      </Text>

      <Section style={codeBox}>
        <Text style={code}>123-123</Text>
      </Section>

      <Text style={text}>
        If you didn't request this email, there's nothing to worry about - you can safely ignore it.
      </Text>
    </BaseTemplate>
  );
};
