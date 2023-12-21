// import { isDev } from '@lskjs/env';
// import {
//   Body,
//   Container,
//   Head,
//   Html,
//   Img,
//   Link,
//   Preview,
//   render,
//   Section,
// } from '@react-email/components';
// import React from 'react';

// // configure path to assest folder
// const baseUrl = process.env.VERCEL_URL ? process.env.VERCEL_URL : '/static';

// export const SpringSalesMail = () => (
//   <Html>
//     <Head />
//     <Preview>Spring flower sales💐 Don't miss out!</Preview>
//     <Body style={main}>
//       <Container style={parentContainer}>
//         <Link href="#" style={headingLink}>
//           Petal Palace
//         </Link>
//         <Section style={heroSection}>
//           <Img src={`${baseUrl}/banner.png`} style={banner} />
//           <Link href="#" style={cta}>
//             Get 33% off sale
//           </Link>
//         </Section>
//         <Container style={container}>{/* more email markup */}</Container>
//       </Container>
//     </Body>
//   </Html>
// );

// export const renderSignupEmail = (props, options = { pretty: isDev }) =>
//   render(<SpringSalesMail {...props} />, options);
