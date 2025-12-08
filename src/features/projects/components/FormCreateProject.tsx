import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/shared/components/ui/button";
import LocationInput from "@/shared/components/LocationInput";
import UpdateProjectImage from "./UpdateProjectImage";
import { useFile } from "@/store/FileContext";
import { useCreateProject } from "../hooks/useCreateProject";
import { generateLogoURL } from "@/shared/lib/helpers";
import useUpdateProject from "../hooks/useUpdateProject";

export const projectFormSchema = z.object({
  name: z
    .string()
    .min(3, "Please provide name of minimum 3 letters.")
    .max(400, "Please shorten the name."),
  location: z
    .array(z.number())
    .max(2)
    .min(2, "Please provide location of your project."),
  logo: z.string(),
  status: z.enum(["active", "in-active"]),
  id: z.string().or(z.number()).optional(),
});

export function FormProject({
  onSuccess,
  data,
}: {
  onSuccess?: () => void;
  data?: z.infer<typeof projectFormSchema>;
}) {
  const form = useForm<z.infer<typeof projectFormSchema>>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: data
      ? { ...data, logo: generateLogoURL(data?.logo) }
      : {
          location: [],
          logo: "",
          name: "",
          status: "active",
        },
  });

  const { isUpdatingProject, updateProject } = useUpdateProject({
    id: data?.id as string,
  });

  const { create: createProject, isPending: isCreatingProject } =
    useCreateProject();

  const { files } = useFile();

  function handleSubmitForm(values: z.infer<typeof projectFormSchema>) {
    if (data) {
      updateProject(
        {
          file: files[0]?.file,
          location: values.location as [number, number],
          name: values?.name as string,
          status: values.status,
        },
        { onSuccess: onSuccess }
      );
    } else {
      createProject(
        {
          file: files[0]?.file,
          location: values.location as [number, number],
          name: values.name,
        },
        { onSuccess }
      );
    }
  }

  function handleSetLocation(location: {
    position: [number, number];
    address: string;
  }) {
    form.setValue("location", location.position);
  }

  return (
    <Form {...form}>
      <form
        className="flex flex-col md:gap-y-4"
        onSubmit={form.handleSubmit(handleSubmitForm)}
      >
        <UpdateProjectImage
          onImageSelect={() => {}}
          avatarUrl={form.getValues("logo")}
          fallBack="AJ"
          isLoading={false}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Name</FormLabel>
              <FormControl>
                <Input placeholder="Oxygen Gym" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <LocationInput field={field} onLocation={handleSetLocation} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          isLoading={isCreatingProject || isUpdatingProject}
          type="submit"
        >
          Submit
        </Button>
      </form>
    </Form>
  );
}
