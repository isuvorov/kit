/* eslint-disable react/no-unescaped-entities */
import { Button, Text } from '@react-email/components';
import React from 'react';

import { BaseTemplate } from './BaseTemplate';
import { button, link, text } from './styles';

export const WelcomeTemplate = () => {
  const preview = 'Welcome to the community!';
  const header = 'Welcome to the community!';
  return (
    <BaseTemplate preview={preview} header={header}>
      <Text style={text}>Dear [User's Name], Welcome to [Your Website Name]!</Text>
      <Text style={text}>
        We are thrilled to have you on board, and we appreciate you choosing us for [brief
        description of your website's purpose].
      </Text>
      <Text style={text}>
        At [Your Website Name], we are committed to providing you with a seamless and enjoyable
        experience. Whether you're here for [specific services or products] or just exploring what
        we have to offer, we want to make sure you get the most out of your time with us.
      </Text>
      <Button style={button} href="https://google.com" target="_blank" rel="noopener noreferrer">
        Go to the platform
      </Button>

      <Text style={text}>
        If you have any questions or need assistance along the way, our support team is here to
        help. Feel free to reach out to{' '}
        <a style={link} href="mailto:support@gmail.com">
          support@gmail.com
        </a>{' '}
        with any inquiries.
      </Text>
      <Text style={text}>
        Once again, welcome to [Your Website Name]! We're excited to have you as part of our
        community and look forward to seeing you thrive on our platform.
      </Text>
    </BaseTemplate>
  );
};
