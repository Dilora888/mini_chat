import { z } from "zod";
import { validateRespose } from "./validateResponse";

export const UserSchema = z.object({
  id: z.string(),
  username: z.string(),
});

export type User = z.infer<typeof UserSchema>;

export function fetchUser(id: string): Promise<User> {
  return fetch(`/api/users/${id}`)
    .then((response) => response.json())
    .then((data) => UserSchema.parse(data));
}

export function registerUser(
  username: string,
  password: string
): Promise<void> {
  return fetch("/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  }).then(() => undefined);
}

export function login(username: string, password: string): Promise<void> {
  return fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  })
    .then(validateRespose)
    .then(() => undefined);
}

export function fetchMe(): Promise<User> {
  return fetch("/api/users/me")
    .then(validateRespose)
    .then((response) => response.json())
    .then((data) => UserSchema.parse(data));
}
 
// export interface User{
//     id: string;
//     username:string;
// }
