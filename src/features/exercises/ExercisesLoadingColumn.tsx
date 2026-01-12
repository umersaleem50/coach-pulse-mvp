import { Checkbox } from "@/shared/components/ui/checkbox";

import { arrayIncludesFilter } from "@/lib/utils";
import type { ColumnDef } from "@tanstack/react-table";
import ButtonPlayExercise from "./ButtonPlayExercise";

import { Skeleton } from "@/shared/components/ui/skeleton";

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

export const ExercisesLoadingColumn: ColumnDef<Exercise>[] = [
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
        disabled
      />
    ),
    cell: () => <Checkbox aria-label="Select Row" disabled />,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: () => <div className="flex items-center gap-1">Exercise Name</div>,
    cell: () => <Skeleton className="w-20 h-5" />,
  },
  {
    accessorKey: "muscles_group",
    header: "Muscles Group",
    cell: () => {
      return <Skeleton className="w-30 h-5" />;
    },
    filterFn: arrayIncludesFilter,
  },
  {
    accessorKey: "gender_preference",
    header: "Gender",
    cell: () => {
      return <Skeleton className="w-20 h-5" />;
    },
  },
  {
    accessorKey: "sets",
    header: "Sets x Reps",
    cell: () => {
      return (
        <div className="flex gap-x-2">
          <Skeleton className="w-10 h-5" />
          <Skeleton className="w-10 h-5" />
        </div>
      );
    },
  },
  {
    accessorKey: "trainer",
    header: "Trainer",
    cell: () => {
      return <Skeleton className="w-10 h-10 rounded-full" />;
    },
  },
  {
    accessorKey: "coach_type",
    header: "Coach Type",
    cell: () => {
      return <Skeleton className="w-40 h-5" />;
    },
  },
  {
    accessorKey: "video_url",
    header: "Video",
    cell: () => {
      return (
        <div className="w-auto flex items-center">
          <ButtonPlayExercise video_url={"video_url"} disabled />
        </div>
      );
    },
  },
  {
    accessorKey: "action",
    header: "Actions",
    cell: () => <Skeleton className="w-5 h-5" />,
  },
];
