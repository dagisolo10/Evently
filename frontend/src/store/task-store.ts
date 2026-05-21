import type { PopulatedTask, Task } from "@/types/models/task";
import { create } from "zustand";

interface TaskStore {
    tasks: PopulatedTask[];
    activeTasks: Task[];
    loading: boolean;
}

const taskStore = create<TaskStore>(() => ({
    tasks: [],
    activeTasks: [],
    loading: false,
}));

export default taskStore;
