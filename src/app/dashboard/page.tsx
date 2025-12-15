import { Suspense } from 'react';
import DashboardClientPage from './client-page';

export default function DashboardPage() {
  return (
    <Suspense>
      <DashboardClientPage />
    </Suspense>
  );
}
