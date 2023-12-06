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
import ReactPaginate from 'react-paginate';

import { AdminLayout } from '@/layouts/AdminLayout';
import { Badges } from '@/rckit/ui/Badges';
import { LeftArrowIcon } from '@/rckit/ui/icons/LeftArrowIcon';
import { RightArrowIcon } from '@/rckit/ui/icons/RightArrowIcon';
import { ProductListItem, useProductListQuery } from '@/queries/products';

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
        <nav aria-label="Page navigation comments" className="mt-4">
          <ReactPaginate
            previousLabel={<LeftArrowIcon />}
            nextLabel={<RightArrowIcon />}
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            pageCount={pageCount}
            pageRangeDisplayed={2}
            marginPagesDisplayed={1}
            onPageChange={handlePageClick}
            containerClassName="pagination justify-content-end"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            activeClassName="active"
            // eslint-disable-next-line no-unused-vars
            hrefBuilder={(p) => `?page=${p}`}
            hrefAllControls
            forcePage={page}
          />
        </nav>
        <div className="h-4" />
        <button onClick={() => {}} className="border p-2">
          Rerender
        </button>
      </div>
    </AdminLayout>
  );
}
