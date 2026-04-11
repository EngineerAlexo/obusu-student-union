"use client";

import { Bell, CalendarDays, Mail } from "lucide-react";

import { useAdminData } from "@/context/admin-data-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const statsMeta = [
  { key: "events", label: "Total Events", icon: CalendarDays },
  { key: "announcements", label: "Total Announcements", icon: Bell },
  { key: "messages", label: "Total Messages", icon: Mail },
] as const;

export function DashboardStats() {
  const { events, announcements, messages, isLoadingData } = useAdminData();

  const counts = {
    events: events.length,
    announcements: announcements.length,
    messages: messages.length,
  };

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {statsMeta.map((item) => {
        const Icon = item.icon;
        return (
          <Card key={item.key} className="border-primary/10 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-sm text-muted-foreground uppercase tracking-wide">
                <Icon className="h-4 w-4 text-primary" />
                {item.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-primary">
                {isLoadingData ? "--" : counts[item.key]}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
