import { Button, Container, Stack, Typography } from '@mui/material';
import * as React from 'react';

import { toaster } from '@/components/Toaster';
import ToasterDemo from '@/components/Toaster/ToasterDemo';

export default function NotificationExamplePage() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Toaster 通知组件
      </Typography>
      <ToasterDemo />
    </Container>
  );
}

export const Component = NotificationExamplePage;
