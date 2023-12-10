import { Form } from 'react-bootstrap';

// @ts-ignore
export function Switcher({ field, label, id, reverse = false, onChange = null }) {
  const checked = reverse ? !field?.value : field?.value;
  function handleChange(e: any) {
    if (reverse) {
      field.onChange(!e.target.checked);
    } else {
      field.onChange(e.target.checked);
    }
  }
  return (
    <Form.Check
      {...field}
      id={id}
      label={label}
      checked={Boolean(checked)}
      onChange={onChange || handleChange}
      type="switch"
    />
  );
}
