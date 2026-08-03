import { useMutation } from "@tanstack/react-query";

import { authService } from "../services/authService";
import type { RegisteredUser, RegisterUserRequest } from "../types/auth.types";

export function useSignup() {
  return useMutation<RegisteredUser, Error, RegisterUserRequest>({
    mutationFn: authService.signup,
  });
}
