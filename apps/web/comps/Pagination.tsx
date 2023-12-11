import { ArrowLeft, ArrowRight } from '@rckit/icons';
import ReactPaginate from 'react-paginate';

type PaginationProps = {
  pageCount: number;
  onPageChange: (selected: { selected: number }) => void;
  page: number;
};

export const Pagination = ({ pageCount, onPageChange, page }: PaginationProps) => (
  <nav aria-label="Page navigation comments" className="mt-4">
    <ReactPaginate
      previousLabel={
        <>
          <ArrowLeft />
          &nbsp; Prev
        </>
      }
      nextLabel={
        <>
          Next &nbsp;
          <ArrowRight />
        </>
      }
      breakLabel="..."
      breakClassName="page-item"
      breakLinkClassName="page-link"
      pageCount={pageCount}
      pageRangeDisplayed={2}
      marginPagesDisplayed={1}
      onPageChange={onPageChange}
      // containerClassName="pagination justify-content-end"
      containerClassName="pagination justify-content-center"
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
);
