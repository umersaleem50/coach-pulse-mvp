import * as React from "react";

import { Label } from "@/shared/components/ui/label";
import { Switch } from "@/shared/components/ui/switch";
import type { SwitchProps } from "@radix-ui/react-switch";

export interface SwitchWithCardProps extends SwitchProps {
  title: string;
  description?: string;
}

export default function SwitchWithCardProps({
  title,
  description,
  ...switchProps
}: SwitchWithCardProps) {
  const id = React.useId();

  return (
    <Label
      className="flex items-center gap-6 rounded-lg border p-3 hover:bg-accent/50 has-data-checked:border-primary/48 has-data-checked:bg-accent/50"
      htmlFor={id}
    >
      <div className="flex flex-col gap-1">
        <p>{title}</p>
        <p className="text-muted-foreground text-xs">{description}</p>
      </div>
      <Switch defaultChecked id={id} {...switchProps} />
    </Label>
  );
}
