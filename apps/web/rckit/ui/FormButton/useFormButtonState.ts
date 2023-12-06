import { useEffect, useState } from 'react';
import { FormState } from 'react-hook-form';

export type ButtonStatus = 'success' | 'error' | 'progress';

function getButtonStatus({
  isSubmitting,
  submitCount,
  isValid,
  errors,
  isSubmitted,
  isSubmitSuccessful,
}: FormState<any>): ButtonStatus | null {
  if (isSubmitting) {
    return 'progress';
  }
  if (submitCount && (!isValid || (isSubmitted && Object.keys(errors).length))) {
    return 'error';
  }
  if (isSubmitSuccessful) {
    return 'success';
  }
  return null;
}

export function useButtonStatus(
  formState: FormState<any>,
  { timeout = 2000 } = {},
): ButtonStatus | null {
  const [buttonStatus, setButtonStatus] = useState<ButtonStatus | null>(null);

  const status = getButtonStatus(formState);
  useEffect(() => {
    setButtonStatus(status);
    if (['error', 'success'].includes(status!)) {
      // TODO: перебивают ли статусы друг друга
      setTimeout(() => {
        setButtonStatus(null);
      }, timeout);
    }
  }, [status, timeout]);

  return buttonStatus;
}
