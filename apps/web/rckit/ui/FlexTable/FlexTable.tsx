/* eslint-disable max-len */
// import { useGlobalContext } from '@/hooks/useGlobalContext';
// import { IsomorphicContext } from '@/types';

import { Debug } from '@rckit/debug';
import Image from 'next/image';
import { useCallback, useState } from 'react';
import { Button, Col, Form, Row, Table } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';

import { AdminLayout } from '@/layouts/AdminLayout';
// import { useBillingTransactionListQuery } from '@/queries/billing';
import { useProductListQuery } from '@/queries/products';
import { debounce } from '@/rckit/utils/debounce';

import { SortIndicator } from '../icons/SortIndicator';

// const SortIndicator = ({ value }) => (value === 1 ? '▼' : value === -1 ? '▲' : '');

function FilterIcon(props: any) {
  return (
    <svg fill="currentColor" viewBox="0 0 16 16" height="1em" width="1em" {...props}>
      <path d="M6 10.5a.5.5 0 01.5-.5h3a.5.5 0 010 1h-3a.5.5 0 01-.5-.5zm-2-3a.5.5 0 01.5-.5h7a.5.5 0 010 1h-7a.5.5 0 01-.5-.5zm-2-3a.5.5 0 01.5-.5h11a.5.5 0 010 1h-11a.5.5 0 01-.5-.5z" />
    </svg>
  );
}

const FilterMenu = ({ value, setValue }: any) => {
  console.log('FilterMenu render');
  const [showFilter, setShowFilter] = useState(false);
  const [innerValue, setInnerValue] = useState<Record<string, any>>(value);

  const toggleFilter = () => setShowFilter(!showFilter);

  const handleSubmit = (e: any) => {
    e?.preventDefault();
    setValue(innerValue);
    // toggleFilter();
  };
  const debouncedHandleSubmit = useCallback(debounce(handleSubmit, 1000), [setValue]);
  console.log('debouncedHandleSubmit', debouncedHandleSubmit);

  const handleChange = (field: string, newValue: any) => {
    setInnerValue({
      ...innerValue,
      [field]: newValue,
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col xs={11} md={11}>
          <Form.Group controlId="search">
            <Form.Control
              type="text"
              placeholder="Search"
              onChange={(e) => {
                // @ts-ignore
                handleChange('search', e.target.value, () => {
                  debouncedHandleSubmit(innerValue);
                });
              }}
            />
          </Form.Group>
        </Col>
        <Col xs={1} md={1}>
          <Button onClick={toggleFilter} variant={showFilter ? 'primary' : 'outline-primary'}>
            <FilterIcon />
          </Button>
        </Col>
      </Row>

      {showFilter && (
        <>
          <Row>
            <Col xs={6} md={4}>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="priceFrom">
                    <Form.Label>Price From</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Price from"
                      value={value?.priceFrom}
                      onChange={(e) => handleChange('priceFrom', e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="priceTo">
                    <Form.Label>Price To</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Price to"
                      value={value?.priceTo}
                      onChange={(e) => handleChange('priceTo', e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Col>

            <Col xs={6} md={4}>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="likesFrom">
                    <Form.Label>Likes From</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Likes from"
                      value={value?.likesFrom}
                      onChange={(e) => handleChange('likesFrom', e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="likesTo">
                    <Form.Label>Likes To</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Likes to"
                      value={value?.likesTo}
                      onChange={(e) => handleChange('likesTo', e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Col>
          </Row>

          <Button type="submit">Apply</Button>
          <Button
            onClick={() => {
              setValue({});
              setInnerValue({});
            }}
            variant="outline-secondary"
            className="ml-2"
          >
            Reset
          </Button>
        </>
      )}
    </Form>
  );
};

export default function FlexTable({ query }: any) {
  const [page, setPage] = useState(0);
  const [filter, setFilter] = useState({});
  const [sort, setSort] = useState<any>({});

  const pageSize = 10;
  // const { data: rawItems, isLoading } = useBillingTransactionListQuery();
  const {
    data: rawItems,
    isFetching,
    status,
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

  const createHandleSort = (name: string) => () => {
    const newSort = {
      [name]: sort[name] === 1 ? -1 : 1,
    };
    setSort(newSort);
  };
  const sorts = {
    price: 'asc',
    likes: 'asc',
  };

  return (
    <AdminLayout>
      {isFetching ? <div>Refreshing...</div> : null}
      {status === 'pending' && 'Loading...'}
      {/* {status === 'error' && Err.getMessage(error)} */}
      {status === 'success' && !items?.length && (page ? 'reset filter and page' : 'No data')}
      {status === 'success' && !!items?.length && (
        <>
          <Debug json={filter} />
          <FilterMenu value={filter} setValue={setFilter} />
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Title</th>
                <th>Image</th>
                <th onClick={createHandleSort('price')}>
                  Price
                  <SortIndicator value={sorts.price} />
                </th>
                <th onClick={createHandleSort('likes')}>
                  Likes
                  <SortIndicator value={sorts.likes} />
                </th>
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
                </tr>
              ))}
            </tbody>
          </Table>
          <nav aria-label="Page navigation comments" className="mt-4">
            <ReactPaginate
              previousLabel="Prev"
              nextLabel="Next"
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
