import clsx from 'clsx';
import type { PropsWithChildren } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';

import { AppNavbar } from './app/AppNavbar';
import styles from './AuthLayout.module.css';

type TextLayoutProps = PropsWithChildren<{
  showNavbar?: boolean;
  left?: React.ReactNode;
}>;

// <AppConfig showAppbar={false}>
export function TextLayout({ showNavbar = false, children }: TextLayoutProps) {
  return (
    <>
      {Boolean(showNavbar) && <AppNavbar />}

      <section className={clsx([styles.pageWrapper, styles.gradient])}>
        <Container className="py-5 h-100">
          <Row className="d-flex justify-content-center align-items-center h-100">
            <Col xl={10}>
              <Card style={{ borderRadius: '1rem', borderWidth: 0 }}>
                <Row>
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
