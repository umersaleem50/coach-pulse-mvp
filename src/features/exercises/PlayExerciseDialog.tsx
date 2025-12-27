import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { useDataTable } from "@/shared/hooks/useDataTable";

function PlayExerciseDialog() {
  const { videoDialog, setVideoDialog } = useDataTable();
  return (
    <Dialog
      open={videoDialog.open}
      onOpenChange={(open) => setVideoDialog({ ...videoDialog, open })}
    >
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Exercise Video</DialogTitle>
          <DialogDescription>
            Watch the demonstration video for this exercise.
          </DialogDescription>
        </DialogHeader>
        <div className="aspect-video w-full overflow-hidden rounded-md">
          <iframe
            src={videoDialog.url}
            className="h-full w-full"
            title="Exercise Video"
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          ></iframe>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default PlayExerciseDialog;
