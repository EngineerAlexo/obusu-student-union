import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { EventsManager } from "@/components/admin/events-manager";

export default function AdminEventsPage() {
  return (
    <section>
      <AdminPageHeader
        title="Events Management"
        description="Create, edit, and remove events shown across the platform."
      />
      <EventsManager />
    </section>
  );
}
