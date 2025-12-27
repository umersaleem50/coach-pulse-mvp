import { ExercisesTable } from "@/features/exercises/ExercisesTable";
import PlayExerciseDialog from "@/features/exercises/PlayExerciseDialog";
import { Page } from "@/shared/components/page";
import { Button } from "@/shared/components/ui/button";
import { X } from "lucide-react";
import React from "react";

function Exercises() {
  return (
    <Page>
      <Page.Header title="Exercises"></Page.Header>
      <Page.Container>
        <ExercisesTable />
      </Page.Container>
    </Page>
  );
}

export default Exercises;
