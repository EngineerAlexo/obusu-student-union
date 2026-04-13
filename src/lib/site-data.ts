import type { NavLink, Service, Testimonial } from "@/types/content";

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Events", href: "/events" },
  { label: "Announcements", href: "/announcements" },
  { label: "Admin", href: "/admin" },
  { label: "Contact", href: "/contact" },
  { label: "Elections", href: "/elections" },
  { label: "Union Structure", href: "/union-structure" },
  { label: "Clubs", href: "/clubs" },
  { label: "Leaders", href: "/leaders" },
];

export const services: Service[] = [
  {
    id: "s1",
    title: "Academic Advocacy",
    description:
      "We represent student concerns to faculty and administration for fair academic policies.",
  },
  {
    id: "s2",
    title: "Welfare Support",
    description:
      "Emergency support and guidance for housing, health, and student wellbeing challenges.",
  },
  {
    id: "s3",
    title: "Career Development",
    description:
      "Workshops, mentorship, and internship opportunities that prepare students for life after school.",
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Priscilla A.",
    role: "Level 300, Accounting",
    quote:
      "OBUSU helped me find mentorship and internship opportunities I did not know existed.",
  },
  {
    id: "t2",
    name: "Ebenezer K.",
    role: "Level 200, IT",
    quote:
      "The events are well organized and they make campus life more engaging and practical.",
  },
  {
    id: "t3",
    name: "Abena O.",
    role: "Level 400, Marketing",
    quote:
      "Whenever students need representation, OBUSU listens and takes quick action.",
  },
];
