export interface CreateGlobalVendorPayload {
    name: string;
    category: string;
    website?: string | null;
    contact?: string | null;
    email?: string | null;
}

export interface UpdateGlobalVendorPayload {
    name: string;
    category: string;
    website?: string | null;
    contact?: string | null;
    email?: string | null;
}

export interface BulkArchiveGlobalVendorsPayload {
    ids: string[];
}
