import { lazy, Suspense, useState } from "react";
import DataTable from "@/shared/components/ui/data-table";
import { DataTableProvider } from "@/store/DataTableContext";
import { ExercisesColumn, type Exercise } from "./ExercisesColumn";
import ExercisesTableActions from "./ExercisesTableActions";
import { ExercisesLoadingColumn } from "./ExercisesLoadingColumn";
const PlayExerciseDialog = lazy(() => import("./PlayExerciseDialog"));

import { useExercises } from "./hooks/useExercises";
import { Spinner } from "@/shared/components/ui/spinner";

// Update the Exercise interface to include an optional trainer field

// Update the sample data to include trainer information for some exercises
const exercisesData: Exercise[] = [
  {
    id: "e1b9f2a0-1234-5678-9abc-def012345678",
    created_at: "2023-05-15T10:30:00Z",
    name: "Push Ups",
    type: "Strength",
    muscles_group: ["Chest", "Triceps", "Shoulders"],
    gender_preference: "Unisex",
    reps: 15,
    sets: 3,
    video_platform: "youtube",
    video_url: "https://www.youtube.com/embed/_l3ySVKYVJ8",
    break_duration: 60,
    breaks: 2,
    coach_type: "Strength & Conditioning Coach",
    trainer: {
      full_name: "John Smith",
      avatar_url: "/placeholder.svg?height=40&width=40",
      email: "john.smith@example.com",
    },
  },
  {
    id: "f2c0a3b1-2345-6789-abcd-ef0123456789",
    created_at: "2023-05-16T11:45:00Z",
    name: "Pull Ups",
    type: "Strength",
    muscles_group: ["Back", "Biceps", "Shoulders"],
    gender_preference: "Unisex",
    reps: 10,
    sets: 3,
    video_platform: "youtube",
    video_url: "https://www.youtube.com/embed/eGo4IYlbE5g",
    break_duration: 90,
    breaks: 2,
    coach_type: "Strength & Conditioning Coach",
  },
  {
    id: "a3d4e5f6-3456-7890-bcde-f01234567890",
    created_at: "2023-05-17T09:15:00Z",
    name: "Squats",
    type: "Strength",
    muscles_group: ["Quadriceps", "Hamstrings", "Glutes"],
    gender_preference: "Unisex",
    reps: 12,
    sets: 4,
    video_platform: "youtube",
    video_url: "https://www.youtube.com/embed/YaXPRqUwItQ",
    break_duration: 75,
    breaks: 3,
    coach_type: "Strength & Conditioning Coach",
    trainer: {
      full_name: "Sarah Johnson",
      avatar_url: "/placeholder.svg?height=40&width=40",
      email: "sarah.johnson@example.com",
    },
  },
  {
    id: "b4e5f6g7-4567-8901-cdef-g0123456789",
    created_at: "2023-05-18T14:20:00Z",
    name: "Lunges",
    type: "Strength",
    muscles_group: ["Quadriceps", "Hamstrings", "Glutes"],
    gender_preference: "Female",
    reps: 10,
    sets: 3,
    video_platform: "youtube",
    video_url: "https://www.youtube.com/embed/QOVaHwm-Q6U",
    break_duration: 60,
    breaks: 2,
    coach_type: "Personal Trainer",
  },
  {
    id: "c5f6g7h8-5678-9012-defg-h01234567890",
    created_at: "2023-05-19T16:30:00Z",
    name: "Plank",
    type: "Core",
    muscles_group: ["Abs", "Lower Back"],
    gender_preference: "Unisex",
    reps: 3,
    sets: 3,
    video_platform: "youtube",
    video_url: "https://www.youtube.com/embed/pSHjTRCQxIw",
    break_duration: 45,
    breaks: 2,
    coach_type: "Fitness Instructor",
    trainer: {
      full_name: "Michael Chen",
      avatar_url: "/placeholder.svg?height=40&width=40",
      email: "michael.chen@example.com",
    },
  },
  {
    id: "d6g7h8i9-6789-0123-efgh-i0123456789",
    created_at: "2023-05-20T08:45:00Z",
    name: "Deadlift",
    type: "Strength",
    muscles_group: ["Lower Back", "Hamstrings", "Glutes"],
    gender_preference: "Male",
    reps: 8,
    sets: 4,
    video_platform: "youtube",
    video_url: "https://www.youtube.com/embed/r4MzxtBKyNE",
    break_duration: 120,
    breaks: 3,
    coach_type: "Strength & Conditioning Coach",
  },
  {
    id: "e7h8i9j0-7890-1234-fghi-j01234567890",
    created_at: "2023-05-21T13:10:00Z",
    name: "Bench Press",
    type: "Strength",
    muscles_group: ["Chest", "Triceps", "Shoulders"],
    gender_preference: "Male",
    reps: 10,
    sets: 3,
    video_platform: "youtube",
    video_url: "https://www.youtube.com/embed/rT7DgCr-3pg",
    break_duration: 90,
    breaks: 2,
    coach_type: "Strength & Conditioning Coach",
    trainer: {
      full_name: "David Rodriguez",
      avatar_url: "/placeholder.svg?height=40&width=40",
      email: "david.rodriguez@example.com",
    },
  },
  {
    id: "f8i9j0k1-8901-2345-ghij-k0123456789",
    created_at: "2023-05-22T15:25:00Z",
    name: "Bicep Curls",
    type: "Isolation",
    muscles_group: ["Biceps"],
    gender_preference: "Unisex",
    reps: 12,
    sets: 3,
    video_platform: "youtube",
    video_url: "https://www.youtube.com/embed/ykJmrZ5v0Oo",
    break_duration: 60,
    breaks: 2,
    coach_type: "Personal Trainer",
  },
  {
    id: "g9j0k1l2-9012-3456-hijk-l01234567890",
    created_at: "2023-05-23T10:50:00Z",
    name: "Tricep Dips",
    type: "Isolation",
    muscles_group: ["Triceps"],
    gender_preference: "Unisex",
    reps: 15,
    sets: 3,
    video_platform: "youtube",
    video_url: "https://www.youtube.com/embed/6kALZikXxLc",
    break_duration: 45,
    breaks: 2,
    coach_type: "Personal Trainer",
    trainer: {
      full_name: "Emma Wilson",
      avatar_url: "/placeholder.svg?height=40&width=40",
      email: "emma.wilson@example.com",
    },
  },
  {
    id: "h0k1l2m3-0123-4567-ijkl-m0123456789",
    created_at: "2023-05-24T09:30:00Z",
    name: "Shoulder Press",
    type: "Strength",
    muscles_group: ["Shoulders", "Triceps"],
    gender_preference: "Female",
    reps: 10,
    sets: 3,
    video_platform: "youtube",
    video_url: "https://www.youtube.com/embed/qEwKCR5JCog",
    break_duration: 75,
    breaks: 2,
    coach_type: "Strength & Conditioning Coach",
  },
];

export interface IVideoDialog {
  open: boolean;
  url: string;
}

// All unique muscle groups from the data

// In the ExercisesTable component, add a new state for gender filter
export function ExercisesTable() {
  const { exercises, isLoadingExercises } = useExercises();
  const [videoDialog, setVideoDialog] = useState<IVideoDialog>({
    open: false,
    url: "",
  });

  const columns = isLoadingExercises ? ExercisesLoadingColumn : ExercisesColumn;
  const data = isLoadingExercises ? Array.from({ length: 3 }) : exercises;

  // Update the filter UI to include gender filter
  return (
    <>
      <div className="rounded-md border p-2">
        <DataTableProvider
          data={data as Exercise[]}
          columns={columns}
          videoDialog={videoDialog}
          setVideoDialog={setVideoDialog}
        >
          <ExercisesTableActions />
          <DataTable />
          <DataTable.Pagination />
          <Suspense fallback={<Spinner />}>
            <PlayExerciseDialog />
          </Suspense>
        </DataTableProvider>
      </div>
    </>
  );
}
