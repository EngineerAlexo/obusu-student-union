import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AnnouncementsManager } from "@/components/admin/announcements-manager";

export default function AdminAnnouncementsPage() {
  return (
    <section>
      <AdminPageHeader
        title="Announcements Management"
        description="Add and maintain student union announcement posts."
      />
      <AnnouncementsManager />
    </section>
  );
}
