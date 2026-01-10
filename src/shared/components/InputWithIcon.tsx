import { SearchIcon } from "lucide-react";
import { useId } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export interface InputWithIconProps extends React.ComponentProps<"input"> {
  label?: string;
  icon: React.ReactNode;
  iconPosition?: "start" | "last";
}

export default function InputWithIcon({
  label,
  icon,
  iconPosition = "last",
  ...restProps
}: InputWithIconProps) {
  const id = useId();
  return (
    <div className="flex flex-col gap-y-1">
      {label ?? <Label htmlFor={id}>{label}</Label>}
      <div className="relative">
        <Input id={id} className="peer ps-9 pe-9" {...restProps} />
        <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
          {icon && iconPosition === "start" ? icon : <SearchIcon size={16} />}
        </div>
        <button
          className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Submit search"
          type="submit"
        >
          {icon && iconPosition === "last" ? icon : null}
        </button>
      </div>
    </div>
  );
}
