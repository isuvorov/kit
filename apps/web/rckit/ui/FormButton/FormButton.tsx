import { Button as ReactBootstrapButton, ButtonProps } from 'react-bootstrap';

import { useButtonStatus } from './useFormButtonState';

const templates = {
  progress: {
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

export interface FormButtonProps extends ButtonProps {
  formState: any;
  children?: string | React.ReactNode;
}

export const FormButton = ({ formState, children, ...props }: FormButtonProps) => {
  const status = useButtonStatus(formState);
  let text = children || 'Submit';
  let variant = 'primary';
  if (status && templates[status]) {
    ({ text, variant } = templates[status]);
  }
  return (
    <ReactBootstrapButton
      disabled={status === 'progress'}
      variant={variant}
      type="submit"
      {...props}
    >
      {text}
    </ReactBootstrapButton>
  );
};
