import type { PopulatedTask, Task } from "@/types/models/task";
import type { ApiMessage, ApiResult } from "@/lib/api/api-responses";

export type GetTasksResponse = ApiResult<{ tasks: PopulatedTask[] }>;
export type GetActiveTasksResponse = ApiResult<{ tasks: Task[] }>;
export type UpdateTaskResponse = ApiResult<{ task: Task }>;
export type DeleteTaskResponse = ApiResult<ApiMessage>;
export type CompleteTaskResponse = ApiResult<{ task: Task }>;
