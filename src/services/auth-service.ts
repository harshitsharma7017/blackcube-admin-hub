import { http } from "./http";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "VIEWER";
}

export async function signUp(data: any): Promise<void> {
  await http.post("/auth/signup", data);
}

export async function signIn(data: any): Promise<{ token: string }> {
  const res = await http.post("/auth/login", data);
  return { token: res.data.data.token };
}

export async function logout(): Promise<void> {
  await http.post("/auth/logout");
}

export async function getMe(): Promise<UserProfile> {
  const res = await http.get("/auth/me");
  return res.data.data as UserProfile;
}
