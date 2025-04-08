import { RouterProvider } from 'react-router';

import Toaster from '@/components/Toaster';
import { router } from '@/pages/route';

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
