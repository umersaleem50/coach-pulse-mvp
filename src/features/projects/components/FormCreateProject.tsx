import InputWithButton from "@/shared/components/InputWithButton";
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
import { MapPin } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useGeoLocation } from "../hooks/useGeoLocation";
import { Spinner } from "@/shared/components/ui/spinner";
import { Button } from "@/shared/components/ui/button";
import LocationInput from "@/shared/components/LocationInput";
import UpdateProjectImage from "./UpdateProjectImage";
import { useFile } from "@/store/FileContext";
import { useCreateProject } from "../hooks/useCreateProject";
import { DialogClose, DialogFooter } from "@/shared/components/ui/dialog";

export const formSchema = z.object({
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
});

export function FormCreateProject({
  children,
  onSuccess,
  data,
}: {
  children?: React.ReactNode;
  onSuccess?: () => void;
  data?: z.infer<typeof formSchema>;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: data || {
      location: [],
      logo: "",
      name: "",
      status: "active",
    },
  });

  const { create: createProject, isPending: isCreatingProject } =
    useCreateProject();

  const { files } = useFile();

  function handleSubmitForm(values: z.infer<typeof formSchema>) {
    if (data) {
    } else {
      createProject(
        {
          file: files[0]?.file,
          location: values.location as [number, number],
          name: values.name,
        },
        { onSuccess: onSuccess }
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
        {/* <DialogFooter className="mt-2">
          <DialogClose asChild>
            <Button type="reset" variant={"outline"}>
              Cancel
            </Button>
          </DialogClose> */}
        <Button isLoading={isCreatingProject} type="submit">
          Submit
        </Button>
        {/* </DialogFooter> */}
      </form>
    </Form>
  );
}
