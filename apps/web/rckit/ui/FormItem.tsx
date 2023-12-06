/* eslint-disable no-nested-ternary */
import { PropsWithChildren, ReactNode } from 'react';
import { Form } from 'react-bootstrap';
import { FieldError } from 'react-hook-form';

export interface FormItemProps {
  id: string;
  label?: string | ReactNode;
  description?: string | ReactNode | number;
  required?: boolean;
  error?: string | ReactNode | number | FieldError;
}

function FormItem({
  id,
  label,
  children,
  error,
  description,
  required,
}: PropsWithChildren<FormItemProps>) {
  return (
    <Form.Group>
      {label && (
        <Form.Label htmlFor={id}>
          {label}
          {required && <span style={{ color: 'var(--bs-danger)' }}>{` *`}</span>}
        </Form.Label>
      )}
      {description && (
        <Form.Text style={{ display: 'block', marginBlockEnd: 24 }}>{description}</Form.Text>
      )}
      <div id={id} className="form-control-wrap">
        {children}
      </div>
      <Form.Text className="text-danger">
        <>{error}</>
      </Form.Text>
    </Form.Group>
  );
}

export default FormItem;