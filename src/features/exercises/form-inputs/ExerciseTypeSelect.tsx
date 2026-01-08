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
}

function ExerciseSelect(props: ExerciseSelectProps) {
  return (
    <Select {...props}>
      <SelectTrigger>
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
