"use client";

import { Eye, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { useAdminData } from "@/context/admin-data-context";
import type { Message } from "@/types/admin";
import { PaginationControls } from "@/components/shared/pagination-controls";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { EmptyState } from "@/components/shared/empty-state";

export function MessagesTable() {
  const { messages, deleteMessage, isLoadingData } = useAdminData();
  const [selected, setSelected] = useState<Message | null>(null);
  const [toDelete, setToDelete] = useState<Message | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [page, setPage] = useState(1);
  const perPage = 6;
  const pageCount = Math.ceil(messages.length / perPage);
  const pagedMessages = messages.slice((page - 1) * perPage, page * perPage);

  const handleDelete = async () => {
    if (!toDelete) return;
    try {
      setIsDeleting(true);
      await deleteMessage(toDelete.id);
      toast.success("Message deleted");
      setToDelete(null);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to delete message.";
      toast.error(message);
    } finally {
      setIsDeleting(false);
    }
  };

  if (isLoadingData) {
    return <p className="text-sm text-muted-foreground">Loading messages...</p>;
  }

  if (messages.length === 0) {
    return (
      <EmptyState
        title="No messages available"
        description="New contact messages will appear here."
      />
    );
  }

  return (
    <>
      <div className="overflow-x-auto rounded-xl border bg-card shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="min-w-[280px]">Message</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="w-[160px] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pagedMessages.map((item) => (
              <TableRow key={item.id} className="transition-colors hover:bg-muted/40">
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell className="text-muted-foreground">
                  {item.message.length > 90 ? `${item.message.slice(0, 90)}...` : item.message}
                </TableCell>
                <TableCell>{item.date}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button size="sm" variant="outline" onClick={() => setSelected(item)}>
                      <Eye className="mr-1 h-4 w-4" />
                      View
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => setToDelete(item)}>
                      <Trash2 className="mr-1 h-4 w-4" />
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <PaginationControls
        page={page}
        pageCount={pageCount}
        onPrevious={() => setPage((current) => Math.max(1, current - 1))}
        onNext={() => setPage((current) => Math.min(pageCount, current + 1))}
      />

      <Dialog open={Boolean(selected)} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Message Details</DialogTitle>
            <DialogDescription>Submitted from the contact page.</DialogDescription>
          </DialogHeader>
          {selected ? (
            <div className="space-y-3 text-sm">
              <p>
                <span className="font-semibold">Name:</span> {selected.name}
              </p>
              <p>
                <span className="font-semibold">Email:</span> {selected.email}
              </p>
              <p>
                <span className="font-semibold">Date:</span> {selected.date}
              </p>
              <p>
                <span className="font-semibold">Message:</span>
              </p>
              <p className="rounded-lg bg-muted p-3 text-muted-foreground">{selected.message}</p>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>

      <AlertDialog open={Boolean(toDelete)} onOpenChange={(open) => !open && setToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this message?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone and the message will be permanently removed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={isDeleting}>
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
