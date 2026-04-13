import type { Metadata } from "next";
import { BadgeCheck, CalendarDays, MonitorSmartphone, Users } from "lucide-react";

import { Container } from "@/components/shared/container";
import { PageHero } from "@/components/shared/page-hero";
import { SectionHeader } from "@/components/shared/section-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { electionTypes } from "@/lib/university-data";
import { slugify } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Elections | OBUSU",
  description: "Election types and current voting cycle information for OBUSU.",
};

export default function ElectionsPage() {
  return (
    <>
      <PageHero
        title="Elections"
        description="Transparent democratic processes for student representation and governance."
      />
      <section className="py-14 sm:py-16">
        <Container className="space-y-10">
          <SectionHeader
            eyebrow="Election Types"
            title="Voting Categories"
            description="Major election categories managed by the student union."
          />
          <div className="grid gap-4 md:grid-cols-2">
            {electionTypes.map((type) => (
              <Card
                key={type}
                id={slugify(type)}
                className="scroll-mt-28 border-l-4 border-l-primary shadow-sm"
              >
                <CardContent className="py-4 text-sm font-medium">{type}</CardContent>
              </Card>
            ))}
          </div>

          <Card className="border-2 border-primary/30 bg-primary/5 shadow-lg">
            <CardHeader>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <CardTitle className="text-2xl text-primary">Union Executive Elections 2025</CardTitle>
                <Badge className="bg-emerald-600 text-white">Active</Badge>
              </div>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              <p className="flex items-center gap-2 text-sm text-muted-foreground">
                <CalendarDays className="h-4 w-4 text-primary" />
                Dates: Nov 25 - Dec 5, 2025
              </p>
              <p className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="h-4 w-4 text-primary" />
                Eligible Voters: 2,800 students
              </p>
              <p className="flex items-center gap-2 text-sm text-muted-foreground">
                <MonitorSmartphone className="h-4 w-4 text-primary" />
                Platform: Digital Voting System
              </p>
              <p className="flex items-center gap-2 text-sm text-muted-foreground">
                <BadgeCheck className="h-4 w-4 text-primary" />
                Candidates: 4 Candidate Pairs
              </p>
            </CardContent>
          </Card>
        </Container>
      </section>
    </>
  );
}
