import type { Metadata } from "next";

import { ContactForm } from "@/components/contact/contact-form";
import { Container } from "@/components/shared/container";
import { PageHero } from "@/components/shared/page-hero";

export const metadata: Metadata = {
  title: "Contact | OBUSU",
  description: "Reach out to OBUSU for support, ideas, and collaboration.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Contact OBUSU"
        description="Send a message to our team and we will get back to you as soon as possible."
      />
      <section className="py-14 sm:py-16">
        <Container>
          <ContactForm />
        </Container>
      </section>
    </>
  );
}
