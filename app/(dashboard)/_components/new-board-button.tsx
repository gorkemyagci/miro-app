"use client";

import { api } from "@/convex/_generated/api";
import { useApiMutation } from "@/hooks/use-mutation-api";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { toast } from "sonner";

interface NewBoardButtonProps {
  orgId: string;
  disabled?: boolean;
}

export const NewBoardButton = ({ orgId, disabled }: NewBoardButtonProps) => {
  const { mutate, loading } = useApiMutation(api.board.create);
  return (
    <button
      disabled={disabled}
      onClick={() => {
        mutate({
          orgId,
          title: "Untitled Board",
        }).then((id) => {
          toast.success("Board created");
        });
      }}
      className={cn(
        "col-span-1 aspect-[100/127] bg-blue-600 rounded-lg hover:bg-blue-800 flex flex-col items-center justify-center py-6",
        (disabled || loading) &&
          "opacity-75 hover:bg-blue-600 cursor-not-allowed"
      )}
    >
      <div />
      <Plus className="text-white h-12 w-12 stroke-1" />
      <p className="text-xs text-white font-light">New Board</p>
    </button>
  );
};
