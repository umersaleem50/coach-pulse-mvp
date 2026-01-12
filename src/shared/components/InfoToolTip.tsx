import { Info } from "lucide-react";
import React from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export interface InfoToolTipProps {
  children?: React.ReactNode;
  content: React.ReactNode;
}

function InfoToolTip({
  children = <Info size={16} />,
  content,
}: InfoToolTipProps) {
  return (
    <Tooltip>
      <TooltipTrigger>{children}</TooltipTrigger>
      <TooltipContent>{content}</TooltipContent>
    </Tooltip>
  );
}

export default InfoToolTip;
