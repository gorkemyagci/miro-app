"use client";
import { useSelf, useOthers } from "@liveblocks/react/suspense";
import { UserAvatar } from "./user-avatar";
import { connectionIdToColor } from "@/lib/utils";

const max_shown = 2;

export default function Participants() {
  const users = useOthers();
  const currentUser = useSelf();
  const hasMoreUsers = users.length > max_shown;
  return (
    <div className="absolute h-12 top-2 right-2 bg-white rounded-md p-3 flex items-center shadow-md">
      <div className="flex items-center gap-2">
        {users.slice(0, max_shown).map(({ connectionId, info }) => {
          return (
            <UserAvatar
              borderColor={connectionIdToColor(connectionId)}
              key={connectionId}
              src={info?.picture}
              name={info?.name}
              fallback={info?.name?.[0] || "A"}
            />
          );
        })}
        {currentUser && (
          <UserAvatar
            borderColor={connectionIdToColor(currentUser.connectionId)}
            src={currentUser.info?.picture}
            name={currentUser.info?.name}
            fallback={currentUser.info?.name?.[0] || "(You)"}
          />
        )}
        {hasMoreUsers && (
          <UserAvatar
            name={`${users.length - max_shown} more`}
            fallback={`+${users.length - max_shown}`}
          />
        )}
      </div>
    </div>
  );
}

Participants.Skeleton = function ParticipantsSkeleton() {
  return (
    <div className="absolute h-12 top-2 right-2 w-[100px] bg-white rounded-md p-3 flex items-center shadow-md" />
  );
};
