"use client";

import { Badge } from "@/components/ui/badge";

interface StatusBadgeCellProps {
  isDeleted?: boolean;
  activeText?: string;
  deletedText?: string;
}

export function StatusBadgeCell({
  isDeleted,
  activeText = "Verified",
  deletedText = "UnVerified",
}: StatusBadgeCellProps) {
  return (
    <Badge variant={isDeleted ? "destructive" : "secondary"}>
      {isDeleted ? deletedText : activeText}
    </Badge>
  );
}
