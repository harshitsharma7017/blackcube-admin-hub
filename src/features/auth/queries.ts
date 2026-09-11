import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { signIn, signUp, logout, getMe } from "@/services/auth-service";

export const authKeys = {
  currentUser: ["currentUser"] as const,
};

export function useCurrentUser() {
  return useQuery({
    queryKey: authKeys.currentUser,
    queryFn: getMe,
    retry: false,
  });
}

export function useLogin() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: signIn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authKeys.currentUser });
    },
  });
}

export function useSignup() {
  return useMutation({
    mutationFn: signUp,
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: logout,
    onSettled: () => {
      // Clear cache so protected data is removed
      queryClient.clear();
    },
  });
}
