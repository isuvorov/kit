import clsx from 'clsx';
import type { PropsWithChildren } from 'react';
import { Col, Container, Row } from 'react-bootstrap';

import styles from './AuthLayout.module.css';
import { AppNavbar } from './components/AppNavbar';

// <AppConfig showAppbar={false}>
export function CabinetLayout({ children }: PropsWithChildren<{ left?: React.ReactNode }>) {
  return (
    <>
      <AppNavbar />
      <section className={clsx([styles.pageWrapper, styles.gradient])}>
        <Container className="py-5 h-100">
          <Row className="d-flex justify-content-center align-items-center h-100">
            <Col md={12} lg={12} className="d-flex align-items-center">
              <div className="card-body p-4 p-lg-5 text-black">{children}</div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

CabinetLayout.Footer = function CabinetLayoutFooter({ children }: PropsWithChildren<unknown>) {
  return (
    <div className="text-center mt-4">
      <div className="small">{children}</div>
    </div>
  );
};
