import type { Metadata } from "next";
import { Cpu, Cross, Leaf, Scale } from "lucide-react";

import { Container } from "@/components/shared/container";
import { PageHero } from "@/components/shared/page-hero";
import { SectionHeader } from "@/components/shared/section-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { clubs } from "@/lib/university-data";

export const metadata: Metadata = {
  title: "Student Clubs | OBUSU",
  description: "Discover student clubs and activities coordinated under OBUSU.",
};

const iconMap = { Cpu, Cross, Leaf, Scale };

export default function ClubsPage() {
  return (
    <>
      <PageHero
        title="Student Clubs"
        description="Student-led clubs that strengthen leadership, social impact, and innovation."
      />
      <section className="py-14 sm:py-16">
        <Container className="space-y-10">
          <SectionHeader
            eyebrow="Clubs and Activities"
            title="Active Student Clubs"
            description="Clubs provide practical learning, community engagement, and inclusive participation."
          />
          <div className="grid gap-6 md:grid-cols-2">
            {clubs.map((club) => {
              const Icon = iconMap[club.icon];
              return (
                <div key={club.id} id={`club-${club.id}`} className="scroll-mt-28">
                  <Card className="h-full border-l-4 border-l-primary shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-xl">
                        <Icon className="h-4 w-4 text-primary" />
                        {club.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-muted-foreground">{club.description}</CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        </Container>
      </section>
    </>
  );
}
