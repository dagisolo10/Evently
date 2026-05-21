import type { PopulatedEventVendor } from "@/types/models/event-vendor";
import { create } from "zustand";

interface EventVendorStore {
    eventVendors: PopulatedEventVendor[];
    loading: boolean;
}

const eventVendorStore = create<EventVendorStore>(() => ({
    eventVendors: [],
    loading: false,
}));

export default eventVendorStore;
