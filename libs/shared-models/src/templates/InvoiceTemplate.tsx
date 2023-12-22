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

export const InvoiceTemplate = () => {
  const preview = 'You have a new invoice';
  const header = 'You have a new invoice';
  return (
    <BaseTemplate preview={preview} header={header}>
      <Text style={text}>Dear [User's Name],</Text>
      <Text style={text}>
        We trust this email finds you well. Thank you for choosing [Your Company Name] for your
        [product/service] needs. Attached, please find the invoice for your recent transaction with
        us.
      </Text>
      <Text style={text}>Invoice Details:</Text>
      <ul style={text}>
        <li>
          <b>Invoice Number:</b> [Invoice Number]
        </li>
        <li>
          <b>Invoice Date:</b> [Invoice Date]
        </li>
        <li>
          <b>Invoice Amount:</b> [Invoice Amount]
        </li>
        <li>
          <b>Invoice Due Date:</b> [Invoice Due Date]
        </li>
      </ul>
      <Text style={text}>
        Please ensure that the payment is made by the due date to avoid any late fees. You can find
        the payment details below:
      </Text>
      <Text style={text}>
        <div>
          <b>Bank Name:</b> [Your Company Bank Name]
        </div>
        <div>
          <b>Account Name:</b> [Your Company Name]
        </div>
        <div>
          <b>Account Number:</b> [Your Company Account Number]
        </div>
        <div>
          <b>Routing Number:</b> [Your Company Routing Number]
        </div>
        <div>
          <b>SWIFT/BIC:</b> [Your Company SWIFT/BIC]
        </div>
      </Text>
      <Text style={text}>
        Alternatively, you can make the payment through [Payment Gateway Name] using the following
        link:
      </Text>
      <Button style={button} href="https://google.com" target="_blank" rel="noopener noreferrer">
        Pay now
      </Button>
      <Text style={text}>
        If you have already made the payment, we sincerely thank you for your promptness. Kindly
        disregard this email.
      </Text>
    </BaseTemplate>
  );
};
