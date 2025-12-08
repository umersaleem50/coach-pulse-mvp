import { useId } from "react";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Input } from "./ui/input";

interface InputProps extends React.ComponentProps<"input"> {
  label?: string;
  selected?: string;
}

export default function InputWithSelect({
  label,
  selected,

  ...props
}: InputProps) {
  const id = useId();
  return (
    <div className="*:not-first:mt-2">
      {label && <Label htmlFor={id}>{label}</Label>}
      <div className="flex rounded-md shadow-xs">
        <Select defaultValue={selected}>
          <SelectTrigger className="text-muted-foreground hover:text-foreground w-fit rounded-e-none shadow-none outline-none focus:outline-none">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="euro">Euro</SelectItem>
            <SelectItem value="pound">Pound</SelectItem>
            <SelectItem value="dollar">Dollar</SelectItem>
          </SelectContent>
        </Select>
        <Input
          id={id}
          className="-ms-px rounded-s-none shadow-none focus-visible:z-10"
          placeholder="0.00"
          {...props}
        />
      </div>
    </div>
  );
}
