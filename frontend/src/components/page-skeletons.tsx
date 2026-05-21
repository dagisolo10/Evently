import { Skeleton } from "@/components/ui/skeleton";

type PageTag =
    | "dashboard"
    | "events"
    | "event-new"
    | "event-details"
    | "event-edit"
    | "event-payments"
    | "event-tasks"
    | "event-vendors"
    | "vendor-directory"
    | "finance"
    | "budget"
    | "tasks"
    | "billing"
    | "profile";

const skeletons: Record<PageTag, () => React.ReactNode> = {
    dashboard: DashboardSkeleton,
    events: EventsSkeleton,
    "event-new": EventFormSkeleton,
    "event-details": EventDetailsSkeleton,
    "event-edit": EventFormSkeleton,
    "event-payments": EventPaymentsSkeleton,
    "event-tasks": EventTasksSkeleton,
    "event-vendors": EventVendorsSkeleton,
    "vendor-directory": VendorDirectorySkeleton,
    finance: FinanceSkeleton,
    budget: BudgetSkeleton,
    tasks: SimpleSkeleton,
    billing: SimpleSkeleton,
    profile: SimpleSkeleton,
};

export function PageSkeleton({ tag }: { tag: PageTag }) {
    const Component = skeletons[tag];
    return <Component />;
}

export function NavbarSkeleton() {
    return (
        <header className="sticky top-0 z-50">
            <nav className="flex h-14 items-center justify-between gap-6 px-4 backdrop-blur-3xl">
                <div className="flex items-center gap-2.5">
                    <div className="bg-muted size-9 animate-pulse rounded-full" />
                    <div className="bg-muted h-8 w-24 animate-pulse rounded" />
                </div>

                <div className="hidden flex-1 items-center justify-center gap-8 md:flex">
                    <div className="bg-muted h-8 w-16 animate-pulse rounded" />
                    <div className="bg-muted h-8 w-16 animate-pulse rounded" />
                    <div className="bg-muted h-8 w-16 animate-pulse rounded" />
                    <div className="bg-muted h-8 w-16 animate-pulse rounded" />
                    <div className="bg-muted h-8 w-16 animate-pulse rounded" />
                </div>

                <div className="hidden items-center gap-2 md:flex">
                    <div className="bg-muted h-8 w-20 animate-pulse rounded" />
                    <div className="bg-muted h-8 w-24 animate-pulse rounded" />
                </div>
            </nav>
        </header>
    );
}

