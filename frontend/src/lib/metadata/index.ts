import type { Metadata } from "next";

export const siteConfig = {
    name: "Evently",
    description:
        "Evently is a professional event management dashboard for modern organizers. Manage events, track vendors, monitor budgets, coordinate timelines, and orchestrate tasks from one unified workspace.",
    url: "https://evently.com",
    ogImage: "https://evently.com/og-image.png",
    author: "Evently",
    keywords: [
        "event management software",
        "event organizer dashboard",
        "vendor management system",
        "event budget tracker",
        "event planning tool",
        "professional event organizer",
        "event timeline management",
        "event task management",
        "event financial management",
        "vendor directory",
    ],
};

export const rootMetadata: Metadata = {
    title: {
        template: `%s | ${siteConfig.name}`,
        default: `${siteConfig.name} — Professional Event Management Dashboard`,
    },
    description: siteConfig.description,
    icons: {
        icon: "/icon.svg",
    },
    keywords: siteConfig.keywords,
    authors: [{ name: siteConfig.author }],
    openGraph: {
        title: `${siteConfig.name} — Professional Event Management Dashboard`,
        description: siteConfig.description,
        url: siteConfig.url,
        siteName: siteConfig.name,
        images: [
            {
                url: siteConfig.ogImage,
                width: 1200,
                height: 630,
                alt: `${siteConfig.name} Dashboard Preview`,
            },
        ],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: `${siteConfig.name} — Professional Event Management Dashboard`,
        description: siteConfig.description,
        images: [siteConfig.ogImage],
    },
};

export const homeMetadata: Metadata = {
    title: "Professional Event Management Dashboard",
    description:
        "The operating system for flawless events. Manage vendors, track budgets, coordinate timelines, and organize every detail from one powerful dashboard built for professional event organizers.",
    openGraph: {
        title: `${siteConfig.name} — Professional Event Management Dashboard`,
        description:
            "The operating system for flawless events. Synchronize vendors, automate budget tracking, and command timelines with a dashboard built for professionals.",
    },
    twitter: {
        title: `${siteConfig.name} — Professional Event Management Dashboard`,
        description:
            "The operating system for flawless events. Synchronize vendors, automate budget tracking, and command timelines with a dashboard built for professionals.",
    },
};

export const featuresMetadata: Metadata = {
    title: "Features",
    description:
        "Explore Evently's comprehensive feature set: event management, vendor ecosystem, financial operations, task orchestration, real-time analytics, and data architecture. Built for professional event organizers who demand precision and control.",
    openGraph: {
        title: `Features | ${siteConfig.name}`,
        description:
            "Discover how Evently helps you manage events, track vendors, monitor finances, coordinate tasks, and analyze performance from a single beautifully crafted dashboard.",
    },
    twitter: {
        title: `Features | ${siteConfig.name}`,
        description:
            "Discover how Evently helps you manage events, track vendors, monitor finances, coordinate tasks, and analyze performance from a single beautifully crafted dashboard.",
    },
};

export const newEventMetadata: Metadata = {
    title: "Create New Event",
    description:
        "Create a new event in Evently. Set up your event blueprint with title, client information, venue location, budget estimate, timeline dates, and vision description.",
    robots: { index: false },
};

export const profileSettingsMetadata: Metadata = {
    title: "Profile Settings",
    description: "Manage your Evently profile settings including personal information and account preferences.",
    robots: { index: false },
};

export const billingSettingsMetadata: Metadata = {
    title: "Billing Settings",
    description: "Manage your Evently billing settings, subscription plan, and payment methods.",
    robots: { index: false },
};

export const tasksOverviewMetadata: Metadata = {
    title: "Tasks",
    description:
        "View and manage all tasks across your events in Evently. Track milestones, priorities, due dates, and completion status from a unified task overview.",
    robots: { index: false },
};
