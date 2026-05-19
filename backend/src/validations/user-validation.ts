import z from "zod";

export const createUserValidation = z.object({
    name: z.string().min(3, "Minimum length of 3 characters"),
    email: z.email(),
    company: z.string().optional(),
});