function DashboardSkeleton() {
    return (
        <div className="space-y-10 pb-12">
            <header className="space-y-2">
                <Skeleton className="h-10 w-96" />
                <Skeleton className="h-4 w-64" />
            </header>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="rounded-xl border p-5">
                        <div className="flex items-center gap-3">
                            <Skeleton className="size-10 rounded-xl" />
                            <Skeleton className="h-3 w-24" />
                        </div>
                        <div className="mt-4 space-y-2">
                            <Skeleton className="h-8 w-20" />
                            <Skeleton className="h-3 w-36" />
                        </div>
                    </div>
                ))}
            </div>
            <section className="space-y-6">
                <div className="flex items-center justify-between">
                    <Skeleton className="h-7 w-36" />
                    <Skeleton className="h-9 w-24 rounded-md" />
                </div>
                <div className="rounded-xl border">
                    <div className="bg-muted/50 border-b p-4">
                        <div className="flex gap-4">
                            {Array.from({ length: 6 }).map((_, i) => (
                                <Skeleton key={i} className="h-4 flex-1" />
                            ))}
                        </div>
                    </div>
                    {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="flex gap-4 border-b p-4 last:border-0">
                            {Array.from({ length: 6 }).map((_, j) => (
                                <Skeleton key={j} className="h-4 flex-1" />
                            ))}
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

function EventsSkeleton() {
    return (
        <div className="flex flex-col gap-10 pb-12">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                <div className="space-y-2">
                    <Skeleton className="h-3 w-20" />
                    <Skeleton className="h-10 w-64" />
                    <Skeleton className="h-4 w-96" />
                </div>
                <Skeleton className="h-10 w-44 rounded-md" />
            </div>
            <div className="rounded-xl border">
                <Skeleton className="h-96 w-full" />
            </div>
        </div>
    );
}

function EventDetailsSkeleton() {
    return (
        <div className="space-y-10 pb-16">
            <header className="flex flex-col justify-between gap-8 border-b pb-10 md:flex-row md:items-end">
                <div className="space-y-6">
                    <div className="flex items-center gap-2">
                        <Skeleton className="h-5 w-32 rounded-full" />
                        <Skeleton className="h-4 w-4" />
                        <Skeleton className="h-4 w-24" />
                    </div>
                    <div className="space-y-2">
                        <Skeleton className="h-12 w-96 md:h-16 lg:h-20" />
                        <div className="flex gap-2">
                            <Skeleton className="h-6 w-24 rounded-md" />
                            <Skeleton className="h-6 w-32 rounded-md" />
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Skeleton className="h-10 w-28 rounded-xl" />
                    <Skeleton className="h-10 w-28 rounded-xl" />
                    <Skeleton className="size-10 rounded-xl" />
                </div>
            </header>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="rounded-xl border p-5">
                        <div className="flex items-center gap-3">
                            <Skeleton className="size-10 rounded-xl" />
                            <div className="space-y-1.5">
                                <Skeleton className="h-3 w-16" />
                                <Skeleton className="h-5 w-32" />
                                <Skeleton className="h-3 w-24" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="rounded-xl border p-4">
                        <div className="flex items-center gap-3">
                            <Skeleton className="size-5 rounded" />
                            <div className="space-y-1">
                                <Skeleton className="h-3 w-20" />
                                <Skeleton className="h-6 w-24" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
                <div className="space-y-12 lg:col-span-7">
                    <Skeleton className="h-32 rounded-2xl" />
                    <section className="space-y-6">
                        <div className="flex items-center gap-3">
                            <Skeleton className="size-10 rounded-xl" />
                            <Skeleton className="h-7 w-32" />
                        </div>
                        <Skeleton className="h-28 rounded-4xl" />
                    </section>
                    <section className="space-y-6">
                        <div className="flex items-center justify-between">
                            <Skeleton className="h-7 w-40" />
                            <Skeleton className="h-3 w-32" />
                        </div>
                        <div className="space-y-4">
                            {Array.from({ length: 3 }).map((_, i) => (
                                <div key={i} className="flex gap-4 rounded-xl border p-4">
                                    <Skeleton className="size-3 rounded-full" />
                                    <div className="flex-1 space-y-2">
                                        <Skeleton className="h-4 w-48" />
                                        <Skeleton className="h-3 w-24" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                    <section className="space-y-6">
                        <div className="flex items-center gap-3">
                            <Skeleton className="size-10 rounded-xl" />
                            <Skeleton className="h-7 w-24" />
                        </div>
                        <div className="space-y-4">
                            {Array.from({ length: 4 }).map((_, i) => (
                                <div key={i} className="flex gap-4">
                                    <Skeleton className="w-px self-stretch" />
                                    <div className="flex-1 space-y-1">
                                        <Skeleton className="h-4 w-40" />
                                        <Skeleton className="h-3 w-64" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
                <div className="space-y-8 lg:col-span-5">
                    <Skeleton className="h-64 rounded-2xl" />
                    <Skeleton className="h-40 rounded-2xl" />
                    <Skeleton className="h-48 rounded-2xl" />
                    <Skeleton className="h-32 rounded-2xl" />
                </div>
            </div>
        </div>
    );
}

function EventFormSkeleton() {
    return (
        <div className="space-y-8 pb-12">
            <Skeleton className="h-10 w-48" />
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="space-y-2">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-10 w-full rounded-md" />
                    </div>
                ))}
            </div>
            <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-24 w-full rounded-md" />
            </div>
            <div className="flex gap-4">
                <Skeleton className="h-10 w-24 rounded-md" />
                <Skeleton className="h-10 w-32 rounded-md" />
            </div>
        </div>
    );
}

function EventPaymentsSkeleton() {
    return (
        <div className="space-y-8 pb-12">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <Skeleton className="h-1 w-6 rounded-full" />
                        <Skeleton className="h-3 w-28" />
                    </div>
                    <Skeleton className="h-9 w-64" />
                    <Skeleton className="h-4 w-80" />
                </div>
                <Skeleton className="h-10 w-32 rounded-md" />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="rounded-xl border p-4">
                        <Skeleton className="h-3 w-24" />
                        <Skeleton className="mt-2 h-7 w-28" />
                        <Skeleton className="mt-1 h-3 w-32" />
                    </div>
                ))}
            </div>
            <Skeleton className="h-64 w-full rounded-xl" />
        </div>
    );
}

function EventTasksSkeleton() {
    return (
        <div className="space-y-8 pb-10">
            <header className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
                <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                        <Skeleton className="h-5 w-1" />
                        <Skeleton className="h-3 w-48" />
                    </div>
                    <Skeleton className="h-10 w-72" />
                    <Skeleton className="h-3 w-56" />
                </div>
                <div className="flex items-center gap-4">
                    <div className="hidden flex-col items-end border-r pr-4 lg:flex">
                        <Skeleton className="h-3 w-24" />
                        <Skeleton className="mt-1 h-6 w-16" />
                    </div>
                    <Skeleton className="h-10 w-36 rounded-md" />
                </div>
            </header>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-5">
                {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="rounded-xl border p-5">
                        <div className="flex items-center gap-3">
                            <Skeleton className="size-10 rounded-xl" />
                            <Skeleton className="h-3 w-20" />
                        </div>
                        <Skeleton className="mt-4 h-8 w-12" />
                    </div>
                ))}
            </div>
            <Skeleton className="h-96 w-full rounded-xl" />
        </div>
    );
}

