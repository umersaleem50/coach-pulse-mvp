import MultiStepForm from "@/shared/components/MultiStepForm";
import { Button } from "@/shared/components/ui/button";
import { FileProvider } from "@/store/FileContext";
import type { MultiFormStep } from "@/types";
import {
  projectDetailsSchema,
  projectOpeningHours,
  type CombinedProjectType,
} from "@/validators/project.validator";
import { Building, Timer } from "lucide-react";
import BasicProjectDetails from "../forms/BasicProjectDetails";
import OpeningHoursForm from "../forms/OpeningHoursForm";
import { useCreateProject } from "../hooks/useCreateProject";

export const projectFormSteps: MultiFormStep<CombinedProjectType>[] = [
  {
    title: "Basic Details",
    description: "Please provide basic details about your exercise.",
    component: <BasicProjectDetails />,
    position: 1,
    validationSchema: projectDetailsSchema,
    fields: ["name", "logo", "location"],
    icon: Building,
  },
  {
    title: "Exercise Volume",
    description: "Please provide volume for your exercise",
    component: <OpeningHoursForm />,
    position: 1,
    validationSchema: projectOpeningHours,
    fields: ["close_time", "open_time", "day_of_week"],
    icon: Timer,
  },
];

export function CreateProject({ children }: { children?: React.ReactNode }) {
  const { create, isPending } = useCreateProject();

  function handleOnSubmit(data: CombinedProjectType) {
    create(data);
  }

  return (
    <FileProvider>
      <MultiStepForm<CombinedProjectType>
        onSubmit={handleOnSubmit}
        steps={projectFormSteps}
        localStorageKey="create-project-form"
        isLoading={isPending}
      >
        {children || <Button>Create Project</Button>}
      </MultiStepForm>
    </FileProvider>
  );
}
