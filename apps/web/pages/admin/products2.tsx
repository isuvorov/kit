// @ts-nocheck

/* eslint-disable max-len */
// import { useGlobalContext } from '@/hooks/useGlobalContext';
// import { IsomorphicContext } from '@/types';

import { Err } from '@lsk4/err';
import { ArrowLeft, ArrowRight, Refresh } from '@rckit/icons';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Button, Pagination, Table } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';

// import { FilterMenu } from '@/rckit/ui/FlexTable/FilterMenu';
import { SortIndicator } from '@/components/SortIndicator';
import { AdminLayout } from '@/layouts/AdminLayout';
// import { useBillingTransactionListQuery } from '@/queries/billing';
import { useProductListQuery } from '@/queries/products';
import { getSpinAnimationStyles } from '@/rckit/utils/getSpinAnimationStyles';

export default function AdminProductsPage() {
  const [page, setPage] = useState(0);
  const [filter, setFilter] = useState({});
  const [sort, setSort] = useState<any>({});

  const pageSize = 10;
  // const { data: rawItems, isLoading } = useBillingTransactionListQuery();
  const {
    data: rawItems,
    isFetching,
    error,
    status,
    refetch,
  } = useProductListQuery({
    limit: pageSize,
    skip: page * pageSize,
    sort,
    filter: {
      price: {
        $lt: 1,
      },
    },
  });
  const { items = [], total = 0 } = rawItems || {};

  const pageCount = Math.ceil(total / pageSize);
  const handlePageClick = ({ selected }: { selected: number }) => {
    setPage(selected);
  };

  const createHandleSort = (name: any) => () => {
    const newSort = {
      [name]: sort[name] === 1 ? -1 : 1,
    };
    setSort(newSort);
  };
  const sorts = {
    price: 1,
    likes: 1,
  };

  return (
    <AdminLayout activeHref="/admin/products">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <div></div>
        <div>
          {isFetching ? <span className="mr-2">Refreshing...</span> : null}
          {status === 'loading' && <span className="mr-2">Loading...</span>}
          {status === 'error' && <span className="mr-2">Error: {Err.getMessage(error)}</span>}
          {status === 'success' && !items?.length && (
            <span className="mr-2">{page ? 'reset filter and page' : 'No data'}</span>
          )}
          <Button
            // @ts-ignore
            onClick={refetch}
            variant="outline-primary ml-4"
          >
            <Refresh style={getSpinAnimationStyles(isFetching)} />
          </Button>
        </div>
      </div>
      {status === 'success' && !!items?.length && (
        <>
          {/* <FilterMenu value={filter} setValue={setFilter} /> */}

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th onClick={createHandleSort('price')}>
                  Price
                  <SortIndicator value={sorts.price} />
                </th>
                <th onClick={createHandleSort('likes')}>
                  Likes
                  <SortIndicator value={sorts.likes} />
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {items?.map((item, index) => (
                <tr key={index}>
                  <td>
                    <Image src={item.image} alt={item.title} width={32} height={32} />
                  </td>
                  <td>{item.title}</td>
                  {/* <td>${item.price}</td> */}
                  <td>{item.likes}</td>
                  <td>
                    <Button
                      // @ts-ignore
                      as={Link}
                      // @ts-ignore
                      href={`/products/${item.id}`}
                      variant="primary"
                    >
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <Pagination pageCount={pageCount} onPageChange={handlePageClick} page={page} />
        </>
      )}
    </AdminLayout>
  );
}
