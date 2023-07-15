import * as Lucide from "lucide-react";

export type NavItemsGroups = {
  id: string;
  title?: string;
  items: {
    label: string;
    href: string;
    icon: keyof typeof Lucide;
  }[];
}[];

// add new group to show new section in the nav
export const navItemsGroups: NavItemsGroups = [
  {
    id: "profile",
    items: [
      {
        label: "Settings",
        href: "/settings",
        icon: "Settings",
      },
      {
        label: "Teams",
        href: "/teams",
        icon: "Group",
      },
    ],
  },
  {
    id: "menu",
    title: "Menu",
    items: [
      {
        label: "Market",
        href: "/",
        icon: "CandlestickChart",
      },
      {
        label: "News",
        href: "/news",
        icon: "Newspaper",
      },
      {
        label: "Portfolio",
        href: "/portfolio",
        icon: "PieChart",
      },
    ],
  },
];
