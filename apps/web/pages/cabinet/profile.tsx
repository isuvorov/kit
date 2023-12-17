/* eslint-disable no-nested-ternary */
import { useAppSession, useAppUser, useAuthGuard } from '@rckit/auth';
import { Avatar } from '@rckit/avatar';
import { Debug } from '@rckit/debug';
import { HeadMeta } from '@rckit/meta';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Button, Card, Col, Row } from 'react-bootstrap';

import { SettingsProfileForm, SettingsProfileFormValues } from '@/comps/SettingsProfileForm';
import { CabinetLayout } from '@/layouts/CabinetLayout';
import { useUserFindOneQuery } from '@/queries/usersFindOne';
import { fetchUserUpdate } from '@/queries/usersUpdate';

export default function CabinetProfilePage() {
  useAuthGuard(useRouter());
  const { session, updateSession } = useAppSession();
  const { _id } = useAppUser() || {};
  const { data: user } = useUserFindOneQuery({ _id });
  // console.log('session', session);
  // console.log('_id', _id);
  // console.log('user', user);
  // console.log('session', session);
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
    // console.log({ values });
    const id = user?.id;
    await fetchUserUpdate({ id }, { info: values });
  };
  if (!user) return <div>Loading...</div>;
  return (
    <>
      <Head>
        <HeadMeta title={pageTitle} />
      </Head>
      <CabinetLayout>
        <h1>{pageTitle}</h1>
        <Row>
          <Col md={8}>
            <SettingsProfileForm
              defaultValues={user.info || {}}
              onSubmit={onSettingProfileSubmit}
            />
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
                <div className="mb-3 text-center">
                  <Avatar
                    // @ts-ignore
                    name={user.name || user.email}
                    // @ts-ignore
                    src={user.avatar}
                    size={128}
                  />
                </div>
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
