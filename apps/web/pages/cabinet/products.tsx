/* eslint-disable no-nested-ternary */
// import { useGlobalContext } from '@/hooks/useGlobalContext';
import { HeadMeta } from '@rckit/meta';
import Head from 'next/head';
import Image from 'next/image';
import { Card, Col, Row } from 'react-bootstrap';

import { CabinetLayout } from '@/layouts/CabinetLayout';
import { useProductListQuery } from '@/queries/products';
// import { IsomorphicContext } from '@/types';

export default function CabinetProductsPage() {
  const pageTitle = 'Cabinet Products';
  // @ts-ignore
  const { data, isLoading, isError } = useProductListQuery({ limit: 12 });

  if (isLoading) {
    return (
      <CabinetLayout activeHref="/cabinet/products">
        <div>Loading...</div>
      </CabinetLayout>
    );
  }

  if (isError) {
    return (
      <CabinetLayout activeHref="/cabinet/products">
        <div>Error fetching user</div>
      </CabinetLayout>
    );
  }
  const products = data?.items || [];

  return (
    <>
      <Head>
        <HeadMeta title={pageTitle} />
      </Head>
      <CabinetLayout activeHref="/cabinet/products">
        <Row>
          {products.map(({ id, image, price, title, description }: any) => (
            <Col key={id} xs={6} md={3} lg={3} className="mb-4 d-flex">
              <Card className="w-100">
                <Card.Header className="p-3 text-center">
                  <div>
                    <Image
                      width={80}
                      height={80}
                      style={{ borderRadius: '50%', width: 80, height: 80 }}
                      src={image}
                      alt={title}
                    />
                  </div>
                </Card.Header>
                <Card.Body className="card-body pt-3 p-3 text-center">
                  <h5 className="mb-0">{/* <Price {...price} /> */}</h5>
                  {/* <hr className="horizontal dark" /> */}
                  <h6 className="text-center mb-0  my-3">{title}</h6>
                  <span className="text-xs">{description}</span>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </CabinetLayout>
    </>
  );
}
