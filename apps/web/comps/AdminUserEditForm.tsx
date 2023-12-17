import { FormItem, useSmartForm } from '@rckit/form';
import { Col, Form, Row } from 'react-bootstrap';

export interface AdminUsersEditFormValues {
  firstName?: string;
  lastName?: string;
}
export type AdminUsersEditFormProps = React.PropsWithChildren<{
  formRef?: React.RefObject<HTMLFormElement>;
  onSubmit: (values: AdminUsersEditFormValues) => Promise<void>;
}>;

export function AdminUserEditForm({ formRef, onSubmit, children }: AdminUsersEditFormProps) {
  const { register, formState, onSmartSubmit } = useSmartForm<AdminUsersEditFormValues>({
    onSubmit,
  });

  return (
    <Form ref={formRef} onSubmit={onSmartSubmit}>
      <Row>
        <Col md={6}>
          <FormItem id="firstName" label="First Name" error={formState.errors.firstName?.message}>
            <Form.Control
              type="firstName"
              {...register('firstName', { required: 'firstName cannot be blank' })}
            />
          </FormItem>
        </Col>
        <Col md={6}>
          <FormItem id="lastName" label="Last Name" error={formState.errors.lastName?.message}>
            <Form.Control
              type="lastName"
              {...register('lastName', { required: 'lastName cannot be blank' })}
            />
          </FormItem>
        </Col>
      </Row>
      {children}
    </Form>
  );
}
