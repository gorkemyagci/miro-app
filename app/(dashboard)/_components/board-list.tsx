"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useOrganization } from "@clerk/nextjs";
import { useApiMutation } from "@/hooks/use-mutation-api";
import { toast } from "sonner";
import BoardCard from "./board-card";
import { NewBoardButton } from "./new-board-button";

interface BoardListProps {
  orgId: string;
  query: {
    search?: string;
    favorites?: string;
  };
}

export default function BoardList({ orgId, query }: BoardListProps) {
  const { organization } = useOrganization();
  const { mutate, loading } = useApiMutation(api.board.create);
  const createBoard = () => {
    if (!organization) return;
    mutate({
      orgId: organization.id,
      title: "Untitled Board",
    })
      .then((id) => {
        toast.success("Board created successfully");
      })
      .catch((err) => {
        toast.error("Failed to create board");
      });
  };
  const data = useQuery(api.boards.get, { orgId });
  if (data === undefined)
    return (
      <div>
        <h2 className="text-3xl">
          {query.favorites ? "Favorite boards" : "Team boards"}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">
          <NewBoardButton orgId={orgId} disabled />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
        </div>
      </div>
    );
  if (!data?.length && query.search) {
    return (
      <div className="w-full h-full flex items-center justify-center flex-col gap-5">
        <Image
          src={require("../../../public/empty.png")}
          alt="Empty"
          width={300}
          height={300}
        />
        <div className="flex flex-col items-center gap-2">
          <h3 className="font-medium text-black text-2xl">No results found!</h3>
          <p className="text-muted-foreground text-base">
            Try searching for something else
          </p>
        </div>
      </div>
    );
  }
  if (!data?.length && query.favorites) {
    return (
      <div className="w-full h-full flex items-center justify-center flex-col gap-5">
        <Image
          src={require("../../../public/empty-fav.png")}
          alt="Empty Favorites"
          width={300}
          height={300}
        />
        <div className="flex flex-col items-center gap-2">
          <h3 className="font-medium text-black text-2xl">
            No favorites found!
          </h3>
          <p className="text-muted-foreground text-base">
            Add some boards to favorites
          </p>
        </div>
      </div>
    );
  }
  if (!data?.length) {
    return (
      <div className="w-full h-full flex items-center justify-center flex-col gap-5">
        <Image
          src={require("../../../public/empty-board.png")}
          alt="Empty Favorites"
          width={300}
          height={300}
        />
        <div className="flex flex-col items-center gap-2">
          <h3 className="font-medium text-black text-2xl">
            Create your first board!
          </h3>
          <p className="text-muted-foreground text-base">
            Start by creating board for your organization
          </p>
          <div className="mt-3">
            <Button disabled={loading} onClick={createBoard} size="default">
              Create Board
            </Button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <h2 className="text-3xl">
        {query.favorites ? "Favorite boards" : "Team boards"}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">
        <NewBoardButton orgId={orgId} />
        {data?.map((board) => (
          <BoardCard
            key={board._id}
            id={board._id}
            title={board.title}
            authorId={board.authorId}
            authorName={board.authorName}
            createdAt={board._creationTime}
            orgId={board.orgId}
            isFavorite={false}
            imageUrl={board.imageUrl}
          />
        ))}
      </div>
    </div>
  );
}
