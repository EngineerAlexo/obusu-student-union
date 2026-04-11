import { isSupabaseConfigured, supabase } from "@/lib/supabase";
import type {
  Announcement,
  AnnouncementInput,
  Event,
  EventInput,
  Message,
  MessageInput,
} from "@/types/admin";

function formatDate(value: string | null) {
  if (!value) return "N/A";
  return new Date(value).toLocaleDateString();
}

function assertSupabaseConfigured() {
  if (!isSupabaseConfigured) {
    throw new Error("Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.");
  }
}

function formatDateTime(value: string | null) {
  if (!value) return "N/A";
  return new Date(value).toLocaleString();
}

export async function fetchEvents(): Promise<Event[]> {
  assertSupabaseConfigured();
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .order("event_date", { ascending: false });

  if (error) throw new Error(error.message);

  return (data ?? []).map((item) => ({
    id: item.id,
    title: item.title ?? "",
    description: item.description ?? "",
    date: item.event_date ?? "",
    location: item.location ?? "",
    image: item.image_url ?? "",
    createdAt: item.created_at ?? "",
  }));
}

async function uploadEventImage(file: File) {
  const extension = file.name.split(".").pop() ?? "jpg";
  const path = `events/${Date.now()}-${crypto.randomUUID()}.${extension}`;

  const { error: uploadError } = await supabase.storage
    .from("obusu-events")
    .upload(path, file, { upsert: false });

  if (uploadError) throw new Error(uploadError.message);

  const { data } = supabase.storage.from("obusu-events").getPublicUrl(path);
  return data.publicUrl;
}

export async function createEvent(payload: EventInput, imageFile?: File | null) {
  assertSupabaseConfigured();
  const imageUrl = imageFile ? await uploadEventImage(imageFile) : payload.image ?? null;

  const { error } = await supabase.from("events").insert({
    title: payload.title,
    description: payload.description,
    location: payload.location,
    event_date: payload.date,
    image_url: imageUrl,
  });

  if (error) throw new Error(error.message);
}

export async function updateEventById(id: string, payload: EventInput, imageFile?: File | null) {
  assertSupabaseConfigured();
  const imageUrl = imageFile ? await uploadEventImage(imageFile) : payload.image ?? null;

  const { error } = await supabase
    .from("events")
    .update({
      title: payload.title,
      description: payload.description,
      location: payload.location,
      event_date: payload.date,
      image_url: imageUrl,
    })
    .eq("id", id);

  if (error) throw new Error(error.message);
}

export async function deleteEventById(id: string) {
  assertSupabaseConfigured();
  const { error } = await supabase.from("events").delete().eq("id", id);
  if (error) throw new Error(error.message);
}

export async function fetchAnnouncements(): Promise<Announcement[]> {
  assertSupabaseConfigured();
  const { data, error } = await supabase
    .from("announcements")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);

  return (data ?? []).map((item) => ({
    id: item.id,
    title: item.title ?? "",
    description: item.description ?? "",
    date: formatDate(item.created_at),
    createdAt: item.created_at ?? "",
  }));
}

export async function createAnnouncement(payload: AnnouncementInput) {
  assertSupabaseConfigured();
  const { error } = await supabase.from("announcements").insert({
    title: payload.title,
    description: payload.description,
  });

  if (error) throw new Error(error.message);
}

export async function updateAnnouncementById(id: string, payload: AnnouncementInput) {
  assertSupabaseConfigured();
  const { error } = await supabase
    .from("announcements")
    .update({
      title: payload.title,
      description: payload.description,
    })
    .eq("id", id);

  if (error) throw new Error(error.message);
}

export async function deleteAnnouncementById(id: string) {
  assertSupabaseConfigured();
  const { error } = await supabase.from("announcements").delete().eq("id", id);
  if (error) throw new Error(error.message);
}

export async function fetchMessages(): Promise<Message[]> {
  assertSupabaseConfigured();
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);

  return (data ?? []).map((item) => ({
    id: item.id,
    name: item.name ?? "",
    email: item.email ?? "",
    message: item.message ?? "",
    date: formatDateTime(item.created_at),
    createdAt: item.created_at ?? "",
  }));
}

export async function createMessage(payload: MessageInput) {
  assertSupabaseConfigured();
  const { error } = await supabase.from("messages").insert({
    name: payload.name,
    email: payload.email,
    message: payload.message,
  });

  if (error) throw new Error(error.message);
}

export async function deleteMessageById(id: string) {
  assertSupabaseConfigured();
  const { error } = await supabase.from("messages").delete().eq("id", id);
  if (error) throw new Error(error.message);
}
