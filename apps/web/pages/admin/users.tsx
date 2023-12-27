import { useAuthGuard } from '@rckit/auth';
import { Avatar } from '@rckit/avatar';
import { Eye, Trash } from '@rckit/icons';
import { Pencil } from '@rckit/icons/pencil';
import { HeadMeta } from '@rckit/meta';
import { useAppModal } from '@rckit/modal';
import { QueryParams as BaseQueryParams, Table, TableColumn } from '@rckit/table';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import { Button } from 'react-bootstrap';

import { AdminUserEditForm } from '@/comps/AdminUserEditForm';
import { AdminUsersForm as Filter } from '@/comps/AdminUsersFilterForm';
import { AdminLayout } from '@/layouts/AdminLayout';
import { UserListItem, useUserListInfinityQuery } from '@/queries/users/usersList';
import { HumanDate } from '@/rckit/helpers/HumanDate';
import { Pagination } from '@/rckit/helpers/Pagination';

type QueryParams = BaseQueryParams & {
  filter?: {
    role?: string;
  };
  count?: boolean;
};
const UserActions = ({ id }: { id: string }) => (
  <>
    <Button
      // @ts-ignore
      as={Link}
      href={`/users/${id}`}
      variant="outline-primary"
    >
      <Eye />
    </Button>
    <Button
      // @ts-ignore
      as={Link}
      href={`/users/${id}`}
      variant="outline-warning"
      className="mx-2"
    >
      <Pencil />
    </Button>
    <Button
      // @ts-ignore
      as={Link}
      href={`/users/${id}`}
      variant="outline-danger"
    >
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

export default function AdminUsersPage() {
  useAuthGuard(useRouter(), { role: 'admin' });
  const pageTitle = 'Admin Users';

  const [queryParams, setQueryParams] = useState<QueryParams>({ limit: 10, count: true });
  const query = useUserListInfinityQuery(queryParams);
  const { openModal } = useAppModal();

  const formRef: React.MutableRefObject<HTMLFormElement | null> = useRef(null);
  const handleFormRefSubmit = () => {
    const htmlForm = formRef.current as any;
    if (!htmlForm) return;
    htmlForm.dispatchEvent(
      new Event('submit', {
        bubbles: true, // if you want the event to bubble up
        cancelable: true, // if you want the event to be cancelable
      }),
    );
  };

  const openUserEditModal = () => {
    const onSubmit = async (values: any) => {
      console.log('values', values);
    };
    openModal({
      title: 'New User',
      body: <AdminUserEditForm formRef={formRef} onSubmit={onSubmit} />,
      footer: (
        <Button variant="primary" onClick={handleFormRefSubmit}>
          Save
        </Button>
      ),
    });
  };

  const actions = (
    <>
      <Button variant="primary" onClick={openUserEditModal}>
        New User
      </Button>
    </>
  );
  return (
    <>
      <Head>
        <HeadMeta title={pageTitle} />
      </Head>
      <AdminLayout activeHref="/admin/users" actions={actions}>
        <Table
          // @ts-ignore
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
