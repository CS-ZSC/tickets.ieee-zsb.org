import { useAtomValue, useSetAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export interface AuthState {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
    avatar_src: string | null;
  };
}

export const authAtom = atomWithStorage<AuthState | null>(
  "user-data",
  null,
  undefined,
  { getOnInit: true },
);

export function useAuth() {
  return useAtomValue(authAtom);
}

export function useSetAuth() {
  return useSetAtom(authAtom);
}

export function useIsAuthenticated() {
  return useAtomValue(authAtom) !== null;
}
