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

export const TrialTemplate = () => {
  const preview = 'Trial Period Has Ended – Unlock Premium Features Now!';
  const header = 'Your trial is over';
  return (
    <BaseTemplate preview={preview} header={header}>
      <Text style={text}>Dear [User's Name],</Text>
      <Text style={text}>
        We hope you've been enjoying your time with [Your Website Name] during your trial period. We
        appreciate the opportunity to have you on board.
      </Text>
      <Text style={text}>
        As of [expiration date], your trial period has unfortunately come to an end. We hope you've
        had the chance to explore the many features and benefits our platform has to offer.
      </Text>
      <Text style={text}>
        Renewing your subscription is quick and easy. Simply click on the following link to choose a
        subscription plan that best fits your needs:
      </Text>
      <Button style={button} href="https://google.com" target="_blank" rel="noopener noreferrer">
        Renew subscription
      </Button>
      <Text style={text}>
        If you have any questions or need assistance with the renewal process, our support team is
        ready to help. Contact us at{' '}
        <a style={link} href="https://google.com">
          support@gmail.com
        </a>
        .
      </Text>
    </BaseTemplate>
  );
};
