import { headers } from 'next/headers';

export async function getCookiesHeaders() {
  const headersList = await headers();
  return {
    'Content-Type': 'application/json',
    cookie: headersList.get('cookie') || '',
  };
}
