import type { Priority, TaskStatus } from "@/types/models/task";

export interface UpdateTaskPayload {
    title: string;
    description?: string | null;
    assignedTo?: string | null;
    status: TaskStatus;
    dueDate: string;
    priority: Priority;
    eventId: string;
}

export interface CreateTaskPayload {
    eventId: string;
    title: string;
    description?: string | null;
    assignedTo?: string | null;
    status: TaskStatus;
    dueDate: string;
    priority: Priority;
}
export interface CompleteTaskPayload {
    eventId: string;
}

export interface DeleteTaskQuery {
    eventId: string;
}
