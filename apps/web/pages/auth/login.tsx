import { Err } from '@lsk4/err';
import { Button, SmartButton, useButtonStatus } from 'blb-ui-lib';
import { delay } from 'fishbird';
import { Button as ReactBootstrapButton, Col, Container, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

import { AuthLayout } from '@/layouts/AuthLayout';
import { FormButton as ChatterfyFormButton } from '@/lskjs/FormButton/FormButton';
import { FormItem } from '@/lskjs/FormItem/FormItem';

const templates = {
  default: {
    text: 'Submit',
    variant: 'primary',
  },
  loading: {
    text: 'Submiting...',
    variant: 'primary',
  },
  error: {
    text: 'Error',
    variant: 'danger',
  },
  success: {
    text: 'Success',
    variant: 'success',
  },
};

export const FormButton = ({ formState, children, ...props }: any) => {
  const status = useButtonStatus(formState);
  const text = templates[status]?.text || children || 'Submit';
  const variant = templates[status]?.variant || 'primary';
  return (
    <ReactBootstrapButton
      disabled={status === 'loading'}
      variant={variant}
      type="submit"
      {...props}
    >
      {text}
    </ReactBootstrapButton>
  );
};

export interface AuthLoginFormValues {
  email: string;
  password: string;
}
export interface AuthLoginFormProps {
  onSubmit: (values: AuthLoginFormValues) => Promise<any>;
}

export function AuthLoginForm({ onSubmit }: AuthLoginFormProps) {
  const { register, handleSubmit, formState, setError, clearErrors } =
    useForm<AuthLoginFormValues>();

  async function onWrappedSubmit(values: AuthLoginFormValues) {
    if (formState.isSubmitting) return;
    clearErrors();
    try {
      await onSubmit(values);
    } catch (err) {
      setError('root', { message: Err.getMessage(err) });
    }
  }

  return (
    <Form onSubmit={handleSubmit(onWrappedSubmit)} className="row g-3">
      <Col lg={12}>
        <FormItem id="email" label="Email Address" error={formState.errors.email?.message} required>
          <Form.Control
            type="email"
            {...register('email', { required: 'Field cannot be black' })}
            placeholder="youremail@example.com"
          />
        </FormItem>
      </Col>
      <Col lg={12}>
        <FormItem
          id="password"
          label="Password"
          error={formState.errors.password?.message}
          required
        >
          <Form.Control
            type="password"
            {...register('password', { required: 'Field cannot be black' })}
            placeholder="password"
          />
        </FormItem>
      </Col>
      {formState.errors.root && (
        <Col lg={12} className="text-center form-text text-danger">
          {formState.errors.root?.message}
        </Col>
      )}
      <Col lg={12}>
        <ChatterfyFormButton formState={formState} type="submit" className="w-100">
          ChatterfyFormButton
        </ChatterfyFormButton>
      </Col>
      <hr />
      <Col lg={12}>
        <Button type="submit" className="w-100">
          Button
        </Button>
      </Col>
      <Col lg={12}>
        <SmartButton type="submit" className="w-100">
          SmartButton
        </SmartButton>
      </Col>
      <Col lg={12}>
        <FormButton formState={formState} type="submit" className="w-100">
          FormButton
        </FormButton>
      </Col>
    </Form>
  );
}

export default function TestPage() {
  const onSubmit = async (values: AuthLoginFormValues) => {
    // eslint-disable-next-line no-console
    console.log('[onSubmit]', values);
    await delay(1500);
    if (Math.random() > 0.5) throw new Err('RANDOM_ERROR', 'Some random error');
    return { ok: true };
  };
  return (
    <>
      <AuthLayout>
        <Container>
          <AuthLoginForm onSubmit={onSubmit} />
        </Container>
      </AuthLayout>
    </>
  );
}
