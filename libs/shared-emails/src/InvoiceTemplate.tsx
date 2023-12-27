/* eslint-disable react/no-unescaped-entities */
import { Button, Text } from '@react-email/components';
import React from 'react';

import { BaseTemplate } from './BaseTemplate';
import { button, text } from './styles';
import { EmailsConfigProps } from './types';

interface InvoiceProps {
  invoiceNumber: string;
  invoiceDate: string;
  invoiceAmount: string | number;
  invoiceDueDate: string;
}

interface PaymentProps {
  bankName: string;
  accountName: string;
  accountNumber: string;
  routingNumber: string;
  swiftBic: string;
}

interface InvoiceTemplateProps {
  preview: string;
  header: string | React.ReactNode;
  username: string;
  invoiceInfo: InvoiceProps;
  paymentInfo: PaymentProps;
  link: string;
  config: EmailsConfigProps;
}

export const InvoiceTemplate = ({
  preview,
  header,
  username,
  invoiceInfo,
  paymentInfo,
  link,
  config,
}: InvoiceTemplateProps) => (
  <BaseTemplate preview={preview} header={header} config={config}>
    <Text style={text}>Dear {username},</Text>
    <Text style={text}>
      We trust this email finds you well. Thank you for choosing {config.title} for your needs.
      Attached, please find the invoice for your recent transaction with us.
    </Text>
    <Text style={text}>Invoice Details:</Text>
    <ul style={text}>
      <li>
        <b>Invoice Number:</b> {invoiceInfo.invoiceNumber}
      </li>
      <li>
        <b>Invoice Date:</b> {invoiceInfo.invoiceDate}
      </li>
      <li>
        <b>Invoice Amount:</b> {invoiceInfo.invoiceAmount}
      </li>
      <li>
        <b>Invoice Due Date:</b> {invoiceInfo.invoiceDueDate}
      </li>
    </ul>
    <Text style={text}>
      Please ensure that the payment is made by the due date to avoid any late fees. You can find
      the payment details below:
    </Text>
    <Text style={text}>
      <div>
        <b>Bank Name:</b> {paymentInfo.bankName}
      </div>
      <div>
        <b>Account Name:</b> {paymentInfo.accountName}
      </div>
      <div>
        <b>Account Number:</b> {paymentInfo.accountNumber}
      </div>
      <div>
        <b>Routing Number:</b> {paymentInfo.routingNumber}
      </div>
      <div>
        <b>SWIFT/BIC:</b> {paymentInfo.swiftBic}
      </div>
    </Text>
    <Text style={text}>Alternatively, you can make the payment using the following link:</Text>
    <Button style={button} href={link} target="_blank" rel="noopener noreferrer">
      Pay now
    </Button>
    <Text style={text}>
      If you have already made the payment, we sincerely thank you for your promptness. Kindly
      disregard this email.
    </Text>
  </BaseTemplate>
);
