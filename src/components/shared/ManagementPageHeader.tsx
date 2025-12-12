"use client";
import { LucideIcon, Plus } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";

interface ManagementPageHeaderProps {
  title: string;
  description?: string;
  action?: {
    icon?: LucideIcon;
    label: string;
    onClick: () => void;
  };
  secondaryAction?: React.ReactNode;
  children?: React.ReactNode;
}

const ManagementPageHeader = ({
  title,
  description,
  action,
  secondaryAction,
  children,
}: ManagementPageHeaderProps) => {
  const Icon = action?.icon || Plus;
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold">{title}</h1>
        {description && (
          <p className="text-muted-foreground mt-1">{description}</p>
        )}
      </div>
      <div className="flex items-center gap-2">
        {secondaryAction}
        {action && (
          <Button onClick={action.onClick} className=" bg-gradient-to-b from-blue-600 to-blue-800">
            <Icon className="mr-2 h-4 w-4" />
            {action.label}
          </Button>
        )}
        {children}
      </div>
    </div>
  );
};

export default ManagementPageHeader;
