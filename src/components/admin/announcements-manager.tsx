"use client";

import { Pencil, Plus, Trash2 } from "lucide-react";
import { FormEvent, useState } from "react";
import { toast } from "sonner";

import { PaginationControls } from "@/components/shared/pagination-controls";
import { RichTextContent } from "@/components/shared/rich-text-content";
import { RichTextEditor } from "@/components/shared/rich-text-editor";
import { useAdminData } from "@/context/admin-data-context";
import type { Announcement } from "@/types/admin";
import { EmptyState } from "@/components/shared/empty-state";
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
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type AnnouncementFormState = {
  title: string;
  description: string;
};

const initialForm: AnnouncementFormState = {
  title: "",
  description: "",
};

export function AnnouncementsManager() {
  const { announcements, addAnnouncement, updateAnnouncement, deleteAnnouncement, isLoadingData } =
    useAdminData();
  const [form, setForm] = useState<AnnouncementFormState>(initialForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [toDelete, setToDelete] = useState<Announcement | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [page, setPage] = useState(1);
  const perPage = 6;

  const isEditing = Boolean(editingId);
  const pageCount = Math.ceil(announcements.length / perPage);
  const pagedAnnouncements = announcements.slice((page - 1) * perPage, page * perPage);

  const resetForm = () => {
    setForm(initialForm);
    setEditingId(null);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.title || !form.description) {
      toast.error("Please fill all announcement fields.");
      return;
    }

    try {
      setIsSubmitting(true);
      if (editingId) {
        await updateAnnouncement(editingId, form);
        toast.success("Announcement updated");
      } else {
        await addAnnouncement(form);
        toast.success("Announcement added");
      }
      resetForm();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to save announcement.";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (item: Announcement) => {
    setEditingId(item.id);
    setForm({
      title: item.title,
      description: item.description,
    });
  };

  const handleDelete = async () => {
    if (!toDelete) return;
    try {
      setIsDeleting(true);
      await deleteAnnouncement(toDelete.id);
      toast.success("Announcement deleted");
      setToDelete(null);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to delete announcement.";
      toast.error(message);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-primary/10 shadow-sm">
        <CardHeader>
          <CardTitle>{isEditing ? "Edit Announcement" : "Add Announcement"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-sm font-medium">Title</label>
              <Input
                value={form.title}
                onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
                placeholder="Announcement title"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium">Description (Rich Text)</label>
              <RichTextEditor
                value={form.description}
                onChange={(value) => setForm((prev) => ({ ...prev, description: value }))}
              />
            </div>
            <div className="flex gap-2 md:col-span-2">
              <Button type="submit" disabled={isSubmitting}>
                <Plus className="mr-1 h-4 w-4" />
                {isSubmitting
                  ? "Saving..."
                  : isEditing
                    ? "Update Announcement"
                    : "Add Announcement"}
              </Button>
              {isEditing ? (
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel Edit
                </Button>
              ) : null}
            </div>
          </form>
        </CardContent>
      </Card>

      {isLoadingData ? (
        <p className="text-sm text-muted-foreground">Loading announcements...</p>
      ) : announcements.length === 0 ? (
        <EmptyState
          title="No announcements yet"
          description="Add your first announcement from the form above."
        />
      ) : (
        <>
          <div className="overflow-x-auto rounded-xl border bg-card shadow-sm">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Published</TableHead>
                  <TableHead className="w-[170px] text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pagedAnnouncements.map((item) => (
                  <TableRow key={item.id} className="transition-colors hover:bg-muted/40">
                    <TableCell className="font-medium">{item.title}</TableCell>
                    <TableCell className="max-w-md">
                      <RichTextContent html={item.description} className="line-clamp-2" />
                    </TableCell>
                    <TableCell>{item.date}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button size="sm" variant="outline" onClick={() => handleEdit(item)}>
                          <Pencil className="mr-1 h-4 w-4" />
                          Edit
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
        </>
      )}

      <AlertDialog open={Boolean(toDelete)} onOpenChange={(open) => !open && setToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this announcement?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone and the announcement will be removed.
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
    </div>
  );
}
