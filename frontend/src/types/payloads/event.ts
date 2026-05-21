export interface CreateEventPayload {
    title: string;
    description?: string | null;
    clientName: string;
    clientEmail?: string | null;
    startDate: string;
    endDate: string;
    budget: number;
    location: string;
}

export interface UpdateEventPayload {
    title: string;
    description?: string | null;
    clientName: string;
    clientEmail?: string | null;
    startDate: string;
    endDate: string;
    budget: number;
    location: string;
}
