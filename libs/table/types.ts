import type { ColumnDef } from '@tanstack/react-table';
import React, { Dispatch, SetStateAction } from 'react';

export interface QueryParams {
  limit: number;
  filter?: {
    [key: string]: string | number | Array<number | null> | boolean;
  };
  search?: string;
  skip?: number;
  sort?: {
    id: string;
    desc: boolean;
  }[];
}

export type TablePagination = (props: {
  pageCount: number;
  pageIndex: number;
  setPageIndex: ({ selected }: { selected: number }) => void;
}) => React.ReactElement;

export interface TableMessageProps {
  type?: 'empty' | 'loading';
  title?: string;
  subtitle?: string;
}
export type TableMessage = (props: TableMessageProps) => React.ReactElement;

export interface TableSearchProps {
  placeholder?: string;
  onChange: (value: string) => void;
  open: () => void;
  hasFilter?: boolean;
  search?: string;
}
export type TableSearch = (props: TableSearchProps) => React.ReactElement;

export interface TableFilterProps<T = any> {
  value?: T;
  onSubmit: (value: T) => any;
}
export type TableFilter = () => React.ReactElement;

export type TableColumnWidth = string | number | null;
export type TableColumn<TData, TValue> = ColumnDef<TData, TValue> & {
  width?: TableColumnWidth;
};

export interface TableProps {
  data: {
    data: Array<Record<string, unknown>>;
    count?: number;
  };
  isLoading: boolean;
  onChange: Dispatch<SetStateAction<QueryParams>>;
  initialState: QueryParams;
  template?: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: any[];
  search?: string;
  components?: {
    Pagination?: TablePagination;
    Message?: TableMessage;
    Search?: TableSearch;
    Filter?: TableFilter;
  };
}
