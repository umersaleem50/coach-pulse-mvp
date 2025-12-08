import { DialogClose } from "@radix-ui/react-dialog";
import { z } from "zod";

import { useState } from "react";
import type { subscriptionFormSchema } from "./SubscriptionForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog";
import SubscriptionPlanForm from "./SubscriptionPlanForm";
import { Button } from "@/shared/components/ui/button";

function SubscriptionDialog({
  children,
  data,
}: {
  children: React.ReactNode;
  data?: z.infer<typeof subscriptionFormSchema>;
}) {
  const [isOpen, setOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogTrigger asChild id="workout">
        {children}
      </DialogTrigger>

      <DialogContent id="workout">
        <DialogHeader>
          <DialogTitle>{data ? "Edit" : "Create"} Subscription</DialogTitle>
          <DialogDescription>
            You can choose workout plans while registering new clients.
          </DialogDescription>
        </DialogHeader>

        <SubscriptionPlanForm onSuccess={() => setOpen(false)}>
          {/* <SubscriptionPlanForm onSuccess={() => setOpen(false)} data={data}> */}
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

export default SubscriptionDialog;
