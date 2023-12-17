import { ArrowDown } from '@rckit/icons';
import { Dot } from '@rckit/icons/dot';
import React, { SVGProps } from 'react';

// const transition = 'transform 0.15s ease-in-out';
type SortDirection = 1 | -1 | 'asc' | 'desc' | true | false;

const isAsc = (value?: SortDirection) => value === 1 || String(value).toLowerCase() === 'asc';
const isDesc = (value?: SortDirection) => value === -1 || String(value).toLowerCase() === 'desc';

type SortIndicatorProps = SVGProps<SVGSVGElement> & {
  value?: SortDirection;
  style?: React.CSSProperties;
};

/* eslint-disable no-nested-ternary */
export const SortIndicator = ({ value, style = {}, ...props }: SortIndicatorProps) => {
  const isArrow = isAsc(value) || isDesc(value);
  const rotate = isDesc(value) ? 'rotate(180deg)' : '';
  const arrowStyle = {
    ...style,
    transition: 'transform 0.3s ease-in-out, border-radius 0.3s ease-in-out',
    transform: isArrow ? `scale(1) ${rotate}` : 'scale(0)',
    borderRadius: isArrow ? '0%' : '50%',
  };
  const dotStyle = {
    ...style,
    fontSize: `${0.4}em`,
    transition: 'transform 0.3s ease-in-out, border-radius 0.3s ease-in-out',
    transform: isArrow ? 'scale(0)' : 'scale(1)',
    borderRadius: isArrow ? '50%' : '0%',
  };

  return (
    <span
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        width: '1em',
      }}
    >
      <ArrowDown style={{ position: 'absolute', ...style, ...arrowStyle }} {...props} />
      <Dot style={{ position: 'absolute', ...style, ...dotStyle }} />
    </span>
  );
};
