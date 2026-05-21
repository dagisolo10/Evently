import type { Activity } from "@/types/models/activity";
import type { ApiResult } from "@/lib/api/api-responses";
import type { Event, PopulatedEvent } from "@/types/models/event";
import type { EventFinanceStats, EventStats } from "@/types/models/stats";

export type GetEventsResponse = ApiResult<Event[]>;
export type GetEventResponse = ApiResult<{ event: Event }>;
export type CreateEventResponse = ApiResult<{ event: Event }>;
export type UpdateEventResponse = ApiResult<{ event: Event }>;
export type DeleteEventResponse = ApiResult<{ message: string }>;
export type GetEventActivitiesResponse = ApiResult<{ activity: Activity[] }>;
export type GetPopulatedEventResponse = ApiResult<{ event: PopulatedEvent | null }>;
export type GetEventStatsResponse = ApiResult<EventStats>;
export type GetEventFinanceStatsResponse = ApiResult<EventFinanceStats>;

