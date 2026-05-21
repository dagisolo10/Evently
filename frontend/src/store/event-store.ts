import type { Event } from "@/types/models/event";
import { create } from "zustand";

interface EventStore {
    events: Event[];
    loading: boolean;
    setEvents: (events: Event[]) => void;
}

const eventStore = create<EventStore>((set) => ({
    events: [],
    loading: false,

    setEvents: (events: Event[]) => set({ events }),
}));

export default eventStore;
