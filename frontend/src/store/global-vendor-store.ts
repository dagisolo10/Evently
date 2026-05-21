import type { GlobalVendor } from "@/types/models/global-vendor";
import { create } from "zustand";

interface GlobalVendorStore {
    globalVendors: GlobalVendor[];
    loading: boolean;
}

const globalVendorStore = create<GlobalVendorStore>(() => ({
    globalVendors: [],
    loading: false,
}));

export default globalVendorStore;
