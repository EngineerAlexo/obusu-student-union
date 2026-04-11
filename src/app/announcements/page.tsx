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
        <Container>
          <AnnouncementsList />
        </Container>
      </section>
    </>
  );
}
