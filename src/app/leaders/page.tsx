import type { Metadata } from "next";
import Image from "next/image";

import { Container } from "@/components/shared/container";
import { PageHero } from "@/components/shared/page-hero";
import { SectionHeader } from "@/components/shared/section-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { leaders } from "@/lib/university-data";

export const metadata: Metadata = {
  title: "Leaders | OBUSU",
  description: "Meet the current executive leaders serving OBUSU students.",
};

export default function LeadersPage() {
  return (
    <>
      <PageHero
        title="Leaders"
        description="Executive officers committed to student advocacy, service, and institutional collaboration."
      />
      <section className="py-14 sm:py-16">
        <Container className="space-y-10">
          <SectionHeader
            eyebrow="Leadership Team"
            title="Union Executives"
            description="Current leaders guiding student union priorities and operations."
          />
          <div className="grid gap-6 md:grid-cols-2">
            {leaders.map((leader) => (
              <div
                key={leader.id}
                id={leader.position === "Union President" ? "leader-president" : "leader-secretary"}
                className="scroll-mt-28"
              >
                <Card className="overflow-hidden border-primary/10 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
                  <Image
                    src={leader.image}
                    alt={leader.name}
                    width={640}
                    height={460}
                    className="h-56 w-full object-cover"
                  />
                  <CardHeader>
                    <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                      {leader.position}
                    </p>
                    <CardTitle>{leader.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    {leader.description}
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          <div
            id="leader-executive"
            className="scroll-mt-28 rounded-2xl border border-primary/10 bg-muted/30 p-6 shadow-sm"
          >
            <h3 className="text-lg font-semibold text-primary">Executive Members</h3>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
              Additional executive portfolios and committee leads are published here as appointments are
              confirmed by the union assembly.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
