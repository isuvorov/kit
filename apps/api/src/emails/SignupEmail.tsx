/* eslint-disable react/react-in-jsx-scope */
import { isDev } from '@lsk4/env';
import { Button, Hr, Html, render, Tailwind, Text } from '@react-email/components';
import React from 'react';

export const SignupEmail = ({ authCode }: any) => (
  <Tailwind
    config={{
      theme: {
        extend: {
          colors: {
            brand: '#007291',
          },
        },
      },
    }}
  >
    <Html lang="en">
      <Text
        style={{
          backgroundColor: '#f6f6f6',
          padding: '16px',
        }}
      >
        Some title{authCode}
      </Text>
      <Hr />
      <Button href="https://example.com">Click me</Button>
    </Html>
  </Tailwind>
  //   <Email title="Signup Authentication Code">
  //     <Box padding="16px" backgroundColor="#f6f6f6">
  //       <Text>Welcome to Our Service!</Text>
  //     </Box>
  //     <Box padding="16px">
  //       <Text>Your authentication code is:</Text>
  //       <Text fontWeight="bold">{authCode}</Text>
  //     </Box>
  //     <Box padding="16px">
  //       <Text>If you didn't request this code, please ignore this email or contact support.</Text>
  //     </Box>
  //     <Box padding="16px">
  //       <Link href="https://YOUR_WEBSITE_URL_HERE">Visit our website</Link>
  //     </Box>
  //   </Email>
);

export const renderSignupEmail = (props, options = { pretty: isDev }) =>
  render(<SignupEmail {...props} />, options);

// const authCode = Math.floor(1000 + Math.random() * 9000).toString();

// // Render the email layout to an HTML string
// const emailHtml = render(<SignupEmail authCode={authCode} />);
