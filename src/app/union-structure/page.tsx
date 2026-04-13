import type { Metadata } from "next";
import {
  Accessibility,
  BookOpen,
  Globe,
  HandHeart,
  HeartPulse,
  Megaphone,
  Network,
  ShieldCheck,
  Trophy,
  Users,
  Wallet,
} from "lucide-react";

import { Container } from "@/components/shared/container";
import { PageHero } from "@/components/shared/page-hero";
import { SectionHeader } from "@/components/shared/section-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { unionDepartments } from "@/lib/university-data";

export const metadata: Metadata = {
  title: "Union Structure | OBUSU",
  description: "Explore the organizational structure of OBUSU and its departments.",
};

const iconMap = {
  BookOpen,
  Wallet,
  ShieldCheck,
  Users,
  HeartPulse,
  Trophy,
  HandHeart,
  Accessibility,
  Globe,
  Megaphone,
  Network,
};

export default function UnionStructurePage() {
  return (
    <>
      <PageHero
        title="Union Structure"
        description="Departments and committees that coordinate student representation and services."
      />
      <section className="py-14 sm:py-16">
        <Container className="space-y-10">
          <SectionHeader
            eyebrow="Departments"
            title="How OBUSU is Organized"
            description="Each department has a clear mandate to support students and improve campus life."
          />
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {unionDepartments.map((item) => {
              const Icon = iconMap[item.icon];
              return (
                <div key={item.id} id={`dept-${item.id}`} className="scroll-mt-28">
                  <Card className="h-full border-l-4 border-l-primary shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Icon className="h-4 w-4 text-primary" />
                        {item.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-muted-foreground">
                      {item.description}
                    </CardContent>
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
