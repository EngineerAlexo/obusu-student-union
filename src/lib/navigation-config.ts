/** Top-level mega-menu: labels, primary hrefs, and dropdown links (anchors where needed). */

import { electionTypes, unionDepartments } from "@/lib/university-data";
import { slugify } from "@/lib/utils";

export type NavDropdownItem = {
  label: string;
  href: string;
};

export type NavMenuSection = {
  id: string;
  label: string;
  href: string;
  items: NavDropdownItem[];
};

const CLUB_DROPDOWN: { label: string; id: string }[] = [
  { label: "Science & IT Club", id: "c1" },
  { label: "Red Cross Club", id: "c2" },
  { label: "Environmental Club", id: "c3" },
  { label: "Anti-Corruption Club", id: "c4" },
];

export const NAV_MENU: NavMenuSection[] = [
  {
    id: "home",
    label: "Home",
    href: "/",
    items: [
      { label: "Overview", href: "/#home-overview" },
      { label: "Latest Updates", href: "/#latest-updates" },
      { label: "Highlights", href: "/#highlights" },
    ],
  },
  {
    id: "events",
    label: "Events",
    href: "/events",
    items: [
      { label: "Upcoming Events", href: "/events#upcoming" },
      { label: "Past Events", href: "/events#past" },
      { label: "Featured Events", href: "/events#featured" },
    ],
  },
  {
    id: "announcements",
    label: "Announcements",
    href: "/announcements",
    items: [
      { label: "Latest Announcements", href: "/announcements#latest" },
      { label: "Important Notices", href: "/announcements#notices" },
    ],
  },
  {
    id: "admin",
    label: "Admin",
    href: "/admin",
    items: [
      { label: "Dashboard", href: "/admin" },
      { label: "Manage Events", href: "/admin/events" },
      { label: "Manage Announcements", href: "/admin/announcements" },
      { label: "Messages", href: "/admin/messages" },
    ],
  },
  {
    id: "more",
    label: "More",
    href: "/clubs",
    items: [
      { label: "Sports", href: "/clubs" },
      { label: "News", href: "/announcements" },
      { label: "About", href: "/#about-obusu" },
    ],
  },
  {
    id: "contact",
    label: "Contact",
    href: "/contact",
    items: [
      { label: "Contact Info", href: "/contact#contact-info" },
      { label: "Send Message", href: "/contact#send-message" },
    ],
  },
  {
    id: "elections",
    label: "Elections",
    href: "/elections",
    items: electionTypes.map((type) => ({
      label: type,
      href: `/elections#${slugify(type)}`,
    })),
  },
  {
    id: "union-structure",
    label: "Union Structure",
    href: "/union-structure",
    items: unionDepartments.map((d) => ({
      label: d.title,
      href: `/union-structure#dept-${d.id}`,
    })),
  },
  {
    id: "clubs",
    label: "Clubs",
    href: "/clubs",
    items: CLUB_DROPDOWN.map((c) => ({
      label: c.label,
      href: `/clubs#club-${c.id}`,
    })),
  },
  {
    id: "leaders",
    label: "Leaders",
    href: "/leaders",
    items: [
      { label: "Union President", href: "/leaders#leader-president" },
      { label: "General Secretary", href: "/leaders#leader-secretary" },
      { label: "Executive Members", href: "/leaders#leader-executive" },
    ],
  },
];
