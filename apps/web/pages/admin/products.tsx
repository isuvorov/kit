/* eslint-disable max-len */
// import { useGlobalContext } from '@/hooks/useGlobalContext';
// import { IsomorphicContext } from '@/types';

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import Image from 'next/image';
import { useState } from 'react';
// import { FilterMenu } from '@/lskjs/ui/FlexTable/FilterMenu';
// import { useBillingTransactionListQuery } from '@/queries/billing';
import { Table } from 'react-bootstrap';

import { Pagination } from '@/components/Pagination';
import { AdminLayout } from '@/layouts/AdminLayout';
import { ProductListItem, useProductListQuery } from '@/queries/products';
import { Badges } from '@/rckit/ui/Badges';

const columnHelper = createColumnHelper<ProductListItem>();
const columns = [
  columnHelper.accessor('image', {
    header: () => <span>Image</span>,
    cell: (info) => <Image src={info.getValue()} alt={'item.title'} width={32} height={32} />,
  }),
  columnHelper.accessor('title', {
    id: 'title',
    header: () => <span>Title</span>,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('price', {
    header: () => <span>Price</span>,
    cell: (info) => `$${info.renderValue()}`,
  }),
  columnHelper.accessor('likes', {
    header: () => <span>Likes</span>,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('tags', {
    header: () => <span>Tags</span>,
    cell: (info) => <Badges items={info.getValue()} />,
  }),
  // columnHelper.accessor('actions', {
  //   header: () => <span>Actions</span>,
  //   cell: (info) => <Debug json={info} />,
  // }),
];

export default function AdminProducts2Page() {
  const [page, setPage] = useState(0);
  const [filter, setFilter] = useState({});
  const [sort, setSort] = useState<any>({});

  const pageSize = 10;
  // const { data: rawItems, isLoading } = useBillingTransactionListQuery();
  const { data, isFetching, error, status, refetch } = useProductListQuery({
    skip: page * pageSize,
    limit: pageSize,
    sort,
    filter,
  });
  const { items = [], total = 0 } = data || {};
  const pageCount = Math.ceil(total / pageSize);
  const handlePageClick = ({ selected }: { selected: number }) => setPage(selected);

  const table = useReactTable({
    data: items,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <AdminLayout activeHref="/admin/table">
      <div className="p-2">
        <Table striped bordered hover>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
        <Pagination pageCount={pageCount} onPageChange={handlePageClick} page={page} />
        <div className="h-4" />
        <button onClick={() => {}} className="border p-2">
          Rerender
        </button>
      </div>
    </AdminLayout>
  );
}
