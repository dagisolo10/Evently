"use client";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Loader2, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import {
    useDeleteEvent,
    useDeleteTask,
    useDeletePayment,
    useUnlinkEventVendor,
    useArchiveGlobalVendor,
    useBulkArchiveGlobalVendors,
    useBulkUnlinkEventVendors,
} from "@/hooks";

type DeleteType = "event" | "task" | "vendor-unlink" | "global-vendor" | "bulk-global-vendor" | "bulk-vendor-unlink" | "payment";

const DELETE_CONFIG = {
    event: (name: string) => ({
        title: `Delete Event: ${name}?`,
        description: "This is a permanent action. You will lose all recorded payments, task progress, and vendor contracts associated with it.",
        actionText: "Confirm Delete",
        loadingText: "Deleting event...",
        successText: `${name} has been removed.`,
    }),
    task: (name: string) => ({
        title: "Delete Task?",
        description: `This will permanently delete the task "${name}". This action cannot be undone and will remove it from all calendars and reports.`,
        actionText: "Delete Task",
        loadingText: "Deleting task...",
        successText: `Task "${name}" deleted.`,
    }),
    payment: (name: string) => ({
        title: `Void ${name} Payment?`,
        description: `This will permanently void this ${name} transaction. The record will be marked as cancelled and removed from active financial processing.`,
        actionText: "Void Payment",
        loadingText: "Processing void...",
        successText: `${name} payment has been voided successfully.`,
    }),
    "vendor-unlink": (name: string, extra?: string) => ({
        title: `Remove ${name} from ${extra}?`,
        description:
            "This action cannot be undone. All recorded payments and financial data associated with this vendor link will be permanently deleted.",
        actionText: "Confirm Remove",
        loadingText: `Removing ${name}...`,
        successText: `${name} unlinked from event.`,
    }),
    "global-vendor": (name: string) => ({
        title: `Archive ${name}?`,
        description: `${name} will be hidden from your master list and cannot be added to new events. However, all existing event records and payments will remain intact.`,
        actionText: "Archive Vendor",
        loadingText: "Archiving...",
        successText: `${name} has been archived.`,
    }),
    "bulk-global-vendor": (count: string) => ({
        title: `Archive ${count} Global Vendors?`,
        description: `This will move ${count} selected vendors to the archive. They will no longer appear in your directory or be available for new events. Historical data in existing events will not be affected.`,
        actionText: "Archive All Selected",
        loadingText: "Archiving records...",
        successText: `Successfully archived ${count} vendors.`,
    }),
    "bulk-vendor-unlink": (count: string) => ({
        title: "Remove Selected Vendors?",
        description: `This will remove ${count} vendors from this event and delete all their associated payment records. This cannot be undone.`,
        actionText: "Confirm Bulk Remove",
        loadingText: `Removing ${count} vendors...`,
        successText: `Successfully removed ${count} vendors.`,
    }),
};

interface UniversalDeleteProps {
    type: DeleteType;
    id: string | string[];
    name: string;
    eventId?: string;
    extra?: string;
    onComplete?: () => void;
}

export default function UniversalDeleteDialog({ type, id, name, eventId, extra, onComplete }: UniversalDeleteProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const config = DELETE_CONFIG[type](name, extra);

    const deleteEvent = useDeleteEvent();
    const deleteTask = useDeleteTask();
    const deletePayment = useDeletePayment();
    const unlinkEventVendor = useUnlinkEventVendor();
    const archiveGlobalVendor = useArchiveGlobalVendor();
    const bulkArchiveGlobalVendors = useBulkArchiveGlobalVendors();
    const bulkUnlinkEventVendors = useBulkUnlinkEventVendors();

    async function handleConfirm() {
        setLoading(true);

        const actionMap: Record<DeleteType, () => Promise<unknown>> = {
            event: () => deleteEvent.mutateAsync(id as string),
            task: () => deleteTask.mutateAsync({ id: id as string, params: { eventId: eventId! } }),
            payment: () => deletePayment.mutateAsync(id as string),
            "vendor-unlink": () => unlinkEventVendor.mutateAsync({ id: id as string, body: { eventId: eventId! } }),
            "global-vendor": () => archiveGlobalVendor.mutateAsync(id as string),
            "bulk-global-vendor": () => bulkArchiveGlobalVendors.mutateAsync({ ids: id as string[] }),
            "bulk-vendor-unlink": () => bulkUnlinkEventVendors.mutateAsync({ eventVendorIds: id as string[], eventId: eventId! }),
        };

        const selectedAction = actionMap[type];

        toast.promise<unknown>(selectedAction(), {
            loading: config.loadingText,
            success: () => {
                if (type === "event") router.push("/dashboard/events");
                if (type === "global-vendor" || type === "bulk-global-vendor") router.refresh();
                if (onComplete) onComplete();

                return config.successText;
            },
            error: (err) => err.message || "Something went wrong",
            finally: () => setLoading(false),
        });
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()} variant="destructive">
                    <Trash2 className="size-4" />
                    {type === "bulk-vendor-unlink" || type === "bulk-global-vendor"
                        ? `Archive Selected (${Array.isArray(id) ? id.length : 0})`
                        : "Delete"}
                </DropdownMenuItem>
            </AlertDialogTrigger>

            <AlertDialogContent>
                <AlertDialogHeader className="relative">
                    <div className="bg-destructive absolute top-0 -left-6 h-full w-1" />
                    <div className="space-y-1">
                        <AlertDialogTitle className="text-destructive text-xl font-bold tracking-tight">{config.title}</AlertDialogTitle>
                        <AlertDialogDescription className="font-medium text-zinc-600 dark:text-zinc-400">{config.description}</AlertDialogDescription>
                    </div>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={(e: React.MouseEvent) => {
                            e.preventDefault();
                            handleConfirm();
                        }}
                        disabled={loading}
                        variant="destructive"
                    >
                        {loading && <Loader2 className="size-4 animate-spin" />}
                        {config.actionText}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
