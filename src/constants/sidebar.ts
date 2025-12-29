import {
  Building2,
  Cog,
  Dumbbell,
  Frame,
  LifeBuoy,
  PackageCheck,
  PieChart,
  Send,
} from "lucide-react";

export const roleGradients = [
  "bg-linear-to-r from-cyan-200 via-blue-400 to-indigo-600",
  "bg-linear-to-r from-pink-200 via-red-400 to-rose-600",
  "bg-linear-to-r from-purple-200 via-indigo-400 to-violet-599",
];

export const SETTINGS_SIDEBAR_DATA = {
  title: "Settings",
  url: "/settings",
  isActive: true,
  icon: Cog,
  items: [
    {
      title: "Profile",
      url: "/settings/profile",
    },
    {
      title: "Team",
      url: "/settings/team",
    },
  ],
};

export const SIDEBAR_DATA = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Projects",
      url: "/projects",
      icon: Building2,
      isActive: true,
    },
    {
      title: "Subscriptions",
      url: "/subscriptions",
      icon: PackageCheck,
    },
    {
      title: "Exersices",
      url: "/exercises",
      icon: Dumbbell,
    },
    SETTINGS_SIDEBAR_DATA,
  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Settings",
      url: "#",
      icon: Cog,
    },
  ],
};
