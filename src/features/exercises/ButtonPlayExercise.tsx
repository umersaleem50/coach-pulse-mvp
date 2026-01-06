import { Button, type ButtonProps } from "@/shared/components/ui/button";
import { useDataTable } from "@/shared/hooks/useDataTable";
import { Play } from "lucide-react";

interface PlayExerciseProps extends ButtonProps {
  video_url: string;
}

function ButtonPlayExercise({ video_url, ...props }: PlayExerciseProps) {
  const { setVideoDialog } = useDataTable();
  return (
    <div className="flex justify-end gap-2">
      <Button
        variant="default"
        size="default"
        onClick={() =>
          setVideoDialog({
            open: true,
            url: video_url,
          })
        }
        {...props}
      >
        <Play className="h-4 w-4" />
        Play
        <span className="sr-only">Play video</span>
      </Button>
    </div>
  );
}

export default ButtonPlayExercise;
