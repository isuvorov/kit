import { CrossCircle as ClearIcon, Filter, Refresh, Search as SearchIcon } from '@rckit/icons';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

import { getSpinAnimationStyles } from '@/rckit/utils/getSpinAnimationStyles';

import type { TableSearchProps } from '../../types';
import styles from './TableSearch.module.css';

export const TableSearch = ({
  placeholder = 'Search...',
  onChange,
  open,
  isFetching,
  showRefresh = true,
  refresh,
  hasFilter = false,
  search = '',
  children,
}: TableSearchProps) => {
  const [searchValue, setSearchValue] = useState(search);
  const debounced = useDebouncedCallback((value) => {
    if (onChange) onChange(value);
  }, 500);
  return (
    <div className={styles.wrapper}>
      <div className={styles.innerWrapper}>
        <div className={styles.searchIcon}>
          <SearchIcon />
        </div>
        <input
          className={styles.input}
          placeholder={placeholder}
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
            debounced(e.target.value);
          }}
        />
        {searchValue && (
          <div
            className={styles.clearIcon}
            onClick={() => {
              setSearchValue('');
              if (onChange) onChange('');
            }}
          >
            <ClearIcon />
          </div>
        )}
      </div>
      {children}
      {hasFilter && (
        <button className={styles.filterButton} onClick={open}>
          <Filter />
        </button>
      )}
      {showRefresh && (
        <button className={styles.filterButton} onClick={refresh}>
          <Refresh style={getSpinAnimationStyles(isFetching)} />
        </button>
      )}
    </div>
  );
};
