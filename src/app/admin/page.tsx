import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { DashboardStats } from "@/components/admin/dashboard-stats";

export default function AdminDashboardPage() {
  return (
    <section>
      <AdminPageHeader
        title="Dashboard"
        description="Overview of events, announcements, and messages."
      />
      <DashboardStats />
    </section>
  );
}
