import { AdminLayout } from '@/layouts/AdminLayout';
import Link from 'next/link';

export default function AdminIndexPage() {
  return (
  <AdminLayout activeHref="/admin">
    <Link href="/admin/users">
      Users
    </Link>
    {/* <Link href="/admin/products"> */}


  </AdminLayout>
  );
}
