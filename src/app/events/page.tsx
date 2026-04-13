import type { Metadata } from "next";

import { EventsList } from "@/components/events/events-list";
import { Container } from "@/components/shared/container";
import { PageHero } from "@/components/shared/page-hero";

export const metadata: Metadata = {
  title: "Events | OBUSU",
  description: "Explore upcoming OBUSU events and student activities.",
};

export default function EventsPage() {
  return (
    <>
      <PageHero
        title="Events"
        description="Discover impactful programs and connect with the OBUSU community."
      />
      <section className="py-14 sm:py-16">
        <Container className="space-y-14">
          <div id="upcoming" className="scroll-mt-28 space-y-6">
            <h2 className="text-xl font-semibold tracking-tight text-primary">Upcoming Events</h2>
            <EventsList />
          </div>

          <div id="past" className="scroll-mt-28 space-y-4">
            <h2 className="text-xl font-semibold tracking-tight text-primary">Past Events</h2>
            <p className="max-w-2xl text-sm text-muted-foreground">
              Archived highlights from previous semesters will be listed here as they are published by the union.
            </p>
          </div>

          <div id="featured" className="scroll-mt-28 space-y-4">
            <h2 className="text-xl font-semibold tracking-tight text-primary">Featured Events</h2>
            <p className="max-w-2xl text-sm text-muted-foreground">
              Spotlight programs selected by OBUSU leadership appear in this section when designated.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
