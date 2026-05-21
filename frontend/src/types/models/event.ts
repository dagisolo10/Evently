import type { Payment } from "./payment";
import type { EventVendor } from "./event-vendor";
import type { GlobalVendor } from "./global-vendor";

export interface Event {
    id: string;
    title: string;
    description: string | null;
    clientName: string;
    clientEmail: string | null;
    startDate: string;
    endDate: string;
    budget: number;
    location: string;
    createdAt: string;
    updatedAt: string;
    userId: string;
}

export interface PopulatedEvent extends Event {
    payments: (Payment & { vendor: EventVendor & { globalVendor: GlobalVendor } })[];
}
