export interface Activity {
    id: string;
    eventId: string;
    type: ActivityType;
    message: string;
    createdAt: string;
}

export type ActivityType = "TaskCreated" | "TaskCompleted" | "VendorAdded" | "VendorUpdated" | "VendorPaid";





