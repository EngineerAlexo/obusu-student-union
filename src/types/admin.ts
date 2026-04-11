export type Event = {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  image: string;
  createdAt: string;
};

export type Announcement = {
  id: string;
  title: string;
  description: string;
  date: string;
  createdAt: string;
};

export type Message = {
  id: string;
  name: string;
  email: string;
  message: string;
  date: string;
  createdAt: string;
};

export type AdminDataState = {
  events: Event[];
  announcements: Announcement[];
  messages: Message[];
};

export type EventInput = {
  title: string;
  description: string;
  date: string;
  location: string;
  image?: string;
};

export type AnnouncementInput = {
  title: string;
  description: string;
};

export type MessageInput = {
  name: string;
  email: string;
  message: string;
};
