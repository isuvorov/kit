/* eslint-disable max-len */
// import { useGlobalContext } from '@/hooks/useGlobalContext';
// import { IsomorphicContext } from '@/types';

// 3 TanStack Libraries!!!
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  Row,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import Image from 'next/image';
// import { FilterMenu } from '@/lskjs/ui/FlexTable/FilterMenu';
// import { useBillingTransactionListQuery } from '@/queries/billing';
import React from 'react';
import { useVirtual } from 'react-virtual';

// import { Person } from '@/__components/makeData';
import { AdminLayout } from '@/layouts/AdminLayout';
import { Badges } from '@/lskjs/ui/Badges';
import { ProductListItem, useProductListInfinityQuery } from '@/queries/products';

const fetchSize = 25;

type Person = any;

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

const sortingToSort = (sorting: SortingState) =>
  sorting.reduce((acc, { id, desc }) => ({ ...acc, [id]: desc ? -1 : 1 }), {});

export default function SomePage() {
  const rerender = React.useReducer(() => ({}), {})[1];

  // we need a reference to the scrolling element for logic down below
  const tableContainerRef = React.useRef<HTMLDivElement>(null);

  const [sorting, setSorting] = React.useState<SortingState>([]);

  console.log({ sorting });

  const { data, fetchNextPage, isFetching, isLoading } = useProductListInfinityQuery({
    pageSize: fetchSize,
    sort: sortingToSort(sorting),
  });

  // @ts-ignore
  const flatData = React.useMemo(() => data?.pages?.flatMap((page) => page.data) ?? [], [data]);
  // @ts-ignore
  const totalDBRowCount = data?.pages?.[0]?.meta?.totalRowCount ?? 0;
  const totalFetched = flatData.length;

  // called on scroll and possibly on mount to fetch more data as the user scrolls and reaches bottom of table
  const fetchMoreOnBottomReached = React.useCallback(
    (containerRefElement?: HTMLDivElement | null) => {
      if (containerRefElement) {
        const { scrollHeight, scrollTop, clientHeight } = containerRefElement;
        // once the user has scrolled within 300px of the bottom of the table, fetch more data if there is any
        if (
          scrollHeight - scrollTop - clientHeight < 300 &&
          !isFetching &&
          totalFetched < totalDBRowCount
        ) {
          fetchNextPage();
        }
      }
    },
    [fetchNextPage, isFetching, totalFetched, totalDBRowCount],
  );

  // a check on mount and after a fetch to see if the table is already scrolled to the bottom and immediately needs to fetch more data
  React.useEffect(() => {
    fetchMoreOnBottomReached(tableContainerRef.current);
  }, [fetchMoreOnBottomReached]);

  const table = useReactTable({
    data: flatData,
    columns,
    state: { sorting },
    onSortingChange: setSorting,

    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });

  const { rows } = table.getRowModel();

  // Virtualizing is optional, but might be necessary if we are going to potentially have hundreds or thousands of rows
  const rowVirtualizer = useVirtual({
    parentRef: tableContainerRef,
    size: rows.length,
    overscan: 10,
  });
  const { virtualItems: virtualRows, totalSize } = rowVirtualizer;
  const paddingTop = virtualRows.length > 0 ? virtualRows?.[0]?.start || 0 : 0;
  const paddingBottom =
    virtualRows.length > 0 ? totalSize - (virtualRows?.[virtualRows.length - 1]?.end || 0) : 0;

  if (isLoading) {
    return <>Loading...</>;
  }

  return (
    <AdminLayout activeHref="/admin/products">
      <div className="p-2">
        <div className="h-2" />
        <div
          className="container"
          onScroll={(e) => fetchMoreOnBottomReached(e.target as HTMLDivElement)}
          ref={tableContainerRef}
        >
          <table>
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      style={{ width: header.getSize() }}
                    >
                      {header.isPlaceholder ? null : (
                        <div
                          {...{
                            className: header.column.getCanSort()
                              ? 'cursor-pointer select-none'
                              : '',
                            onClick: header.column.getToggleSortingHandler(),
                          }}
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {{
                            asc: ' 🔼',
                            desc: ' 🔽',
                          }[header.column.getIsSorted() as string] ?? null}
                        </div>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {paddingTop > 0 && (
                <tr>
                  <td style={{ height: `${paddingTop}px` }} />
                </tr>
              )}
              {virtualRows.map((virtualRow) => {
                const row = rows[virtualRow.index] as Row<Person>;
                return (
                  <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                );
              })}
              {paddingBottom > 0 && (
                <tr>
                  <td style={{ height: `${paddingBottom}px` }} />
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div>
          Fetched {flatData.length} of {totalDBRowCount} Rows.
        </div>
        <div>
          <button onClick={() => rerender()}>Force Rerender</button>
        </div>
      </div>
      )
    </AdminLayout>
  );
}
