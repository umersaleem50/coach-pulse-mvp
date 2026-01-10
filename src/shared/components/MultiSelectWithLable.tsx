import { useId } from "react";

import { Label } from "@/shared/components/ui/label";
import MultipleSelector, {
  type Option,
} from "@/shared/components/ui/multiselect";

export default function MultiSelectWithLabel({
  options,
  label,
  placeholder,
  value,
  onChange,
}: {
  placeholder?: string;
  label?: string;
  options: Option[];
  value: Option[];
  onChange: (options: Option[]) => void;
}) {
  const id = useId();
  return (
    <div className="*:not-first:mt-2">
      {label && <Label id={id}>{label}</Label>}
      <MultipleSelector
        commandProps={{
          label: "Select frameworks",
        }}
        value={value}
        onChange={onChange}
        defaultOptions={options}
        placeholder={placeholder}
        hideClearAllButton
        hidePlaceholderWhenSelected
        emptyIndicator={<p className="text-center text-sm">No results found</p>}
      />
    </div>
  );
}
