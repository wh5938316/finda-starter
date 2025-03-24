'use client';

import JotaiProvider, { JotaiProviderProps } from './jotaiProvider';
import CSPostHogProvider from './posthogProvider';
import QueryClientProvider from './reactQueryProvider';

type AppProviderProps = {
  jotai?: JotaiProviderProps;
};

export default function Provider(props: React.PropsWithChildren<AppProviderProps>) {
  const { children, jotai } = props;

  return (
    <QueryClientProvider>
      <JotaiProvider {...jotai}>
        <CSPostHogProvider>{children}</CSPostHogProvider>
      </JotaiProvider>
    </QueryClientProvider>
  );
}
