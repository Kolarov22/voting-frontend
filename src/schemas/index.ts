import { z } from "zod";

export const submitElectionSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  duration: z
    .number()
    .min(1, { message: "Duration must be at least 1 second" })
    .max(604800, { message: "Duration cannot exceed 7 days" }),
});

export const modifyElectionSchema = z.object({
  address: z.string().min(1, { message: "Address is required" }),
  candidates: z
    .string()
    .min(1, { message: "Candidates are required" })
    .regex(/^[a-zA-Z0-9, ]+$/, {
      message: "Candidates must be alphanumeric and comma separated",
    }),
});
