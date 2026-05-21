"use client";

import EventForm from "@/components/event/event-form";
import { PageSkeleton } from "@/components/page-skeletons";
import { eventDetailQueryOptions } from "@/lib/query-options";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export default function EditEvent() {
    const { id } = useParams<{ id: string }>();

    const { data: event, isPending } = useQuery(eventDetailQueryOptions.detail({ id }));

    if (isPending) {
        return <PageSkeleton tag="event-edit" />;
    }

    if (!event) {
        return (
            <main className="flex items-center justify-center py-24">
                <div className="text-muted-foreground text-sm">Event not found</div>
            </main>
        );
    }

    return <EventForm event={event} />;
}
