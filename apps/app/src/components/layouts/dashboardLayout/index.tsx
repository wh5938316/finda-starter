'use client';

import * as React from 'react';

// 仅支持ContentLayout作为子组件
interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div>
      {children}
    </div>
  );
}
