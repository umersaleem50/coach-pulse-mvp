import { getUser } from "@/services/auth-api";
import { useQuery } from "@tanstack/react-query";

export function useAuth() {
  const { isLoading, data: user } = useQuery({
    queryFn: getUser,
    queryKey: ["user"],
  });
  return { isLoading, user, isAuthenticated: user?.role === "authenticated" };
}
