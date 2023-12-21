export function trimBlank(value: string | undefined) {
  const _value = value?.trim();
  if (!_value) {
    return "Field can't be blank";
  }
  return true;
}
