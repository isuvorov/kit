export const validators = {
  trimBlank: (value: string | undefined) => {
    const _value = value?.trim();
    if (!_value) {
      return "Field can't be blank";
    }
    return true;
  },
  trimNonLetters: (value: string | undefined) => {
    const _value = value?.trim();
    if (_value && !/^[a-zA-Z]+$/.test(_value)) {
      return 'Field must contain only letters';
    }
    return true;
  },
  minLength: (length: number) => (value: string | undefined) => {
    const _value = value?.trim();
    if (_value && _value.length < length) {
      return `Field must be at least ${length} characters long`;
    }
    return true;
  },
  maxLength: (length: number) => (value: string | undefined) => {
    const _value = value?.trim();
    if (_value && _value.length > length) {
      return `Field must be at most ${length} characters long`;
    }
    return true;
  },
};
