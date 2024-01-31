import Link from "next/link";
import Image from "next/image";
import { Overlay } from "./overlay";
import {formatDistanceToNow} from "date-fns";
import { useAuth } from "@clerk/nextjs";
import { Footer } from "./footer";
import { Skeleton } from "@/components/ui/skeleton";
import { Action } from "@/components/actions";
import { MoreHorizontal } from "lucide-react";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";


interface BoardCardProps {
    id: string;
    title: string;
    authorName: string;
    authorId: string;
    createdAt: number;
    imageUrl: string;
    orgId: string;
    isFavorite: boolean;
};

export const BoardCard = ({ id, title, authorId, authorName, createdAt, imageUrl, orgId, isFavorite }: BoardCardProps) => {
    const { userId } = useAuth();
    
    const authorLabel = userId === authorId ? "You" : authorName;
    const createdAtLabel = formatDistanceToNow(createdAt, {
        addSuffix: true,
    });

    const { 
        mutate: onFavorite,
        pending: pandingFavorite
    } = useApiMutation(api.board.favorite)

    const {
        mutate: onUnfavorite,
        pending: pendingUnfavorite,
    } = useApiMutation(api.board.unfavorite)

    const toggleFavorite = () => {
        if  (isFavorite) {
            onUnfavorite({ id })
            .catch(() => toast.error("Failed to Unfavorite"))
        } else {
            onFavorite({ id, orgId })
            .catch(() => toast.error("Failed to Favorite"))
        }
    };

    return (
        <Link href={`/board/${id}`}>
            <div className="group aspect-[100/127] border rounded-lg flex flex-col justify-between overflow-hidden">
                <div className="relative flex-1 bg-purple-200">
                    <Image
                        src={imageUrl}
                        alt={title}
                        fill
                        className="object-fit"
                    />
                    <Overlay />
                    <Action 
                        id={id}
                        title={title}
                        side="right"
                    >
                        <button className=" absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity px-3 py-2 outline-none">
                            <MoreHorizontal className="text-white opacity-75 hover:opacity-100 transition-opacity" />
                        </button>
                    </Action>               
                </div>
                <Footer 
                    isFavorite={isFavorite}
                    title={title}
                    authorLabel={authorLabel}
                    createdAtLabel={createdAtLabel}
                    onClick={toggleFavorite}
                    disabled={pandingFavorite || pendingUnfavorite}
                />
            </div>
        </Link>
    );
};

BoardCard.Skeleton = function BoardCardSkeleton() {
    return (
        <div className="group aspect-[100/127] rounded-lg flex flex-col justify-between overflow-hidden">
            <Skeleton className="w-full h-full" />
        </div>
    );
};