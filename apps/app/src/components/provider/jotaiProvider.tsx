import Portal from '@mui/material/Portal';
import * as React from 'react';

import { DevTools as JotaiDevTools } from '@finda-co/ui-patterns/jotai-debug';

export type JotaiProviderProps = {};

export default function Provider(props: React.PropsWithChildren<JotaiProviderProps>) {
  const { children } = props;

  return (
    <>
      {process.env.NODE_ENV === 'development' && (
        <Portal>
          <JotaiDevTools position="bottom-left" />
        </Portal>
      )}
      {children}
    </>
  );
}
