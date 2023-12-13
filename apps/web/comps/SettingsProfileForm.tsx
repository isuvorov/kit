import { FormButton, FormItem, useSmartForm } from '@rckit/form';
import { Col, Form, Row } from 'react-bootstrap';

interface FormProps<T> {
  defaultValues: T;
  onSubmit: (values: T) => Promise<any>;
}

export interface SettingsProfileFormValues {
  firstName?: string;
  lastName?: string;
  avatar?: string;
}
export function SettingsProfileForm({
  defaultValues,
  onSubmit,
}: FormProps<SettingsProfileFormValues>) {
  const { register, formState, onSmartSubmit } = useSmartForm<SettingsProfileFormValues>({
    // @ts-ignore
    defaultValues,
    onSubmit,
  });
  return (
    <Form onSubmit={onSmartSubmit} style={{ backgroundColor: '#ededed', padding: 16 }}>
      <Row>
        <Col md={6}>
          <FormItem
            id="firstName"
            label="First name"
            error={formState.errors.firstName?.message}
            required
          >
            <Form.Control {...register('firstName', { required: 'First name cannot be black' })} />
          </FormItem>
        </Col>
        <Col md={6}>
          <FormItem
            id="lastName"
            label="Last name"
            error={formState.errors.lastName?.message}
            required
          >
            <Form.Control {...register('lastName', { required: 'Last name cannot be black' })} />
          </FormItem>
        </Col>
        <Col lg={12} className="mt-4">
          <FormButton formState={formState} type="submit" className="w-100">
            Submit
          </FormButton>
        </Col>
        {formState.errors.root && (
          <Col lg={12} className="text-center form-text text-danger">
            {formState.errors.root?.message}
          </Col>
        )}
      </Row>
    </Form>
  );
}
