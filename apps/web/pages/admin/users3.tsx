import { Avatar } from '@rckit/avatar';
import { Eye, Trash } from '@rckit/icons';
import { Pencil } from '@rckit/icons/pencil';
import { HeadMeta } from '@rckit/meta';
import { QueryParams as BaseQueryParams, Table, TableColumn } from '@rckit/table';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { Button } from 'react-bootstrap';

import { AdminUsersForm as Filter } from '@/components/AdminUsersForm';
import { HumanDate } from '@/components/HumanDate';
import { Pagination } from '@/components/Pagination';
import { AdminLayout } from '@/layouts/AdminLayout';
import { UserListItem, useUserListInfinityQuery } from '@/queries/users2';
import { Table as Table2 } from '@/rckit/table';

type QueryParams = BaseQueryParams & {
  filter?: {
    role?: string;
  };
  count?: boolean;
};
const UserActions = ({ id }: { id: string }) => (
  <>
    <Button as={Link} href={`/users/${id}`} variant="primary">
      <Eye />
    </Button>
    <Button as={Link} href={`/users/${id}`} variant="warning" className="mx-2">
      <Pencil />
    </Button>
    <Button as={Link} href={`/users/${id}`} variant="danger">
      <Trash />
    </Button>
  </>
);

const columns: TableColumn<UserListItem, UserListItem>[] = [
  {
    accessorKey: 'avatar',
    header: 'Ava',
    cell: (info: any) => <Avatar size={32} src={info.getValue()} name={info.getValue()} />,
    width: '50px',
  },
  {
    accessorKey: 'email',
    header: 'Email',
    width: '2fr',
  },
  {
    accessorKey: 'id',
    header: 'ID',
    width: '1fr',
  },
  {
    accessorKey: 'role',
    header: 'Role',
    cell: (info) => String(info.getValue()).toUpperCase(),
    width: '100px',
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At',
    cell: (info: any) => <HumanDate date={info.getValue()} />,
    enableSorting: true,
    width: '200px',
  },
  {
    accessorKey: 'updatedAt',
    header: 'Updated At',
    cell: (info: any) => <HumanDate date={info.getValue()} />,
    enableSorting: true,
    width: '200px',
  },
  {
    accessorKey: 'id',
    header: 'Actions',
    cell: (info: any) => <UserActions id={info.getValue()} />,
    width: '160px',
  },
];

export default function AdminUsers3Page() {
  const pageTitle = 'Admin Users';
  const [queryParams, setQueryParams] = useState<QueryParams>({ limit: 10, count: true });
  const query = useUserListInfinityQuery(queryParams);
  return (
    <>
      <Head>
        <HeadMeta title={pageTitle} />
      </Head>
      <AdminLayout activeHref="/admin/users">
        <Table
          query={query}
          columns={columns}
          initialState={queryParams}
          onChange={setQueryParams}
          components={
            {
              Pagination,
              Filter,
            } as any
          }
        />
        <Table2
          query={query}
          columns={columns}
          initialState={queryParams}
          onChange={setQueryParams}
          components={
            {
              Pagination,
              Filter,
            } as any
          }
        />
      </AdminLayout>
    </>
  );
}
