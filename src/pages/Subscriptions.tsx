import { Page } from "@/shared/components/page";
import { SubcriptionTable } from "../features/subscription/SubscriptionTable";
import { Button } from "@/shared/components/ui/button";
import { Plus } from "lucide-react";

function Subscriptions() {
  return (
    <Page
      title={"Projects"}
      actions={
        <Button>
          <Plus />
          Create Project
        </Button>
      }
    >
      <SubcriptionTable />
    </Page>
  );
}

export default Subscriptions;
