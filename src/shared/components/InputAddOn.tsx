import { useId } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

interface InputAddOnProps extends React.ComponentProps<"input"> {
  endAddOn: string;
  label?: string;
}

export default function InputAddOn({
  endAddOn,
  label,
  ...props
}: InputAddOnProps) {
  const id = useId();
  return (
    <div className="*:not-first:mt-2">
      {label && <Label htmlFor={id}>{label}</Label>}
      <div className="relative">
        <Input id={id} className="peer pe-12" {...props} />
        <span className="text-muted-foreground pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-sm peer-disabled:opacity-50">
          {endAddOn}
        </span>
      </div>
    </div>
  );
}
