import { supabaseUrl } from "@/shared/lib/supabase";
import {
  BookOpen,
  Bot,
  Frame,
  LifeBuoy,
  PieChart,
  Send,
  Settings2,
  SquareTerminal,
} from "lucide-react";

export const roleGradients = [
  "bg-linear-to-r from-cyan-200 via-blue-400 to-indigo-600",
  "bg-linear-to-r from-pink-200 via-red-400 to-rose-600",
  "bg-linear-to-r from-purple-200 via-indigo-400 to-violet-600",
];

export const SETTINGS_SIDEBAR_DATA = {
  title: "Settings",
  url: "/settings",
  icon: Settings2,
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
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "History",
          url: "#",
        },
        {
          title: "Starred",
          url: "#",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    },
    {
      title: "Models",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Genesis",
          url: "#",
        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
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
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

export const BUCKET_URLS = {
  avatar: `${supabaseUrl}/storage/v1/object/public/avatars/`,
  projectLogos: `${supabaseUrl}/storage/v1/object/public/projects/`,
};
