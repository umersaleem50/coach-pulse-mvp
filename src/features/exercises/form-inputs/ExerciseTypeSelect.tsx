import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import type { SelectProps } from "@radix-ui/react-select";

interface ExerciseSelectProps extends SelectProps {
  options: { label: string; value: string }[];
  placeholder?: string;
  id?: string;
  "aria-invalid"?: any;
}

function ExerciseSelect(props: ExerciseSelectProps) {
  return (
    <Select {...props}>
      <SelectTrigger aria-invalid={props["aria-invalid"]} id={props.id}>
        <SelectValue placeholder={props.placeholder} />
      </SelectTrigger>
      <SelectContent>
        {props.options.map(({ label, value }) => (
          <SelectItem value={value}>{label}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default ExerciseSelect;
