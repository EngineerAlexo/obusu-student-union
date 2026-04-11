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
        <Container>
          <EventsList />
        </Container>
      </section>
    </>
  );
}
