const baseUrl = process.env.SITE_URL ? `https://${process.env.SITE_URL}` : '';

export const emailsConfig = {
  title: 'Kit Company',
  email: 'support@support.com',
  homepage: 'https://kit.lskjs.ru/',
  help: 'https://kit.lskjs.ru/help',
  header: {
    logo: {
      src: `${baseUrl}/assets/logo.svg`,
      width: 120,
      height: 100,
      alt: 'Kit Company Header Logo',
    },
  },
  footer: {
    logo: {
      src: `${baseUrl}/assets/logo.svg`,
      width: 46,
      height: 36,
      alt: 'Kit Company Footer Logo',
    },
  },
  socials: [
    {
      src: 'https://react-email-demo-ijnnx5hul-resend.vercel.app/static/slack-twitter.png',
      alt: 'Twitter',
      href: 'https://twitter.com/',
    },
    {
      src: 'https://react-email-demo-ijnnx5hul-resend.vercel.app/static/slack-facebook.png',
      alt: 'Facebook',
      href: 'https://facebook.com/',
    },
    {
      src: 'https://react-email-demo-ijnnx5hul-resend.vercel.app/static/slack-linkedin.png',
      alt: 'LinkedIn',
      href: 'https://linkedin.com/',
    },
  ],
  links: [
    {
      title: 'Terms of Service',
      href: 'https://kit.lskjs.ru/terms',
    },
    {
      title: 'Privacy Policy',
      href: 'https://kit.lskjs.ru/privacy',
    },
    {
      title: 'Contact Us',
      href: 'https://kit.lskjs.ru/contact',
    },
  ],
  copyright: (
    <>
      ©{new Date().toISOString().substr(0, 4)} Slack Technologies, LLC, a Salesforce company.
      <br />
      500 Howard Street, San Francisco, CA 94105, USA <br />
      <br />
      All rights reserved.
    </>
  ),
};
