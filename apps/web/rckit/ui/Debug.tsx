/* eslint-disable no-nested-ternary */
// import Zebra from '@lskjs/dev/Zebra';

import { useAppConfig } from '../AppConfig/useAppConfig';

// import { useAppConfig } from '@/hooks/useAppConfig';

// export const DebugContext = React.createContext('debug');

interface ZebraProps {
  as?: React.ElementType;
  children?: any;
  color?: string;
  border?: number;
  colors?: string[];
  padding?: number;
  height?: number;
  // background?: string;
}

export const Zebra = ({
  as: As = 'div',
  children,
  color = '#fcfcfc77',
  border = 2,
  colors = ['#fcfcfc77', '#eeeeee77'],
  padding,
  height,
  // background,
  ...other
}: ZebraProps) => (
  <As
    style={{
      background: `repeating-linear-gradient(45deg,${colors[0]},${colors[0]} 10px,${colors[1]} 0,${colors[1]} 20px)`,
      outline: border && color ? `${color} dashed ${border}px` : null,
      padding,
      maxHeight: height,
      ...other,
    }}
  >
    {/* <As
      style={{
        background,
      }}
    > */}
    {children}
    {/* </As> */}
  </As>
);

interface DebugProps {
  as?: React.ElementType;
  children?: any;
  json?: any;
  pretty?: boolean;
  condition?: boolean | null;
}

export const Debug = ({
  as: As,
  children = null,
  json = null,
  pretty = true,
  condition,
  ...props
}: DebugProps) => {
  const { isDebug } = useAppConfig();
  // const isDebug = true;
  // eslint-disable-next-line no-param-reassign
  if (condition === null || condition === undefined) condition = isDebug;
  if (!condition) return null;
  return (
    <Zebra
      as={As || (json ? 'pre' : 'div')}
      border={0}
      color="#fbba2111"
      colors={['#00000000', '#fbba2111']}
      {...props}
    >
      {json ? (pretty ? JSON.stringify(json, null, 2) : JSON.stringify(json)) : children}
    </Zebra>
  );
};
