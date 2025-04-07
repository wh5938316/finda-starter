import { RouterProvider } from 'react-router';

import { router } from '@/pages/route';

export default function App() {
  return <RouterProvider router={router} />;
}
