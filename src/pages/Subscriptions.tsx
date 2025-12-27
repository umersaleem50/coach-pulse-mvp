import { Page } from "@/shared/components/page";
import { SubcriptionTable } from "../features/subscription/SubscriptionTable";

function Subscriptions() {
  return (
    <Page>
      <Page.Header title="Subscriptions" />
      <Page.Container>
        <SubcriptionTable />
      </Page.Container>
    </Page>
  );
}

export default Subscriptions;
