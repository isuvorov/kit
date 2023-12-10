import { CrossCircle as ClearIcon, Filter, Search as SearchIcon } from '@rckit/icons';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

import type { TableSearchProps } from '../../types';
import styles from './TableSearch.module.css';

export const TableSearch = ({
  placeholder = 'Search...',
  onChange,
  open,
  hasFilter = false,
  search = '',
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
      {hasFilter && (
        <button className={styles.filterButton} onClick={open}>
          <Filter />
        </button>
      )}
    </div>
  );
};