function EventVendorsSkeleton() {
    return (
        <div className="w-full space-y-6">
            <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <Skeleton className="h-1 w-8 rounded-full" />
                        <Skeleton className="h-3 w-28" />
                    </div>
                    <Skeleton className="h-10 w-80" />
                    <Skeleton className="h-4 w-64" />
                </div>
                <Skeleton className="h-10 w-40 rounded-md" />
            </header>
            <Skeleton className="h-96 w-full rounded-xl" />
        </div>
    );
}

function VendorDirectorySkeleton() {
    return (
        <div className="w-full space-y-6">
            <header className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <Skeleton className="h-6 w-1 rounded-full" />
                        <Skeleton className="h-3 w-32" />
                    </div>
                    <Skeleton className="h-10 w-72" />
                    <Skeleton className="h-4 w-96" />
                </div>
                <div className="flex items-center gap-3">
                    <div className="hidden flex-col items-end px-4 lg:flex">
                        <Skeleton className="h-3 w-24" />
                        <Skeleton className="mt-1 h-6 w-12" />
                    </div>
                    <Skeleton className="h-10 w-40 rounded-md" />
                </div>
            </header>
            <Skeleton className="h-96 w-full rounded-xl" />
        </div>
    );
}

function FinanceSkeleton() {
    return (
        <div className="space-y-8 pb-12">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                <div className="space-y-1">
                    <Skeleton className="h-9 w-64" />
                    <Skeleton className="h-4 w-72" />
                </div>
                <div className="flex gap-3">
                    <Skeleton className="h-10 w-32 rounded-md" />
                    <Skeleton className="h-10 w-40 rounded-md" />
                </div>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="rounded-xl border p-4">
                        <Skeleton className="h-3 w-28" />
                        <Skeleton className="mt-2 h-7 w-24" />
                        <Skeleton className="mt-1 h-3 w-32" />
                    </div>
                ))}
            </div>
            <Skeleton className="h-64 w-full rounded-xl" />
        </div>
    );
}

function BudgetSkeleton() {
    return (
        <div className="space-y-8 p-4">
            <div className="space-y-2">
                <Skeleton className="h-9 w-48" />
                <Skeleton className="h-4 w-72" />
            </div>
            <div className="grid gap-4 md:grid-cols-3">
                {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="rounded-xl border p-6">
                        <div className="flex items-center justify-between">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="size-5 rounded" />
                        </div>
                        <Skeleton className="mt-4 h-8 w-32" />
                        {i === 1 && <Skeleton className="mt-4 h-2 w-full rounded-full" />}
                        {i === 2 && <Skeleton className="mt-2 h-3 w-28" />}
                    </div>
                ))}
            </div>
            <div className="rounded-xl border p-6">
                <Skeleton className="h-5 w-36" />
                <div className="mt-8 space-y-8">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="space-y-3">
                            <div className="flex items-center justify-between">
                                <Skeleton className="h-4 w-32" />
                                <Skeleton className="h-4 w-24" />
                            </div>
                            <Skeleton className="h-2 w-full rounded-full" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function SimpleSkeleton() {
    return (
        <div className="flex items-center justify-center py-24">
            <Skeleton className="h-6 w-32" />
        </div>
    );
}
