import { z } from "zod";

export const updateUserValidation = z.object({
    name: z.string().min(3, "Minimum length of 3 characters").optional(),
});
