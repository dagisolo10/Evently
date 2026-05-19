import { z } from "zod";

export const createGlobalVendorSchema = z.object({
    name: z.string().min(1, "Name is required"),
    category: z.string().min(1, "Category is required"),
    website: z.string().url("Invalid URL").optional().nullable(),
    contact: z.string().optional().nullable(),
    email: z.string().email("Invalid email").optional().nullable(),
});

export const updateGlobalVendorSchema = z.object({
    name: z.string().min(1, "Name is required"),
    category: z.string().min(1, "Category is required"),
    website: z.string().url("Invalid URL").optional().nullable(),
    contact: z.string().optional().nullable(),
    email: z.string().email("Invalid email").optional().nullable(),
});

export const globalVendorIdParamsSchema = z.object({
    id: z.string().min(1, "Vendor ID is required"),
});

export const bulkArchiveVendorsSchema = z.object({
    ids: z.array(z.string()).min(1, "At least one vendor ID is required"),
});
