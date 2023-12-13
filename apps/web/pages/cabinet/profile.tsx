/* eslint-disable no-nested-ternary */
import { useAppSession } from '@rckit/auth';
import { Debug } from '@rckit/debug';
import { HeadMeta } from '@rckit/meta';
import Head from 'next/head';
import { Button, Card, Col, Row } from 'react-bootstrap';

import { SettingsProfileForm, SettingsProfileFormValues } from '@/comps/SettingsProfileForm';
import { CabinetLayout } from '@/layouts/CabinetLayout';
import { fetchUserUpdate } from '@/queries/usersUpdate';

export default function CabinetProfilePage() {
  const { session, updateSession } = useAppSession();
  const user = session?.user || {};
  console.log('user', user);
  console.log('session', session);
  const pageTitle = 'Cabinet Profile';
  const handleUpdateSession = async () => {
    // eslint-disable-next-line no-console
    console.log('handleUpdateSession');
    try {
      await updateSession();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log('handleUpdateSession err', err);
    }
  };
  const onSettingProfileSubmit = async (values: SettingsProfileFormValues) => {
    console.log({ values });
    const _id = user?._id || user?.id;
    await fetchUserUpdate({ _id }, values);
  };
  return (
    <>
      <Head>
        <HeadMeta title={pageTitle} />
      </Head>
      <CabinetLayout>
        <h1>{pageTitle}</h1>
        <Row>
          <Col md={8}>
            <SettingsProfileForm defaultValues={user} onSubmit={onSettingProfileSubmit} />
            {/* <Card className="w-100">
              <Card.Header className="p-3 text-center">
                <h1>{pageTitle}</h1>
              </Card.Header>
              <Card.Body className="card-body pt-3 p-3 "></Card.Body>
            </Card> */}
          </Col>
          <Col md={4}>
            <Card className="w-100">
              <Card.Body className="card-body pt-3 p-3 ">
                <div className="mb-3 text-center">Тут будет загрузка аватара</div>
                <div>
                  <Debug json={session} />
                  <Debug>
                    <Button onClick={handleUpdateSession}>Update Session</Button>
                  </Debug>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </CabinetLayout>
    </>
  );
}
