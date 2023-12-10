import { useSmartForm } from '@rckit/form';
import { Col, Form, Row } from 'react-bootstrap';
import { Controller } from 'react-hook-form';

import { Switcher } from './Switcher';

export interface AdminUsersFormValues {
  role?: string;
  dateFrom?: Date;
  dateTo?: Date;
  hasUpdated?: boolean;
}
export interface AdminUsersFormProps {
  onSubmit: (values: AdminUsersFormValues) => Promise<void>;
}
export function AdminUsersForm({ onSubmit }: AdminUsersFormProps) {
  const { register, formState, onSmartSubmit, control } = useSmartForm<AdminUsersFormValues>({
    onSubmit,
  });
  return (
    <Form onChange={onSmartSubmit} style={{ backgroundColor: '#ededed', padding: 16 }}>
      <Row>
        <Col lg={3}>
          <Form.Group controlId="role">
            <Form.Label>Role</Form.Label>
            <Form.Select {...register('role')} className="form-control">
              <option value="">Select role</option>
              {['user', 'guest'].map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
        <Col lg={3}>
          <Form.Group controlId="dateFrom">
            <Form.Label>Created Date From</Form.Label>
            <Controller
              name="dateFrom"
              control={control}
              // @ts-ignore
              render={({ field }) => <input {...field} type="date" className="form-control" />}
            />
          </Form.Group>
        </Col>
        <Col lg={3}>
          <Form.Group controlId="dateTo">
            <Form.Label>Created Date To</Form.Label>
            <Controller
              name="dateTo"
              control={control}
              // @ts-ignore
              render={({ field }) => <input {...field} type="date" className="form-control" />}
            />
          </Form.Group>
        </Col>
        <Col lg={3}>
          <Form.Group controlId="dateFrom">
            <Form.Label>Has updated</Form.Label>
            <Controller
              name="hasUpdated"
              control={control}
              // @ts-ignore
              render={({ field }) => <Switcher field={field} />}
            />
          </Form.Group>
        </Col>
        {/* <Controller
                control={control}
                name="test"
                render={({
                  field,
                  // fieldState: { invalid, isTouched, isDirty, error },
                  // formState,
                }) => (
                  <Switcher
                    field={field}
                    // onBlur={onBlur} // notify when input is touched
                    // onChange={onChange} // send value to hook form
                    // checked={value}
                    // inputRef={ref}
                  />
                )}
              />
              <Controller
                name="dateFrom"
                // control={control}
                // render={({ field }) => (
                //   <DatePicker
                //     {...field}
                //     selected={field.value}
                //     onChange={(date) => field.onChange(date)}
                //     className="form-control"
                //     placeholderText="Date from"
                //   />
                // )}
              /> */}
        {/* <Col lg={3}>
            <Form.Group controlId="dateFrom">
              <Form.Label>Date To</Form.Label>
              <Controller
                key="dateTo"
                control={control}
                render={({ field }) => (
                  <Switcher
                    field={field}
                    id="mediaGroup"
                    label="Media group (photos/videos collection)"
                  />
                )}
              />
            </Form.Group>
          </Col> */}
      </Row>
    </Form>
  );
}
