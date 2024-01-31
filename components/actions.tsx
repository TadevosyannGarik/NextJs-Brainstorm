"use client";

import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Link2, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import { ConfirmModal } from "@/components/confirm-modal";
import { Button } from "@/components/ui/button";
import { useRenameModal } from "@/store/use-rename-modal";


interface ActionProps {
    children: React.ReactNode;
    side?: DropdownMenuContentProps["side"];
    sideOffset?: DropdownMenuContentProps["sideOffset"];
    id: string;
    title: string;
}

export const Action = ({ children, side, sideOffset, id, title }: ActionProps) => {
    const { mutate, pending } = useApiMutation(api.board.remove);
    const { onOpen } = useRenameModal();

    const onCopyLink = () => {
        navigator.clipboard.writeText(`${window.location.origin}/board/${id}`)
        .then(() => toast.success("Link Copied"))
        .catch(() => toast.error("Failed to Copy Link"))
    };

    const onDelete = () => {
        mutate({ id })
        .then(() => toast.success("Board Deleted"))
        .catch(() => toast.error("Failed to Delete Board"))
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {children}
            </DropdownMenuTrigger>
            <DropdownMenuContent
                onClick={(e) => e.stopPropagation()}
                side={side}
                sideOffset={sideOffset}
                className="w-60"
            >
                <DropdownMenuItem className="p-3 cursor-pointer" onClick={onCopyLink}>
                    <Link2 className="h-4 w-4 mr-2" />
                    Copy Board Link
                </DropdownMenuItem>
                <DropdownMenuItem className="p-3 cursor-pointer" onClick={() => onOpen(id, title)}>
                    <Pencil className="h-4 w-4 mr-2" />
                    Raname Board
                </DropdownMenuItem>
                <ConfirmModal
                    header="Delete Board ?"
                    description="This will delete the board and all of its contents"
                    disabled={pending}
                    onConfirm={onDelete}
                >
                    <Button 
                        className="p-3 cursor-pointer text-red-600 text-sm w-full justify-start font-normal" 
                        variant="ghost"
                    >
                        <Trash2 className="h-4 w-4 mr-2" />
                            Delete Board
                    </Button>
                </ConfirmModal>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};