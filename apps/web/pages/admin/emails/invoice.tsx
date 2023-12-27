import { HeadMeta } from '@rckit/meta';
import { InvoiceTemplate } from '@shared/emails/InvoiceTemplate';
import Head from 'next/head';

import { emailsConfig } from '@/config/emails';
import { AdminLayout } from '@/layouts/AdminLayout';

export default function InvoiceEmailPage() {
  const pageTitle = 'Invoice email';
  const preview = 'You have a new invoice';
  const header = 'You have a new invoice';
  return (
    <>
      <Head>
        <HeadMeta title={pageTitle} />
      </Head>
      <AdminLayout title={pageTitle} activeHref="/admin/emails/invoice">
        <InvoiceTemplate
          preview={preview}
          header={header}
          config={emailsConfig}
          username="Alex"
          link="https://google.com"
          invoiceInfo={{
            invoiceDate: '01/01/2021',
            invoiceNumber: '123456',
            invoiceAmount: 1000,
            invoiceDueDate: '01/01/2021',
          }}
          paymentInfo={{
            bankName: 'Bank of America',
            accountNumber: '1234567890',
            routingNumber: '123456789',
            accountName: 'Alex',
            swiftBic: '123456789',
          }}
        />
      </AdminLayout>
    </>
  );
}
