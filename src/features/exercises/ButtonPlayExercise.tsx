import { Button } from "@/shared/components/ui/button";
import { useDataTable } from "@/shared/hooks/useDataTable";
import { Play } from "lucide-react";

function ButtonPlayExercise({ video_url }) {
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
      >
        <Play className="h-4 w-4" />
        Play
        <span className="sr-only">Play video</span>
      </Button>
    </div>
  );
}

export default ButtonPlayExercise;
