import { useId } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface InputButtonProps extends React.ComponentProps<"input"> {
  icon: React.ReactNode;
  label?: string;
  onClick?: () => any;
  tooltipContent: React.ReactNode;
}

export default function InputWithButton({
  icon,
  label,
  className,
  onClick,
  tooltipContent,
  ...inputProps
}: InputButtonProps) {
  const id = useId();

  return (
    <div className={cn(className, "*:not-first:mt-2 ")}>
      {label && <Label htmlFor={id}>{label}</Label>}
      <div className="flex rounded-md shadow-xs w-full">
        <Input
          className={cn(
            "-me-px flex-1 rounded-e-none shadow-none focus-visible:z-10",
            className
          )}
          {...inputProps}
        />

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className="rounded-l-none border-input bg-background text-muted-foreground/80 hover:bg-accent hover:text-accent-foreground focus-visible:border-ring focus-visible:ring-ring/50 inline-flex w-9 items-center justify-center rounded-e-md border text-sm transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
              aria-label={label}
              onClick={onClick}
              type="button"
              // {...buttonProps}
            >
              {icon}
            </Button>
          </TooltipTrigger>
          <TooltipContent>{tooltipContent}</TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
}
