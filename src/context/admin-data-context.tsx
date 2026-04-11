"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  createAnnouncement,
  createEvent,
  createMessage,
  deleteAnnouncementById,
  deleteEventById,
  deleteMessageById,
  fetchAnnouncements,
  fetchEvents,
  fetchMessages,
  updateAnnouncementById,
  updateEventById,
} from "@/lib/supabase-services";
import type {
  Announcement,
  AnnouncementInput,
  Event,
  EventInput,
  Message,
  MessageInput,
} from "@/types/admin";

type AdminDataContextValue = {
  events: Event[];
  announcements: Announcement[];
  messages: Message[];
  isLoadingData: boolean;
  refreshData: () => Promise<void>;
  addEvent: (payload: EventInput, imageFile?: File | null) => Promise<void>;
  updateEvent: (
    id: string,
    payload: EventInput,
    imageFile?: File | null,
  ) => Promise<void>;
  deleteEvent: (id: string) => Promise<void>;
  addAnnouncement: (payload: AnnouncementInput) => Promise<void>;
  updateAnnouncement: (id: string, payload: AnnouncementInput) => Promise<void>;
  deleteAnnouncement: (id: string) => Promise<void>;
  addMessage: (payload: MessageInput) => Promise<void>;
  deleteMessage: (id: string) => Promise<void>;
};

const AdminDataContext = createContext<AdminDataContextValue | undefined>(undefined);

export function AdminDataProvider({ children }: { children: ReactNode }) {
  const [events, setEvents] = useState<Event[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);

  const refreshData = useCallback(async () => {
    try {
      setIsLoadingData(true);
      const [eventsData, announcementsData, messagesData] = await Promise.all([
        fetchEvents(),
        fetchAnnouncements(),
        fetchMessages(),
      ]);
      setEvents(eventsData);
      setAnnouncements(announcementsData);
      setMessages(messagesData);
    } finally {
      setIsLoadingData(false);
    }
  }, []);

  useEffect(() => {
    refreshData().catch(() => {
      setEvents([]);
      setAnnouncements([]);
      setMessages([]);
      setIsLoadingData(false);
    });
  }, [refreshData]);

  const addEvent: AdminDataContextValue["addEvent"] = useCallback(
    async (payload, imageFile) => {
      await createEvent(payload, imageFile);
      await refreshData();
    },
    [refreshData],
  );

  const updateEvent: AdminDataContextValue["updateEvent"] = useCallback(
    async (id, payload, imageFile) => {
      await updateEventById(id, payload, imageFile);
      await refreshData();
    },
    [refreshData],
  );

  const deleteEvent: AdminDataContextValue["deleteEvent"] = useCallback(
    async (id) => {
      await deleteEventById(id);
      await refreshData();
    },
    [refreshData],
  );

  const addAnnouncement: AdminDataContextValue["addAnnouncement"] = useCallback(
    async (payload) => {
      await createAnnouncement(payload);
      await refreshData();
    },
    [refreshData],
  );

  const updateAnnouncement: AdminDataContextValue["updateAnnouncement"] = useCallback(
    async (id, payload) => {
      await updateAnnouncementById(id, payload);
      await refreshData();
    },
    [refreshData],
  );

  const deleteAnnouncement: AdminDataContextValue["deleteAnnouncement"] = useCallback(
    async (id) => {
      await deleteAnnouncementById(id);
      await refreshData();
    },
    [refreshData],
  );

  const addMessage: AdminDataContextValue["addMessage"] = useCallback(
    async (payload) => {
      await createMessage(payload);
      await refreshData();
    },
    [refreshData],
  );

  const deleteMessage: AdminDataContextValue["deleteMessage"] = useCallback(
    async (id) => {
      await deleteMessageById(id);
      await refreshData();
    },
    [refreshData],
  );

  const value = useMemo(
    () => ({
      events,
      announcements,
      messages,
      isLoadingData,
      refreshData,
      addEvent,
      updateEvent,
      deleteEvent,
      addAnnouncement,
      updateAnnouncement,
      deleteAnnouncement,
      addMessage,
      deleteMessage,
    }),
    [
      addAnnouncement,
      addEvent,
      addMessage,
      deleteAnnouncement,
      deleteEvent,
      deleteMessage,
      announcements,
      events,
      isLoadingData,
      messages,
      refreshData,
      updateAnnouncement,
      updateEvent,
    ],
  );

  return <AdminDataContext.Provider value={value}>{children}</AdminDataContext.Provider>;
}

export function useAdminData() {
  const context = useContext(AdminDataContext);
  if (!context) {
    throw new Error("useAdminData must be used inside AdminDataProvider");
  }
  return context;
}
