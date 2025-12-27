import { supabase } from "@/shared/lib/supabase";

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function getUser() {
  const { data: session } = await supabase.auth.getSession();

  if (!session?.session) return null;

  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

export async function signup({
  email,
  password,

  // gym_id,
  // owner_id,
}) {
  // const { data: currentSession } = await supabase.auth.getSession();

  const { data: user, error: authError } = await supabase.auth.signUp({
    email,
    password,
  });

  // supabase.auth.setSession(currentSession.session!);

  // const { data: client, error: clientError } = await supabase
  //   .from("gym_clients")
  //   .insert([{ gym_id, owner_id, user_id: user?.user?.id }])
  //   .select();

  if (authError) throw authError;
  // if (clientError) throw clientError;

  return user;
}

export async function updateAccount({
  avatar,
  full_name,
  role,
  password,
  stripe_account_id,
  email,
}: Partial<{
  avatar: any;
  full_name: string;
  role: string;
  password: string;
  stripe_account_id?: string;
  email?: string;
}>) {
  let payload = {};
  if (password) payload = { password };
  else
    payload = {
      data: { full_name, avatar, role, stripe_account_id, email },
    };

  const { data, error } = await supabase.auth.updateUser(payload);

  if (error) throw error;

  if (!avatar) return data;

  const fileName = `avatar-${data.user.id}-${Math.random()}`;

  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);
  if (storageError) throw storageError;

  const { data: updatedUser, error: userError } =
    await supabase.auth.updateUser({
      data: {
        avatar_url: `${fileName}`,
      },
    });

  if (userError) throw userError;

  return updatedUser;
}

export async function inviteUser({ email }: { email: string }) {
  const { data, error } = await supabase.auth.admin.inviteUserByEmail(email);

  if (error) throw error;

  return data;
}

export async function signout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error("Failed to logout.");
  return null;
}

export async function passwordRecovery({ email }: { email: string }) {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email);
  console.log(error);
  if (error) throw error;

  return data;
}

export async function signinOAuth({
  provider,
}: {
  provider: "google" | "apple";
}) {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: "http://localhost:5173/",
    },
  });

  if (error) throw error;
  return data;
}
