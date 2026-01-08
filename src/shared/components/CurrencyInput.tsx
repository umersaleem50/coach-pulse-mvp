import type { SelectProps } from "@radix-ui/react-select";
import { useId } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

import { SUPPORTED_CURRENCIES } from "@/constants";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface InputProps extends SelectProps {
  label?: string;
  selected?: string;
  onSelect?: (value: number | string) => void;
  // currency: SUPPORTED_CURRENCIES_TYPES;
}

export default function CurrencyInput({
  label,
  selected,
  onSelect,
  ...props
}: InputProps) {
  const id = useId();
  return (
    <div className="*:not-first:mt-2">
      {label && <Label htmlFor={id}>{label}</Label>}
      <div className="flex rounded-md shadow-xs">
        <Select
          // defaultValue={selected}

          defaultValue={selected ?? SUPPORTED_CURRENCIES[0].value}
          onValueChange={onSelect}
        >
          <SelectTrigger className="text-muted-foreground hover:text-foreground w-fit rounded-e-none shadow-none outline-none focus:outline-none">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {SUPPORTED_CURRENCIES.map((currency) => (
              <SelectItem key={currency.value} value={currency.value}>
                {currency?.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input
          id={id}
          className="-ms-px rounded-s-none shadow-none focus-visible:z-10"
          placeholder="0.00"
          type="number"
          {...props}
        />
      </div>
    </div>
  );
}
