import { z } from "zod";

export const AuthInput = z.object({
  username: z
    .string()
    .min(4, "username should be length greater than 4 and unique"),
  gmail: z.email(),
  password: z.string().min(4, "password must greater than 4 length"),
});
