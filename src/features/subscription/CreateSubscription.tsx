import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog";
import SubscriptionPlanForm from "./SubscriptionPlanForm";
import { useState } from "react";
import { Button } from "@/shared/components/ui/button";

function CreateSubscription({ children }) {
  const [isOpen, setOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogTrigger asChild id="workout">
        {children}
      </DialogTrigger>

      <DialogContent id="workout">
        <DialogHeader>
          <DialogTitle>Create Workout Plan</DialogTitle>
          <DialogDescription>
            You can choose workout plans while registering new clients.
          </DialogDescription>
        </DialogHeader>
        <SubscriptionPlanForm onSuccess={() => setOpen(false)}>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant={"outline"}>Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </SubscriptionPlanForm>
      </DialogContent>
    </Dialog>
  );
}

export default CreateSubscription;
