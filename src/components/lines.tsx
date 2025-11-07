import React from "react";
import { cn } from "../../lib/utils";

const VerticleLine = () => {
  return (
    <div
      className={cn(
        "absolute inset-x-0 bottom-0 h-px w-full opacity-20",
        "bg-linear-to-r from-transparent via-neutral-500/50 to-transparent",
      )}
    />
  );
};

const LeftLine = () => {
  return (
    <div
      className={cn(
        "absolute inset-y-0 left-0 h-full w-px opacity-20",
        "bg-neutral-500/50",
      )}
    />
  );
};

const RightLine = () => {
  return (
    <div
      className={cn(
        "absolute inset-y-0 right-0 h-full w-px opacity-20",
        "bg-neutral-500/50",
      )}
    />
  );
};

export { VerticleLine, LeftLine, RightLine };
