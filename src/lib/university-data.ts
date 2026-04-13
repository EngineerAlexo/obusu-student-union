export const unionDepartments = [
  {
    id: "d1",
    title: "Academic Affairs",
    description: "Handles academic issues, student performance, and educational support.",
    icon: "BookOpen",
  },
  {
    id: "d2",
    title: "Admin & Finance",
    description: "Manages union resources, budgeting, and administrative operations.",
    icon: "Wallet",
  },
  {
    id: "d3",
    title: "Discipline & Security",
    description: "Ensures student discipline and campus safety.",
    icon: "ShieldCheck",
  },
  {
    id: "d4",
    title: "Women Affairs",
    description: "Supports female students and promotes gender equality.",
    icon: "Users",
  },
  {
    id: "d5",
    title: "Health & Food",
    description: "Oversees student health services and cafeteria quality.",
    icon: "HeartPulse",
  },
  {
    id: "d6",
    title: "Sports & Recreation",
    description: "Organizes sports events and recreational activities.",
    icon: "Trophy",
  },
  {
    id: "d7",
    title: "Charity & Development",
    description: "Leads community service and development programs.",
    icon: "HandHeart",
  },
  {
    id: "d8",
    title: "Disability Affairs",
    description: "Supports students with disabilities and ensures accessibility.",
    icon: "Accessibility",
  },
  {
    id: "d9",
    title: "Foreign Relations",
    description: "Builds connections with external institutions and organizations.",
    icon: "Globe",
  },
  {
    id: "d10",
    title: "Information & PR",
    description: "Handles communication, media, and public relations.",
    icon: "Megaphone",
  },
  {
    id: "d11",
    title: "Club Affairs",
    description: "Manages and coordinates all student clubs.",
    icon: "Network",
  },
] as const;

export const clubs = [
  {
    id: "c1",
    title: "Science and Information Technology Club",
    description: "Focuses on technology, coding, and innovation.",
    icon: "Cpu",
  },
  {
    id: "c2",
    title: "Red Cross Club",
    description: "Engages in humanitarian and emergency response activities.",
    icon: "Cross",
  },
  {
    id: "c3",
    title: "Environmental Conservation Club",
    description: "Promotes environmental protection and sustainability.",
    icon: "Leaf",
  },
  {
    id: "c4",
    title: "Anti-Corruption Club",
    description: "Raises awareness about ethics and transparency.",
    icon: "Scale",
  },
] as const;

export const electionTypes = [
  "Union Executive Elections",
  "Department Rep Elections",
  "Special Referendums",
  "Senate Member Elections",
] as const;

export const leaders = [
  {
    id: "l1",
    name: "Naafri Ahmed",
    position: "Union President",
    description: "Leader focused on student advocacy and academic improvement.",
    image: "/leaders/president.svg",
  },
  {
    id: "l2",
    name: "Abraham Dafaru",
    position: "General Secretary",
    description: "Responsible for coordination and communication within the union.",
    image: "/leaders/secretary.svg",
  },
] as const;
