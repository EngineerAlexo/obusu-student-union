"use client";

import { motion } from "framer-motion";
import { Megaphone } from "lucide-react";

import { RichTextContent } from "@/components/shared/rich-text-content";
import { useAdminData } from "@/context/admin-data-context";
import { EmptyState } from "@/components/shared/empty-state";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { Announcement } from "@/types/content";

type AnnouncementsListProps = {
  items?: Announcement[];
};

export function AnnouncementsList({ items }: AnnouncementsListProps) {
  const { announcements, isLoadingData } = useAdminData();
  const announcementItems = items ?? announcements;

  if (isLoadingData) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, index) => (
          <Card key={index}>
            <CardHeader className="space-y-3">
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-4 w-1/4" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (announcementItems.length === 0) {
    return (
      <EmptyState
        title="No announcements available"
        description="Check back soon for important notices and updates."
      />
    );
  }

  return (
    <div className="space-y-4">
      {announcementItems.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: index * 0.08 }}
        >
          <Card className="border-l-4 border-l-primary shadow-sm transition-all hover:shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Megaphone className="h-4 w-4 text-primary" />
                {item.title}
              </CardTitle>
              <CardDescription className="font-medium text-primary/80">{item.date}</CardDescription>
            </CardHeader>
            <CardContent>
              <RichTextContent html={item.description} />
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
