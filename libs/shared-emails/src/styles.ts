/* eslint-disable max-len */
export const main = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
};

export const container = {
  maxWidth: '600px',
  margin: '0 auto',
};

export const text = {
  fontSize: '20px',
  lineHeight: '28px',
  marginBottom: '30px',
  color: '#4a4a4a',
};

export const button = {
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

export const link = {
  ...text,
  color: '#8b12fc',
};

export const codeBox = {
  background: 'rgb(245, 244, 245)',
  borderRadius: '4px',
  marginRight: '50px',
  marginBottom: '30px',
  padding: '43px 23px',
};

export const code = {
  fontSize: '30px',
  textAlign: 'center' as const,
  verticalAlign: 'middle',
};

export const hr = {
  borderColor: '#a9a9a9',
  margin: '20px 0',
};

export const logoContainer = {
  marginTop: '32px',
};

export const h1 = {
  color: '#1d1c1d',
  fontSize: '36px',
  fontWeight: '700',
  margin: '30px 0',
  padding: '0',
  lineHeight: '42px',
};

export const footerText = {
  fontSize: '12px',
  color: '#b7b7b7',
  lineHeight: '15px',
  textAlign: 'left' as const,
  marginBottom: '50px',
};

export const footerLink = {
  color: '#b7b7b7',
  textDecoration: 'underline',
};

export const footerLogos = {
  marginBottom: '32px',
  paddingLeft: '8px',
  paddingRight: '8px',
  width: '100%',
};

export const socialIcon = {
  display: 'inline',
};

export const socialWrapper = {
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  gap: '10px',
};
