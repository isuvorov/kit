import { Err } from '@lsk4/err';
import { Refresh } from '@rckit/icons';
import { ColumnDef, QueryParams, Table } from 'blb-table';
import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { SubmitHandler, useForm } from 'react-hook-form';

import { AdminLayout } from '@/layouts/AdminLayout';
import { UserListItem, UserListResponse, useUserListInfinityQuery } from '@/queries/users2';
import { getSpinAnimationStyles } from '@/rckit/helpers/getSpinAnimationStyles';

interface User {
  companyId: string;
  email: string;
  id: string;
  password: string;
  role: string;
}

interface Controls {
  role?: string;
}

export default function AdminUsersPage() {
  const [queryParams, setQueryParams] = useState<QueryParams>({ limit: 2 });

  const { register, handleSubmit } = useForm<Controls>({
    defaultValues: queryParams.filter || {},
  });

  const {
    data,
    isFetching,
    error,
    status,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useUserListInfinityQuery(queryParams);

  const reducedData = data?.pages.reduce(
    (acc: UserListItem[], page: UserListResponse) => [...acc, ...page.items],
    [],
  );

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: 'companyId',
      header: () => <span>Company Id</span>,
      cell: (info) => info.getValue(),
      enableSorting: false,
    },
    {
      accessorKey: 'email',
      header: () => <span>Email</span>,
      cell: (info) => info.getValue(),
      enableSorting: true,
    },
    {
      accessorKey: 'id',
      header: () => <span>Id</span>,
      cell: (info) => info.getValue(),
      enableSorting: true,
    },
    {
      accessorKey: 'role',
      header: () => <span>Role</span>,
      cell: (info) => info.getValue(),
      enableSorting: true,
    },
  ];

  const onSubmit: SubmitHandler<Controls> = (fields) => {
    const filter = fields.role ? { role: fields.role } : undefined;
    setQueryParams({ ...queryParams, filter });
  };

  return (
    <AdminLayout activeHref="/admin/users">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <div></div>
        <div>
          {isFetching ? <span className="mr-2">Refreshing...</span> : null}
          {/* {status === 'loading' && <span className="mr-2">Loading...</span>} */}
          {status === 'error' && <span className="mr-2">Error: {Err.getMessage(error)}</span>}
          {/* {status === 'success' && !items?.length && (
            <span className="mr-2">{page ? 'reset filter and page' : 'No data'}</span>
          )} */}
          <Button
            // @ts-ignore
            onClick={refetch}
            variant="outline-primary ml-4"
          >
            <Refresh style={getSpinAnimationStyles(isFetching)} />
          </Button>
        </div>
      </div>
      <Table
        data={{
          data: reducedData || [],
        }}
        columns={columns}
        initialState={queryParams}
        isLoading={isFetching}
        template={['15%', '40%', '40%', '10%']}
        onChange={setQueryParams}
        components={{
          Pagination: () => {
            const isLoading = isFetching || isFetchingNextPage;
            return (
              <div className="d-grid gap-2">
                {hasNextPage && (
                  <Button
                    variant="light"
                    disabled={!hasNextPage && !isLoading}
                    onClick={() => {
                      fetchNextPage();
                    }}
                  >
                    <strong>Show more</strong>
                  </Button>
                )}
              </div>
            );
          },
          Filters: () => (
            <Form
              onChange={handleSubmit(onSubmit)}
              style={{ backgroundColor: '#ededed', padding: 16 }}
            >
              <Form.Group controlId="role">
                <Form.Label>Role</Form.Label>
                <Form.Select {...register('role')}>
                  <option value="">Select role</option>
                  {['user', 'guest'].map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Form>
          ),
        }}
      />
    </AdminLayout>
  );
}
