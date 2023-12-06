/* eslint-disable max-len */
// import { useGlobalContext } from '@/hooks/useGlobalContext';
// import { IsomorphicContext } from '@/types';

import { Err } from '@lsk4/err';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';

import { AdminLayout } from '@/layouts/AdminLayout';
import { LeftArrowIcon } from '@/rckit/ui/icons/LeftArrowIcon';
import RefreshIcon from '@/rckit/ui/icons/RefreshIcon';
import { RightArrowIcon } from '@/rckit/ui/icons/RightArrowIcon';
// import { FilterMenu } from '@/rckit/ui/FlexTable/FilterMenu';
import { SortIndicator } from '@/rckit/ui/icons/SortIndicator';
import { getSpinAnimationStyles } from '@/rckit/utils/getSpinAnimationStyles';
// import { useBillingTransactionListQuery } from '@/queries/billing';
import { useUserListQuery } from '@/queries/users';

export default function AdminUsersPage() {
  const [page, setPage] = useState(0);
  const [filter, setFilter] = useState({});
  const [sort, setSort] = useState<any>({});

  const pageSize = 10;
  // const { data: rawItems, isLoading } = useBillingTransactionListQuery();
  const res = useUserListQuery({
    limit: pageSize,
    skip: page * pageSize,
    sort,
    // filter: {
    //   price: {
    //     $lt: 1,
    //   },
    // },
  });
  const {
    data: rawItems,
    isFetching,
    error,
    status,
    refetch,
  } = res;
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

  console.log(res, { items, total, page, pageCount, isFetching, error, status, refetch })

  return (
    <AdminLayout activeHref="/admin/users">
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
            <RefreshIcon style={getSpinAnimationStyles(isFetching)} />
          </Button>
        </div>
      </div>
      {status === 'success' && !!items?.length && (
        <>
          {/* <FilterMenu value={filter} setValue={setFilter} /> */}

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Avatar</th>
                <th>Email</th>
                <th>Name</th>
                <th>Role</th>
                <th onClick={createHandleSort('price')}>
                  Created
                  <SortIndicator value={sorts.price} />
                </th>
                <th onClick={createHandleSort('likes')}>
                  Last Activity
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
                  <td>{item.email}</td>
                  <td>{item.email}</td>
                  <td>{item.role}</td>
                  {/* <td>${item.price}</td> */}
                  <td>{item.createdAt}</td>
                  <td>{item.createdAt}</td>
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
        </>
      )}
    </AdminLayout>
  );
}
