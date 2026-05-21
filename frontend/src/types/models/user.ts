import type { Event } from "./event";
import type { Payment } from "./payment";
import type { GlobalVendor } from "./global-vendor";

export interface User {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
}

export interface PopulatedUser extends User {
    events: Event[];
    globalVendors: GlobalVendor[];
    payments: Payment[];
}
