"use client";

import Image from "next/image";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { ChangeEvent, FormEvent, useMemo, useState } from "react";
import { toast } from "sonner";

import { PaginationControls } from "@/components/shared/pagination-controls";
import { RichTextContent } from "@/components/shared/rich-text-content";
import { RichTextEditor } from "@/components/shared/rich-text-editor";
import { useAdminData } from "@/context/admin-data-context";
import type { Event } from "@/types/admin";
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

type EventFormState = {
  title: string;
  description: string;
  date: string;
  location: string;
  image: string;
};

const initialForm: EventFormState = {
  title: "",
  description: "",
  date: "",
  location: "",
  image: "",
};

export function EventsManager() {
  const { events, addEvent, updateEvent, deleteEvent, isLoadingData } = useAdminData();
  const [form, setForm] = useState<EventFormState>(initialForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [toDelete, setToDelete] = useState<Event | null>(null);
  const [previewImage, setPreviewImage] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [page, setPage] = useState(1);
  const perPage = 5;

  const isEditing = Boolean(editingId);
  const currentPreview = useMemo(() => previewImage || form.image, [form.image, previewImage]);
  const pageCount = Math.ceil(events.length / perPage);
  const pagedEvents = events.slice((page - 1) * perPage, page * perPage);

  const resetForm = () => {
    setForm(initialForm);
    setEditingId(null);
    setPreviewImage("");
    setSelectedFile(null);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setSelectedFile(file);
    const previewUrl = URL.createObjectURL(file);
    setPreviewImage(previewUrl);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.title || !form.description || !form.date || !form.location) {
      toast.error("Please fill all event fields including image.");
      return;
    }

    if (!editingId && !selectedFile) {
      toast.error("Please choose an image to upload.");
      return;
    }

    try {
      setIsSubmitting(true);
      if (editingId) {
        await updateEvent(editingId, form, selectedFile);
        toast.success("Event updated");
      } else {
        await addEvent(form, selectedFile);
        toast.success("Event created");
      }
      resetForm();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to save event.";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (item: Event) => {
    setEditingId(item.id);
    setForm({
      title: item.title,
      description: item.description,
      date: item.date,
      location: item.location,
      image: item.image,
    });
    setPreviewImage(item.image);
    setSelectedFile(null);
  };

  const handleDelete = async () => {
    if (!toDelete) return;
    try {
      setIsDeleting(true);
      await deleteEvent(toDelete.id);
      toast.success("Event deleted");
      setToDelete(null);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to delete event.";
      toast.error(message);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-primary/10 shadow-sm">
        <CardHeader>
          <CardTitle>{isEditing ? "Edit Event" : "Add Event"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-sm font-medium">Title</label>
              <Input
                value={form.title}
                onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
                placeholder="Event title"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Date</label>
              <Input
                type="date"
                value={form.date}
                onChange={(e) => setForm((prev) => ({ ...prev, date: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Location</label>
              <Input
                value={form.location}
                onChange={(e) => setForm((prev) => ({ ...prev, location: e.target.value }))}
                placeholder="Event location"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Image Upload</label>
              <Input type="file" accept="image/*" onChange={handleFileChange} />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium">Description (Rich Text)</label>
              <RichTextEditor
                value={form.description}
                onChange={(value) => setForm((prev) => ({ ...prev, description: value }))}
              />
            </div>
            {currentPreview ? (
              <div className="md:col-span-2">
                <p className="mb-2 text-sm font-medium">Image Preview</p>
                <Image
                  src={currentPreview}
                  alt="Event preview"
                  width={600}
                  height={340}
                  className="h-44 w-full rounded-lg border object-cover md:w-80"
                />
              </div>
            ) : null}

            <div className="flex gap-2 md:col-span-2">
              <Button type="submit" disabled={isSubmitting}>
                <Plus className="mr-1 h-4 w-4" />
                {isSubmitting ? "Saving..." : isEditing ? "Update Event" : "Add Event"}
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
        <p className="text-sm text-muted-foreground">Loading events...</p>
      ) : events.length === 0 ? (
        <EmptyState
          title="No events added yet"
          description="Create your first event using the form above."
        />
      ) : (
        <>
          <div className="overflow-x-auto rounded-xl border bg-card shadow-sm">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[110px]">Image</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead className="min-w-[260px]">Description</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead className="w-[180px] text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pagedEvents.map((item) => (
                  <TableRow key={item.id} className="transition-colors hover:bg-muted/40">
                    <TableCell>
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={96}
                        height={64}
                        className="h-14 w-20 rounded-md object-cover"
                      />
                    </TableCell>
                    <TableCell className="font-medium">{item.title}</TableCell>
                    <TableCell>
                      <RichTextContent html={item.description} className="line-clamp-2 max-w-md" />
                    </TableCell>
                    <TableCell>{item.date}</TableCell>
                    <TableCell>{item.location}</TableCell>
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
            <AlertDialogTitle>Delete this event?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently remove the event from the dashboard list.
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
