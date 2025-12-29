import { useDataTable } from "@/shared/hooks/useDataTable";
import { Input } from "@/shared/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { COACH_TYPES, GENDER_TYPES, MUSCLE_GROUPS } from "@/constants";

function ExercisesTableActions() {
  const { table } = useDataTable();

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-2">
      <div className="space-y-2">
        <label htmlFor="name-filter" className="text-sm font-medium">
          Exercise Name
        </label>
        <Input
          id="name-filter"
          placeholder="Filter by name..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            table.getColumn("name")?.setFilterValue(e.target.value)
          }
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="muscle-group-filter" className="text-sm font-medium">
          Muscle Group
        </label>
        <Select
          value={
            (table.getColumn("muscles_group")?.getFilterValue() as string) ??
            "all"
          }
          onValueChange={(value) =>
            table
              .getColumn("muscles_group")
              ?.setFilterValue(value === "all" ? undefined : value)
          }
        >
          <SelectTrigger id="muscle-group-filter">
            <SelectValue placeholder="All muscle groups" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All muscle groups</SelectItem>
            <SelectGroup>
              <SelectLabel>Muscle Groups</SelectLabel>
              {MUSCLE_GROUPS.map(({ value, label }) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <label htmlFor="coach-type-filter" className="text-sm font-medium">
          Coach Type
        </label>
        <Select
          value={
            (table.getColumn("coach_type")?.getFilterValue() as string) ?? "all"
          }
          onValueChange={(value) =>
            table
              .getColumn("coach_type")
              ?.setFilterValue(value === "all" ? undefined : value)
          }
        >
          <SelectTrigger id="coach-type-filter">
            <SelectValue placeholder="All Coach Types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All coach types</SelectItem>
            <SelectGroup>
              <SelectLabel>Coach Types</SelectLabel>
              {COACH_TYPES.map((coach) => (
                <SelectItem key={coach.value} value={coach.value}>
                  {coach.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <label htmlFor="gender-filter" className="text-sm font-medium">
          Gender Preference
        </label>
        <Select
          value={
            (table
              .getColumn("gender_preference")
              ?.getFilterValue() as string) ?? "all"
          }
          onValueChange={(value) =>
            table
              .getColumn("gender_preference")
              ?.setFilterValue(value === "all" ? undefined : value)
          }
        >
          <SelectTrigger id="gender-filter">
            <SelectValue placeholder="All Genders" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Genders</SelectItem>
            <SelectGroup>
              <SelectLabel>Gender Preferences</SelectLabel>
              {GENDER_TYPES.map(({ value, label }) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

export default ExercisesTableActions;
