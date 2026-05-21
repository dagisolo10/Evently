import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "@/types/types";
import {
    Activity,
    ArrowRightLeft,
    BarChart3,
    Bell,
    Calendar,
    CheckCircle2,
    DollarSign,
    GanttChartSquare,
    Globe,
    Handshake,
    LayoutDashboard,
    Link2,
    PiggyBank,
    ScrollText,
    Timer,
    TrendingUp,
    Truck,
    Users,
    Wallet,
} from "lucide-react";

const sectionColorMap = {
    primary: {
        text: "text-primary",
        bg: "bg-primary",
        border: "border-primary/20",
    },
    emerald: {
        text: "text-emerald-500",
        bg: "bg-emerald-500",
        border: "border-emerald-500/20",
    },
    amber: {
        text: "text-amber-500",
        bg: "bg-amber-500",
        border: "border-amber-500/20",
    },
    blue: {
        text: "text-blue-500",
        bg: "bg-blue-500",
        border: "border-blue-500/20",
    },
    violet: {
        text: "text-violet-500",
        bg: "bg-violet-500",
        border: "border-violet-500/20",
    },
    rose: {
        text: "text-rose-500",
        bg: "bg-rose-500",
        border: "border-rose-500/20",
    },
};

const featureGroups = [
    {
        title: "Command Center",
        subtitle: "Your mission control for every event operation.",
        color: "primary" as keyof typeof sectionColorMap,
        features: [
            {
                icon: LayoutDashboard,
                title: "Dashboard Overview",
                description:
                    "A high-level command center that displays active event counts, uncollected client balances, outstanding vendor debt, and overdue task alerts. Four summary cards give you instant financial and operational health at a glance.",
                details: [
                    "Active Events Count — live tally of ongoing and upcoming events",
                    "Uncollected Revenue — remaining client balances across all projects",
                    "Vendor Debt — total accounts payable to service providers",
                    "Urgent Tasks — count of past-due milestones requiring attention",
                ],
            },
            {
                icon: Calendar,
                title: "Recent Events Table",
                description:
                    "A sortable table showing your five most recent events with status badges (Upcoming, Ongoing, Completed), budget figures, client names, and date ranges. Each row has a dropdown for quick actions like viewing details, editing, or deleting.",
                details: [
                    "Status badges with color-coded indicators (blue/amber/emerald)",
                    "Inline currency formatting via formatUSD helper",
                    "Quick-action dropdown (view, edit, delete) per event",
                ],
            },
            {
                icon: BarChart3,
                title: "Global Financial Stats",
                description:
                    "Aggregated financial intelligence across all your events. The finance page computes total revenue, vendor liabilities, cash-on-hand, and estimated net profit with margin percentage.",
                details: [
                    "Total Revenue — sum of all event budgets",
                    "Vendor Liabilities — total contracted vendor costs vs. paid out",
                    "Cash on Hand — collected client payments minus vendor payouts",
                    "Est. Net Profit — budget minus total liability with margin %",
                ],
            },
        ],
    },
    {
        title: "Event Management",
        subtitle: "Full lifecycle management for every event you produce.",
        color: "emerald" as keyof typeof sectionColorMap,
        features: [
            {
                icon: ScrollText,
                title: "Event Blueprint (Create & Edit)",
                description:
                    "A polished form with real-time readiness progress bar. Fields include title, client name, contact email, venue location, budget estimate, start/end dates with time, and a vision description. Validates all inputs with shake animations on error.",
                details: [
                    "Readiness progress bar — tracks form completion percentage live",
                    "Smart validation — required fields, date ordering, non-negative budget",
                    "Shake animation on invalid fields with scroll-to-first-error",
                    "Supports both create and edit modes from the same component",
                ],
            },
            {
                icon: GanttChartSquare,
                title: "Event Details & Intelligence",
                description:
                    "A comprehensive event detail page with real-time stats, financial breakdowns, active milestones, and a full audit trail. Displays event status with a live ping indicator and animated badges.",
                details: [
                    "Stat cards — timeline, location, milestone completion %, vendor count",
                    "Overview cards — total budget, vendor liability, settled amount, reserves",
                    "Capital management — budget utilization bar, over-budget warnings",
                    "Active milestones — timeline of incomplete tasks with due dates",
                    "Audit trail — chronological activity feed (task created/completed, vendor added/paid)",
                ],
            },
            {
                icon: Timer,
                title: "Event Pulse & Countdown",
                description:
                    "A live countdown component showing days, hours, minutes, and seconds remaining until the event starts. Includes client name, location display, and real-time countdown updates.",
                details: [
                    "Real-time countdown timer to event start",
                    "Client and location info displayed prominently",
                    "Animates on mount with a fade-in effect",
                ],
            },
        ],
    },
    {
        title: "Vendor Ecosystem",
        subtitle: "A two-tier vendor system — global directory plus event-specific assignments.",
        color: "violet" as keyof typeof sectionColorMap,
        features: [
            {
                icon: Globe,
                title: "Global Vendor Directory",
                description:
                    "A centralized database of all your service providers. Each vendor has a name, category, website, contact info, and active status. Supports full CRUD with inline search, filtering by category, and bulk archive operations.",
                details: [
                    "Create, update, and soft-delete (archive) vendors",
                    "Bulk archive with confirmation dialog",
                    "Search by name with real-time filtering",
                    "Sort by name (asc/desc), category, or recently added",
                    "Category tagging for organization (catering, venue, photography, etc.)",
                ],
            },
            {
                icon: Link2,
                title: "Event-Vendor Linking",
                description:
                    "Assign global vendors to specific events with cost, deposit, and due date. Automatically creates an initial deposit payment when a deposit amount is set. Prevents duplicate vendor assignments per event.",
                details: [
                    "Link vendors to events with cost, deposit, and due date",
                    "Auto-creates Vendor payment record for deposits",
                    "Prevents duplicate vendor links per event",
                    "Update linked vendor cost and due date",
                    "Bulk unlink vendors from an event",
                ],
            },
            {
                icon: Handshake,
                title: "Event Vendor Dashboard",
                description:
                    "Per-event vendor management page showing all linked vendors with their payment status (Paid, Pending, Overdue), costs, deposits, due dates, and progress bars toward full payment.",
                details: [
                    "Payment status badges with color coding",
                    "Progress bars showing payment completion %",
                    "Cost vs. deposit vs. paid amount breakdown",
                    "Dropdown actions — edit link, view payments, unlink",
                    "Quick-link button to add more vendors to the event",
                ],
            },
        ],
    },
    {
        title: "Financial Operations",
        subtitle: "Complete payment lifecycle from client collection to vendor payout.",
        color: "amber" as keyof typeof sectionColorMap,
        features: [
            {
                icon: DollarSign,
                title: "Payment Processing",
                description:
                    "Record payments of two types — Client (inbound revenue) and Vendor (outbound expenses). Each payment tracks amount, due date, description, and optional vendor association. Supports full CRUD with optimistic updates.",
                details: [
                    "Client payments — track inbound revenue from event clients",
                    "Vendor payments — track outbound payouts to service providers",
                    "Associate payments with specific linked vendors",
                    "Full CRUD with real-time UI updates via React Query",
                    "Modal form with event and vendor selectors",
                ],
            },
            {
                icon: Wallet,
                title: "Budget vs. Actual Tracking",
                description:
                    "Real-time budget utilization tracking with color-coded progress bars and warning states. Shows remaining budget, contracted amounts, paid amounts, and over-budget alerts with animated pulse effects.",
                details: [
                    "Budget utilization bar with emerald/amber/rose color states",
                    "Over-budget detection with pulsing warning indicator",
                    "Remaining budget calculation after vendor contracts",
                    "Payment completion percentage per event",
                ],
            },
            {
                icon: PiggyBank,
                title: "Financial Ledger (Global View)",
                description:
                    "An aggregated finance page showing total revenue, vendor liabilities, cash on hand, and estimated net profit across all events. Includes a complete payment history table with status filters and export capabilities.",
                details: [
                    "Global finance stats across all events",
                    "Payment history table with type, amount, status, and event",
                    "Client/Vendor payment type filtering",
                    "Event-specific financial breakdown pages",
                ],
            },
        ],
    },
    {
        title: "Task Orchestration",
        subtitle: "Plan, track, and complete milestones with priority-based scheduling.",
        color: "blue" as keyof typeof sectionColorMap,
        features: [
            {
                icon: CheckCircle2,
                title: "Milestone Management",
                description:
                    "Create tasks tied to events with title, description, assigned team member, status (Pending, InProgress, Done), due date, and priority (Low, Medium, High, Urgent). Full CRUD with a Kanban-style table and inline status changes.",
                details: [
                    "Four priority levels — Urgent (rose), High (orange), Medium (amber), Low (blue)",
                    "Three statuses — Pending, InProgress, Done",
                    "Task completion auto-creates activity log entries",
                    "Inline status change with optimistic UI updates",
                    "Overdue detection for past-due incomplete tasks",
                ],
            },
            {
                icon: Activity,
                title: "Task Pipeline Dashboard",
                description:
                    "Per-event task management page with summary cards showing total, pending, in-progress, done, urgent, and overdue task counts. Includes a searchable, filterable table with status badge colors.",
                details: [
                    "Summary stat cards — total, pending, in-progress, done, urgent, overdue",
                    "Search tasks by title with real-time filtering",
                    "Status and priority badge colors for visual scanning",
                    "Task creation sheet with complete form",
                    "Bulk operations for task management",
                ],
            },
            {
                icon: Bell,
                title: "Activity & Audit Trail",
                description:
                    "Every significant action is logged as an activity entry — task created, task completed, vendor added, vendor updated, vendor paid. Each entry has a type-specific icon and color, displayed in a scrollable timeline.",
                details: [
                    "Five activity types with distinct colors and icons",
                    "Chronological feed sorted by creation date",
                    "Auto-logged on task/vendor/payment mutations",
                    "Scrollable container for long activity histories",
                ],
            },
        ],
    },
    {
        title: "Platform Features",
        subtitle: "The underlying infrastructure that powers the entire system.",
        color: "rose" as keyof typeof sectionColorMap,
        features: [
            {
                icon: Users,
                title: "Authentication & User Sync",
                description:
                    "Powered by Clerk for authentication with a middleware proxy that protects all routes except public ones. A UserWatcher component auto-syncs Clerk user data to the backend database upon sign-in, creating or updating the user record.",
                details: [
                    "Clerk-powered authentication with modal sign-in/sign-up",
                    "Middleware proxy protecting all routes except /features",
                    "Auto-sync user profile to backend on sign-in",
                    "Onboarding flow redirects to dashboard for existing users",
                ],
            },
            {
                icon: ArrowRightLeft,
                title: "Real-Time Data Flow",
                description:
                    "The entire frontend uses TanStack React Query for server state management with automatic cache invalidation. Mutations optimistically update the UI, and queries refetch on window focus for always-fresh data.",
                details: [
                    "React Query for all API communication with caching",
                    "Optimistic updates on mutations for instant UI feedback",
                    "Automatic refetch on window focus and query invalidation",
                    "Structured query options per entity (events, vendors, payments, tasks)",
                ],
            },
            {
                icon: TrendingUp,
                title: "Analytics & Stats Engine",
                description:
                    "A dedicated stats service on the backend computes dashboard, event-specific, and financial statistics using parallelized Prisma queries within a single transaction for optimal performance.",
                details: [
                    "Dashboard stats — active events, vendor debt, uncollected, urgent tasks",
                    "Event stats — budget utilization, task completion %, vendor payment status",
                    "Finance stats — revenue, liabilities, cash on hand, profit margins",
                    "All stats computed server-side via prisma $transaction for consistency",
                ],
            },
            {
                icon: Truck,
                title: "Data Architecture",
                description:
                    "PostgreSQL database with Prisma ORM. Eight models: User, Event, GlobalVendor, EventVendor (junction), Payment, Task, Activity (audit log). All user data is isolated via userId, and cascading deletes ensure referential integrity.",
                details: [
                    "8 database models with full relational integrity",
                    "User-scoped data isolation on every query",
                    "Cascade deletes — deleting an event removes all related tasks, vendors, payments",
                    "Request context via AsyncLocalStorage for userId propagation",
                    "Prisma adapter for PostgreSQL with connection pooling",
                ],
            },
        ],
    },
];

