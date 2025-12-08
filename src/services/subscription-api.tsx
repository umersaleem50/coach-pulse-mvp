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
