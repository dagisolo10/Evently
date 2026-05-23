import { newEventMetadata } from "@/lib/metadata";
import EventForm from "@/components/event/event-form";

export const metadata = newEventMetadata;

export default function NewEventPage() {
    return <EventForm />;
}
