import { useId } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

import {
  SUPPORTED_CURRENCIES,
  type SUPPORTED_CURRENCIES_TYPES,
} from "@/constants";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface InputSelectProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onSelect"> {
  label?: string;
  selected?: SUPPORTED_CURRENCIES_TYPES;
  onSelect?: (value: SUPPORTED_CURRENCIES_TYPES) => void;
}

export default function CurrencyInput({
  label,
  selected,
  onSelect,
  ...props
}: InputSelectProps) {
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
          {...props}
          id={id}
          className="-ms-px rounded-s-none shadow-none focus-visible:z-10"
          placeholder="0.00"
          type="number"
        />
      </div>
    </div>
  );
}
