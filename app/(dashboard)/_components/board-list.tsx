"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useOrganization } from "@clerk/nextjs";
import { useApiMutation } from "@/hooks/use-mutation-api";
import { toast } from "sonner";

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
  const data = [];
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
  return <div>{JSON.stringify(query)}</div>;
}
