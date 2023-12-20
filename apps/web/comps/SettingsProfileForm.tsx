import { FormButton, FormItem, useSmartForm } from '@rckit/form';
import { Col, Form, Row } from 'react-bootstrap';

import { validators } from '@/config/validators';

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
  // console.log({ defaultValues });
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
            <Form.Control
              {...register('firstName', {
                validate: {
                  trimBlank: validators.trimBlank,
                  trimNonLetters: validators.trimNonLetters,
                  minLength: validators.minLength(1),
                  maxLength: validators.maxLength(64),
                },
              })}
            />
          </FormItem>
        </Col>
        <Col md={6}>
          <FormItem id="lastName" label="Last name" error={formState.errors.lastName?.message}>
            <Form.Control
              {...register('lastName', {
                pattern: {
                  value: /^[a-zA-Z]+$/,
                  message: 'Field must contain only letters',
                },
                validate: {
                  trimBlank: validators.trimBlank,
                  minLength: validators.minLength(1),
                  maxLength: validators.maxLength(64),
                },
              })}
            />
          </FormItem>
        </Col>
        <Col md={6}>
          <FormItem id="avatar" label="Avatar" error={formState.errors.avatar?.message}>
            <Form.Control {...register('avatar')} />
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
