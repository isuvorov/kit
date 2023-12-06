import { Err } from '@lskjs/err';
import { FieldValues, useForm } from 'react-hook-form';

export const useSmartForm = <T extends FieldValues>({
  onSubmit,
  ...props
}: {
  onSubmit: (values: T) => Promise<any>;
}) => {
  const { register, handleSubmit, formState, setError, clearErrors, ...other } = useForm<T>(props);

  async function onWrappedSubmit(values: T) {
    if (formState.isSubmitting) return;
    clearErrors();
    try {
      await onSubmit(values);
    } catch (err) {
      setError('root', { message: Err.getMessage(err) });
    }
  }
  return {
    register,
    handleSubmit,
    formState,
    setError,
    clearErrors,
    onSmartSubmit: handleSubmit(onWrappedSubmit),
    ...other,
  };
};
