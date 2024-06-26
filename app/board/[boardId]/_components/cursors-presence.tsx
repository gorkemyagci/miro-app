"use client";

import { memo } from "react";
import { shallow, useOthersConnectionIds } from "@liveblocks/react/suspense";
import { Cursor } from "./cursor";
import { useOthersMapped } from "@liveblocks/react";
import { Path } from "./path";
import { colorToCss } from "@/lib/utils";

const Cursors = () => {
  const ids = useOthersConnectionIds();
  return (
    <>
      {ids.map((connectionId) => (
        <Cursor key={connectionId} connectionId={connectionId} />
      ))}
    </>
  );
};

const Drafts = () => {
  const others = useOthersMapped(
    (other) => ({
      pencilDraft: other.presence.pencilDraft,
      penColor: other.presence.penColor,
    }),
    shallow
  );
  return (
    <>
      {others.map(([key, other]) => {
        if (other.pencilDraft) {
          return (
            <Path
              key={key}
              points={other.pencilDraft}
              x={0}
              y={0}
              fill={other.penColor ? colorToCss(other.penColor) : "#000"}
            />
          );
        }
        return null;
      })}
    </>
  );
};

export const CursorsPresence = memo(() => {
  return (
    <>
      <Drafts />
      <Cursors />
    </>
  );
});

CursorsPresence.displayName = "CursorsPresence";
