import type { Row } from "@tanstack/react-table";
import { MoreHorizontalIcon } from "lucide-react";

import { Button } from "@/shared/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu.tsx";

import { Spinner } from "@/shared/components/ui/spinner";
import type { Exercise } from "./ExercisesColumn";
import { useDeleteExercise } from "./hooks/useDeleteExercise";

const ExerciseRowActions = ({ row }: { row: Row<Exercise> }) => {
  const { deleteUserExercise, isDeletingExercise } = useDeleteExercise();
  const { id } = row.original;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex size-8 text-muted-foreground data-[state=open]:bg-muted"
          size="icon"
        >
          <MoreHorizontalIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-32 space-y-1">
        {/* <SubscriptionDialog data={row.original}> */}
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          Edit
        </DropdownMenuItem>
        {/* </SubscriptionDialog> */}
        <DropdownMenuItem
          variant="destructive"
          onSelect={(e) => {
            e.preventDefault();
            deleteUserExercise(id);
          }}
          disabled={isDeletingExercise}
        >
          {isDeletingExercise && <Spinner />} Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ExerciseRowActions;