export default function Features() {
    return (
        <main className="mx-auto max-w-6xl space-y-32 pb-12">
            <section className="flex flex-col items-center text-center">
                <div className="bg-primary/5 pointer-events-none absolute -top-24 left-1/2 size-96 -translate-x-1/2 blur-[150px]" />

                <h1 className="font-poppins text-4xl leading-tight font-extrabold tracking-tight md:text-6xl">
                    The Operating System for <br />
                    <span className="from-primary bg-linear-to-r to-purple-600 bg-clip-text text-transparent">Flawless Events.</span>
                </h1>

                <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-sm leading-relaxed md:text-base">
                    EventSync is a full-stack event management platform for professional organizers. It provides a unified workspace to manage events,
                    track vendors, monitor finances, coordinate tasks, and analyze performance — all from a single, beautifully crafted dashboard.
                </p>

                <div className="mt-8 grid grid-cols-3 gap-8 text-center">
                    <div>
                        <p className="font-poppins from-primary bg-linear-to-r to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent">
                            8
                        </p>
                        <p className="text-muted-foreground text-xs font-bold tracking-wider uppercase">Data Models</p>
                    </div>
                    <div>
                        <p className="font-poppins from-primary bg-linear-to-r to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent">
                            15+
                        </p>
                        <p className="text-muted-foreground text-xs font-bold tracking-wider uppercase">Dashboard Pages</p>
                    </div>
                    <div>
                        <p className="font-poppins from-primary bg-linear-to-r to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent">
                            30+
                        </p>
                        <p className="text-muted-foreground text-xs font-bold tracking-wider uppercase">API Endpoints</p>
                    </div>
                </div>
            </section>

            {featureGroups.map((group, groupIndex) => (
                <section key={groupIndex} className="space-y-12">
                    <div className="space-y-3 text-center">
                        <div className="flex items-center justify-center gap-2">
                            <div className={cn("h-1 w-8 rounded-l-full", sectionColorMap[group.color].bg)} />
                            <span className={cn("text-xs font-bold tracking-[0.3em] uppercase", sectionColorMap[group.color].text)}>
                                {group.title}
                            </span>
                            <div className={cn("h-1 w-8 rounded-r-full", sectionColorMap[group.color].bg)} />
                        </div>
                        <p className="text-muted-foreground text-sm">{group.subtitle}</p>
                    </div>

                    <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                        {group.features.map((feature, featureIndex) => (
                            <FeatureCard
                                key={featureIndex}
                                icon={feature.icon}
                                title={feature.title}
                                description={feature.description}
                                details={feature.details}
                                color={group.color}
                            />
                        ))}
                    </div>
                </section>
            ))}

            <section className="flex flex-col items-center text-center">
                <div className={cn("h-1 w-12 rounded-full", sectionColorMap.primary.bg)} />
                <h2 className="font-poppins mt-4 mb-6 text-2xl font-bold md:text-4xl">
                    Ready to organize your next <span className="text-primary">event like a pro?</span>
                </h2>
                <p className="text-muted-foreground max-w-xl text-sm">
                    EventSync is built for professional event organizers who demand precision, clarity, and control. Every feature is designed to
                    reduce chaos and amplify your productivity.
                </p>
            </section>
        </main>
    );
}

