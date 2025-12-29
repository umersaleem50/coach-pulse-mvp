import HoverAvatar from "@/shared/components/HoverAvatar";
import { Badge } from "@/shared/components/ui/badge";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { generateAvatarURL } from "@/shared/lib/helpers";
import type { ColumnDef } from "@tanstack/react-table";
import ButtonPlayExercise from "./ButtonPlayExercise";
import { arrayIncludesFilter } from "@/lib/utils";
import {
  COACH_TYPE_LABEL_MAP,
  GENDER_TYPE_LABLE_MAP,
  type GenderType,
  type CoachType,
  MUSCLE_GROUP_LABEL_MAP,
  type MuscleGroup,
} from "@/constants";

export interface Exercise {
  id: string;
  created_at: string;
  name: string;
  type: string;
  muscles_group: string[];
  gender_preference: string;
  reps: number;
  sets: number;
  video_platform: string;
  video_url: string;
  break_duration: number;
  breaks: number;
  coach_type: string;
  trainer?: {
    full_name: string;
    avatar_url: string;
    email: string;
  };
}

export const ExercisesColumn: ColumnDef<Exercise>[] = [
  {
    accessorKey: "id",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select All"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select Row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: () => <div className="flex items-center gap-1">Exercise Name</div>,
    cell: ({ row }) => row.getValue("name"),
  },
  {
    accessorKey: "muscles_group",
    header: "Muscles Group",
    cell: ({ row }) => {
      const values: MuscleGroup[] = row.getValue("muscles_group");
      const valueLables = values.map((value) => MUSCLE_GROUP_LABEL_MAP[value]);
      return (
        <div className="flex flex-wrap gap-1">
          {valueLables.map((muscle: string) => (
            <Badge key={muscle} variant="outline" className="whitespace-nowrap">
              {muscle}
            </Badge>
          ))}
        </div>
      );
    },
    filterFn: arrayIncludesFilter,
  },
  {
    accessorKey: "gender_preference",
    header: "Gender",
    cell: ({ row }) => {
      const value = row.getValue<GenderType>("gender_preference");
      return GENDER_TYPE_LABLE_MAP[value] ?? "-";
    },
  },
  {
    accessorKey: "sets",
    header: "Sets x Reps",
    cell: ({ row }) => {
      const { reps } = row.original;
      return (
        <div className="flex gap-x-2">
          <Badge variant={"outline"}>{row.getValue("sets")} Sets</Badge>
          <Badge variant={"outline"}>{reps} Reps</Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "trainer",
    header: "Trainer",
    cell: ({ row }) => {
      const trainer = row.getValue("trainer");
      return trainer ? (
        <HoverAvatar user={trainer}>
          <img
            src={generateAvatarURL(trainer.avatar_url) || "/placeholder.svg"}
            alt={trainer?.full_name}
            className="h-8 w-8 rounded-full object-cover"
          />
        </HoverAvatar>
      ) : (
        <Badge variant="secondary">Public</Badge>
      );
    },
  },
  {
    accessorKey: "coach_type",
    header: "Coach Type",
    cell: ({ row }) => {
      const value = row.getValue<CoachType>("coach_type");
      return (
        <Badge variant={"secondary"}>
          {COACH_TYPE_LABEL_MAP[value] ?? "-"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "video_url",
    header: "Video",
    cell: ({ row }) => {
      return (
        <div className="w-auto flex items-center">
          <ButtonPlayExercise video_url={row.getValue("video_url")} />
        </div>
      );
    },
  },
];
