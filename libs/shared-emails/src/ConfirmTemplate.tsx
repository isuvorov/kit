/* eslint-disable react/no-unescaped-entities */
import { Section, Text } from '@react-email/components';
import React from 'react';

import { BaseTemplate } from './BaseTemplate';
import { code, codeBox, text } from './styles';
import { EmailsConfigProps } from './types';

interface ConfirmTemplateProps {
  preview: string;
  header: string;
  code: string;
  config: EmailsConfigProps;
}

export const ConfirmTemplate = ({
  preview,
  header,
  code: authCode,
  config,
}: ConfirmTemplateProps) => (
  <BaseTemplate preview={preview} header={header} config={config}>
    <Text style={text}>
      Your confirmation code is below - enter it in your open browser window and we'll help you get
      signed in.
    </Text>

    <Section style={codeBox}>
      <Text style={code}>{authCode}</Text>
    </Section>

    <Text style={text}>
      If you didn't request this email, there's nothing to worry about - you can safely ignore it.
    </Text>
  </BaseTemplate>
);
