import z from "zod";

export const projectDetailsSchema = z.object({
  name: z
    .string()
    .min(3, "Please provide name of minimum 3 letters.")
    .max(400, "Please shorten the name."),
  location: z
    .array(z.number())
    .max(2)
    .min(2, "Please provide location of your project."),
  logo: z.string().optional(),
  status: z.enum(["active", "in-active"]).optional().default("active"),
  id: z.string().or(z.number()).optional(),
});

export const projectOpeningHours = z.object({
  project_id: z.bigint(),
  day_of_week: z.array(z.string()).min(1, "Please select opening days."),
  open_time: z.date(),
  close_time: z.date(),
});

export const CombinedProjectSchema =
  projectDetailsSchema.merge(projectOpeningHours);

export type CombinedProjectType = z.infer<typeof CombinedProjectSchema>;
