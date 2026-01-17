import type { Subscription } from "@/features/subscription/SubscriptionColumn";
import { supabase } from "@/shared/lib/supabase";
import type { SubscriptionType } from "@/validators/subscription.validator";

export async function createSubscription(payload: Subscription) {
  const { data, error } = await supabase
    .from("subscriptions")
    .insert([payload])
    .select();
  if (error) throw error;
  return data;
}

export async function getAllSubscriptions() {
  const { data: subscriptions, error } = await supabase
    .from("subscriptions")
    .select("*");

  if (error) throw error;

  return subscriptions;
}

export async function updateSubscription({
  id,
  payload,
}: {
  id: string;
  payload: SubscriptionType;
}) {
  const { data, error } = await supabase
    .from("subscriptions")
    .update(payload)
    .eq("id", id)
    .select();

  if (error) throw error;

  return data;
}

export async function deleteSubscriptionApi(id: Subscription["id"]) {
  let query;
  if (Array.isArray(id)) {
    query = supabase.from("subscriptions").delete().in("id", id);
  } else {
    query = supabase.from("subscriptions").delete().eq("id", id);
  }
  const { error } = await query;

  if (error) throw error;

  return { id };
}
