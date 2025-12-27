import { Button } from "@/shared/components/ui/button";
import { useDataTable } from "@/shared/hooks/useDataTable";
import { PlusCircle, X } from "lucide-react";
import React from "react";
import type { Exercise } from "./ExercisesColumn";
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

function ExercisesTableActions() {
  const {
    data,
    table,

    coachTypeFilter,
    genderFilter,

    setGenderFilter,
    setCoachTypeFilter,
  } = useDataTable();

  console.log(data);

  const filteredExercises = data?.filter((exercise: Exercise) => {
    const coachTypeMatch =
      coachTypeFilter === "all" || exercise.coach_type === coachTypeFilter;

    const genderMatch =
      genderFilter === "all" || exercise.gender_preference === genderFilter;

    return coachTypeMatch && genderMatch;
  });

  const allMuscleGroups = Array.from(
    new Set(data?.flatMap((exercise) => exercise.muscles_group))
  ).sort();

  // All unique coach types from the data
  const allCoachTypes = Array.from(
    new Set(data?.map((exercise) => exercise.coach_type))
  ).sort();

  // All unique gender preferences from the data
  const allGenderPreferences = Array.from(
    new Set(data?.map((exercise) => exercise.gender_preference))
  ).sort();

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
          value={table.getColumn("muscles_group")?.getFilterValue() as string}
          onValueChange={(value) =>
            table.getColumn("muscles_group")?.setFilterValue(value)
          }
        >
          <SelectTrigger id="muscle-group-filter">
            <SelectValue placeholder="All muscle groups" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All muscle groups</SelectItem>
            <SelectGroup>
              <SelectLabel>Muscle Groups</SelectLabel>
              {allMuscleGroups.map((muscle) => (
                <SelectItem key={muscle} value={muscle}>
                  {muscle}
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
        <Select value={coachTypeFilter} onValueChange={setCoachTypeFilter}>
          <SelectTrigger id="coach-type-filter">
            <SelectValue placeholder="All coach types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All coach types</SelectItem>
            <SelectGroup>
              <SelectLabel>Coach Types</SelectLabel>
              {allCoachTypes.map((coachType) => (
                <SelectItem key={coachType} value={coachType}>
                  {coachType}
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
        <Select value={genderFilter} onValueChange={setGenderFilter}>
          <SelectTrigger id="gender-filter">
            <SelectValue placeholder="All genders" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All genders</SelectItem>
            <SelectGroup>
              <SelectLabel>Gender Preferences</SelectLabel>
              {allGenderPreferences.map((gender) => (
                <SelectItem key={gender} value={gender}>
                  {gender}
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
