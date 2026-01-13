import { supabase } from "@/shared/lib/supabase";

export async function createSubscription(payload) {
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
  payload: any;
}) {
  const { data, error } = await supabase
    .from("subscriptions")
    .update(payload)
    .eq("id", id)
    .select();

  if (error) throw error;

  return data;
}

export async function deleteSubscriptionApi({
  ids,
}: {
  ids: string | number | string[] | number[];
}) {
  let query;
  if (Array.isArray(ids)) {
    query = supabase.from("subscriptions").delete().in("id", ids);
  } else {
    query = supabase.from("subscriptions").delete().eq("id", ids);
  }
  const { error } = await query;

  if (error) throw error;

  return { ids };
}
