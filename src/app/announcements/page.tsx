import type { Metadata } from "next";

import { AnnouncementsList } from "@/components/announcements/announcements-list";
import { Container } from "@/components/shared/container";
import { PageHero } from "@/components/shared/page-hero";

export const metadata: Metadata = {
  title: "Announcements | OBUSU",
  description: "View official student union announcements and updates.",
};

export default function AnnouncementsPage() {
  return (
    <>
      <PageHero
        title="Announcements"
        description="Important notices and updates from the OBUSU leadership."
      />
      <section className="py-14 sm:py-16">
        <Container className="space-y-10">
          <div id="latest" className="scroll-mt-28 space-y-6">
            <h2 className="text-xl font-semibold tracking-tight text-primary">Latest Announcements</h2>
            <AnnouncementsList />
          </div>
          <div id="notices" className="scroll-mt-28 space-y-4 border-t border-border/60 pt-10">
            <h2 className="text-xl font-semibold tracking-tight text-primary">Important Notices</h2>
            <p className="max-w-2xl text-sm text-muted-foreground">
              Policy reminders, deadlines, and mandatory notices are highlighted here when issued by the
              secretariat.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
