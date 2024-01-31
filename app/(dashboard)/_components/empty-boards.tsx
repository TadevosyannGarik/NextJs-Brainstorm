"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { useOrganization } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";


export const EmptyBoards = () => {
    const router = useRouter();
    const { organization } = useOrganization();
    const { mutate, pending } = useApiMutation(api.board.create);
    
    const onClick = () => {
        if (!organization) return;

        mutate({
            title: "Untitled",
            orgId: organization.id,
        })
        .then((id) => {
            toast.success("Board Created");
            router.push(`/board/${id}`)
        })
        .catch(() => toast.error("Failed to Create Board"));
    };

    return (
        <div className="h-full flex flex-col items-center justify-center">
            <Image
                src="/note.svg"
                height={110}
                width={110}
                alt="Empty"
            />
            <h2 className="text-2xl font-semibold mt-6">
                Create Your First Board
            </h2>
            <p className="text-muted-foreground textg-sm mt-2">
                Start by creating a board for your organization
            </p>
            <div className="mt-6">
                <Button onClick={onClick} disabled={pending}>
                    Create Board
                </Button>
            </div>
        </div>
    );
};