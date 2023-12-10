import { Debug } from '@rckit/debug';
import { SortDirection } from '@tanstack/react-table';
import { ReactNode } from 'react';

import { SortIndicator } from '@/components/SortIndicator';

import styles from './TableHeader.module.css';

interface TableHeaderProps {
  enableSorting?: boolean;
  onClick: () => void;
  colSpan: number;
  title: ReactNode;
  sorting?: SortDirection | false;
}

export const TableHeader = ({
  colSpan,
  title,
  enableSorting = false,
  onClick,
  sorting,
}: TableHeaderProps) => (
  <th colSpan={colSpan} onClick={onClick}>
    <div className={enableSorting ? styles.clickable : ''}>
      {title}
      {/* <Debug json={{ sorting, enableSorting }} /> */}
      {enableSorting && <SortIndicator value={sorting} />}
    </div>
  </th>
);
