"use client";

import { useOrganization } from "@clerk/nextjs";
import { EmptyOrganization } from "./_components/empty-organization";
import { BoardList } from "./_components/board-list";


interface DashboardPageProps {
    searchParams: {
        search?: string;
        favorites?: string
    };
};

const DashboardPage = ({ searchParams }: DashboardPageProps) => {
    const { organization } = useOrganization();
    
    return (
        <div className="flex-1 h-[calc(100%-80px)] p-6 pt-1">
            <hr />
            <br />
            {!organization ? (
                <EmptyOrganization />
            ) : (
                <BoardList 
                    orgId={organization.id}
                    query={searchParams}
                />
            )}
        </div>
    );
};

export default DashboardPage;