import clsx from 'clsx';
import Image from 'next/image';
import type { PropsWithChildren } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';

import styles from './AuthLayout.module.css';
import { AppNavbar } from './components/AppNavbar';

// <AppConfig showAppbar={false}>
export function AuthLayout({
  left = null,
  children,
}: PropsWithChildren<{ left?: React.ReactNode }>) {
  return (
    <>
      {/* <AppNavbar /> */}
      <section className={clsx([styles.pageWrapper, styles.gradient])}>
        <Container className="py-5 h-100">
          <Row className="d-flex justify-content-center align-items-center h-100">
            <Col xl={10}>
              <Card style={{ borderRadius: '1rem', borderWidth: 0 }}>
                <Row>
                  <Col md={6} lg={5} className="d-none d-md-block">
                    {left || (
                      <Image
                        src="/assets/auth.webp"
                        alt="login form"
                        className="img-fluid"
                        width={500}
                        height={650}
                        style={{ borderRadius: '1rem 0 0 1rem' }}
                      />
                    )}
                  </Col>
                  <Col md={6} lg={7} className="d-flex align-items-center">
                    <div className="card-body p-4 p-lg-5 text-black">{children}</div>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

AuthLayout.Body = function AuthLayoutBody({
  title,
  children,
}: PropsWithChildren<{ title?: string }>) {
  return (
    <div className="card border-0">
      <div className="p-4">
        {title && <h3>{title}</h3>}
        {children}
      </div>
    </div>
  );
};
AuthLayout.Header = function AuthLayoutHeader({ children }: PropsWithChildren<unknown>) {
  return (
    <div className="text-center mt-4">
      <div className="small">{children}</div>
    </div>
  );
};
AuthLayout.Footer = function AuthLayoutFooter({ children }: PropsWithChildren<unknown>) {
  return (
    <div className="text-center mt-4">
      <div className="small">{children}</div>
    </div>
  );
};
