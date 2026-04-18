import axios from "axios";
import api from "./index";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface UserSummary {
  id: number;
  name: string;
  email: string;
  avatar_src: string | null;
}

export interface LoginSuccess {
  success: true;
  token: string;
  user: UserSummary;
}

export interface ApiError {
  success: false;
  message: string;
}

function errorMessage(error: unknown, fallback: string): string {
  if (!axios.isAxiosError(error)) return fallback;
  const data = error.response?.data;
  if (data?.errors) {
    const first = Object.values(data.errors)[0] as string[] | undefined;
    if (first?.[0]) return first[0];
  }
  return data?.message || fallback;
}

export async function loginUser(
  payload: LoginPayload,
): Promise<LoginSuccess | ApiError> {
  try {
    const res = await api.post("/dashboard/auth/login", payload);
    const token: string | undefined = res.data?.token;
    const u = res.data?.data;
    if (!token || !u) {
      return { success: false, message: "Unexpected response from server." };
    }
    return {
      success: true,
      token,
      user: {
        id: u.id,
        name: u.name,
        email: u.email,
        avatar_src: u.avatar_src ?? null,
      },
    };
  } catch (error) {
    return {
      success: false,
      message: errorMessage(error, "Invalid email or password."),
    };
  }
}
