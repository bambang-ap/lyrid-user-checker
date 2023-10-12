import {z} from 'zod';

export type TUser = z.infer<typeof tUser>;
export const tUser = z.object({
  id: z.string(),
  email: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  avatar: z.string(),
});

export type TUserJob = z.infer<typeof tUserJob>;
export const tUserJob = z.object({
  name: z.string(),
  job: z.string(),
  id: z.string().optional(),
  createdAt: z.string().optional(),
});

export type TLogin = z.infer<typeof tLogin>;
export const tLogin = z.object({
  email: z.string(),
  password: z.string(),
});

export type TLoginResp = z.infer<typeof tLoginResp>;
export const tLoginResp = z.object({
  id: z.string(),
  token: z.string(),
});
