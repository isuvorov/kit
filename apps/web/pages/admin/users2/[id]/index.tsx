import { apiClient } from '@rckit/api-client';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Button, Card, Form, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

import { AdminLayout } from '@/layouts/AdminLayout';

interface Controls {
  firstName?: string;
  lastName?: string;
}

export default function AdminUserPage() {
  const [modal, setModal] = useState({ show: false, type: 'invalidate' });
  const router = useRouter();
  const { id } = router.query;

  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['users', id],
    queryFn: async () => {
      const { data: _data } = await apiClient.request<any, any>({
        method: 'post',
        url: `/api/users/findOne?_id=${id}`,
      });
      return _data;
    },
  });

  const { register, handleSubmit } = useForm<Controls>({
    defaultValues: {
      firstName: data?.info?.firstName,
      lastName: data?.info?.lastName,
    },
  });

  async function onSubmit(fields: Controls) {
    const { firstName } = fields;
    await apiClient.request<any, any>({
      method: 'post',
      url: `/api/users/update`,
      params: { id },
      data: { info: { firstName } },
    });
    if (modal.type === 'invalidate') {
      queryClient.invalidateQueries({ queryKey: ['users', id] });
    } else {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === 'users' && query.queryKey[1] === id,
      });
    }
    setModal((prev) => ({ ...prev, show: false }));
  }

  if (isLoading) return <div>Loading...</div>;
  return (
    <AdminLayout activeHref="/admin/users">
      <Card style={{ width: '30rem' }}>
        <Card.Img variant="top" src="https://avatars.githubusercontent.com/u/1079139?v=4" />
        <Card.Body>
          <Card.Title>{data?.email}</Card.Title>
          <Card.Text>
            <b>First name:</b> {data?.info?.firstName}
            <br />
            <b>Last name:</b> {data?.info?.lastName}
            <br />
            <b>Email:</b> {data?.email}
            <br />
            <b>Role:</b> {data?.role}
            <br />
            <b>Company Id:</b> {data?.companyId}
            <br />
            <b>Id:</b> {data?.id}
          </Card.Text>
          <div style={{ display: 'flex', gap: 8 }}>
            <Modal show={modal.show}>
              <Modal.Header>
                <Modal.Title>
                  {modal.type === 'invalidate'
                    ? 'Invalidate queries modal'
                    : 'Predicate queries modal'}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Form.Group controlId="firstName">
                    <Form.Label>First name</Form.Label>
                    <Form.Control {...register('firstName')} placeholder="Enter first name" />
                  </Form.Group>
                  <Button variant="primary" type="submit">
                    Save
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => setModal((prev) => ({ ...prev, show: false }))}
                  >
                    Close
                  </Button>
                </Form>
              </Modal.Body>
            </Modal>
            <Button variant="primary" onClick={() => setModal({ show: true, type: 'invalidate' })}>
              Invalidate queries modal
            </Button>
            <Button variant="info" onClick={() => setModal({ show: true, type: 'predicate' })}>
              Predicate queries modal
            </Button>
          </div>
        </Card.Body>
      </Card>
    </AdminLayout>
  );
}
