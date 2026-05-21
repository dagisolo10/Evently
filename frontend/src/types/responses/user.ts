import type { ApiResult } from "@/lib/api/api-responses";
import type { PopulatedUser } from "@/types/models/user";

export type GetUserResponse = ApiResult<PopulatedUser>;
