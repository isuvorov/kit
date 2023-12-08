/* eslint-disable no-nested-ternary */
import { HeadMeta } from '@rckit/meta';
import Head from 'next/head';
import { Card, Col, Row } from 'react-bootstrap';

import { CabinetLayout } from '@/layouts/CabinetLayout';

export default function CabinetProfilePage() {
  const pageTitle = 'Cabinet Profile';
  return (
    <>
      <Head>
        <HeadMeta title={pageTitle} />
      </Head>
      <CabinetLayout>
        <Row>
          <Col md={12}>
            <Card className="w-100">
              <Card.Header className="p-3 text-center">
                <h1>{pageTitle}</h1>
              </Card.Header>
              <Card.Body className="card-body pt-3 p-3 text-center">
                Тут будет профиль пользователя
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </CabinetLayout>
    </>
  );
}