interface FeatureCardProps {
    title: string;
    details: string[];
    icon: LucideIcon;
    description: string;
    color: keyof typeof sectionColorMap;
}

function FeatureCard({ icon: Icon, title, description, details, color }: FeatureCardProps) {
    return (
        <Card
            className={cn(
                "group relative flex flex-col overflow-hidden p-6 transition-all duration-500 hover:-translate-y-1",
                "dark:border-white/5 dark:bg-zinc-900/30 dark:hover:bg-zinc-900/40",
            )}
        >
            <div
                className={cn(
                    sectionColorMap[color].bg,
                    "absolute -top-4 -right-4 size-24 opacity-15 blur-3xl transition-opacity duration-500 group-hover:opacity-25 md:opacity-10",
                )}
            />

            <div className="relative z-10 flex items-center gap-3">
                <div
                    className={cn(
                        sectionColorMap[color].text,
                        sectionColorMap[color].border,
                        "grid size-10 place-items-center rounded-xl border transition-all duration-500 group-hover:scale-110 group-hover:opacity-100 md:opacity-70",
                    )}
                >
                    <Icon className="size-5" />
                </div>
                <h3 className="font-poppins text-foreground text-lg font-bold tracking-wide transition-colors duration-500">{title}</h3>
            </div>

            <p className="text-muted-foreground relative z-10 mb-4 text-sm leading-relaxed">{description}</p>

            <ul className="relative z-10 mt-auto space-y-2">
                {details.map((detail, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs">
                        <CheckCircle2 className="mt-0.5 size-3 shrink-0 text-emerald-500" />
                        <span className="text-muted-foreground leading-relaxed">{detail}</span>
                    </li>
                ))}
            </ul>

            <div
                className={cn(
                    sectionColorMap[color].bg,
                    "absolute right-0 bottom-0 left-0 h-0.5 transition-all duration-500 group-hover:w-full md:w-0",
                )}
            />
        </Card>
    );
}
