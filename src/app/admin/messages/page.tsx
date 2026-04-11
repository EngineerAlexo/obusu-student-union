import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { MessagesTable } from "@/components/admin/messages-table";

export default function AdminMessagesPage() {
  return (
    <section>
      <AdminPageHeader
        title="Messages"
        description="Review and manage contact messages from students."
      />
      <MessagesTable />
    </section>
  );
}
