"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CalendarDays, MapPin } from "lucide-react";

import { useAdminData } from "@/context/admin-data-context";
import { EmptyState } from "@/components/shared/empty-state";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { EventItem } from "@/types/content";

type EventsListProps = {
  items?: EventItem[];
};

export function EventsList({ items }: EventsListProps) {
  const { events, isLoadingData } = useAdminData();
  const eventItems = items ?? events;

  if (isLoadingData) {
    return (
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {[...Array(3)].map((_, index) => (
          <Card key={index} className="overflow-hidden">
            <Skeleton className="h-44 w-full" />
            <CardHeader className="space-y-2">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-2/3" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (eventItems.length === 0) {
    return (
      <EmptyState
        title="No events yet"
        description="Upcoming events will appear here as soon as they are published."
      />
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {eventItems.map((event, index) => (
        <motion.div
          key={event.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.08 }}
        >
          <Card className="group h-full overflow-hidden border-primary/10 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
            <div className="relative">
              <Image
                src={event.image}
                alt={event.title}
                width={800}
                height={520}
                className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute left-3 top-3 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground shadow">
                {event.date}
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-4 pb-3 pt-8">
                <h3 className="text-lg font-semibold text-white">{event.title}</h3>
              </div>
            </div>
            <CardHeader>
              <CardTitle className="sr-only">{event.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4" />
                {event.date}
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                {event.location}
              </p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
