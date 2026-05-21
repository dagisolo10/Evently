export interface LinkVendorToEventPayload {
    cost: number;
    deposit: number;
    dueDate: string;
    eventId: string;
    globalVendorId: string;
}

export interface UpdateEventVendorPayload {
    eventId: string;
    cost: number;
    dueDate: string;
}

export interface BulkUnlinkVendorsPayload {
    eventVendorIds: string[];
    eventId: string;
}

export interface UnlinkVendorPayload {
    eventId: string;
}
