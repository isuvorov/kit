import { ArrowDownIcon } from './ArrowDownIcon';

/* eslint-disable no-nested-ternary */
export const SortIndicator = ({ value }: { value: string | number }) =>
  value === 1 || String(value).toLowerCase() === 'asc' ? (
    <ArrowDownIcon />
  ) : value === 1 || String(value).toLowerCase() === 'desc' ? (
    <ArrowDownIcon style={{ transform: 'rotate(180deg)' }} />
  ) : (
    ''
  );
