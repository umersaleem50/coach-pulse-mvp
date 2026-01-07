import { ExercisesTable } from "@/features/exercises/ExercisesTable";
import { Page } from "@/shared/components/page";

function Exercises() {
  return (
    <Page>
      <Page.Header title="Exercises"></Page.Header>
      <Page.Container>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-2 md:mb-3 lg:mb-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Exercises</h2>
            <p className="text-sm text-muted-foreground">
              Manage your exercises and you can use these exercises to build
              your workout plans.
            </p>
          </div>
        </div>
        <ExercisesTable />
      </Page.Container>
    </Page>
  );
}

export default Exercises;
