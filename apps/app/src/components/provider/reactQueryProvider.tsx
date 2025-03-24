import { QueryClientProvider } from '@tanstack/react-query';

import { getQueryClient } from '@/services/queryClient';

export default function Provider({ children }: React.PropsWithChildren) {
  const queryClient = getQueryClient();

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
