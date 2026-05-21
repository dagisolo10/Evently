import type { Event } from "./event";

export interface Task {
    id: string;
    title: string;
    description: string | null;
    assignedTo: string | null;
    status: TaskStatus;
    dueDate: string;
    priority: Priority;
    eventId: string;
    createdAt: string;
}

export interface PopulatedTask extends Task {
    event: Event;
}

export type TaskStatus = "Pending" | "InProgress" | "Done";

export type Priority = "Urgent" | "High" | "Medium" | "Low";
