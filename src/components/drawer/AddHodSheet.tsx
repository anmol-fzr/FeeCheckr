import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Plus } from "lucide-react";
import { Button, FormInput, FormSelect } from "@/components";
import { FormProvider, useForm } from "react-hook-form";
import { useMetaStore } from "@/store";
import { newHodSchema } from "@/schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API } from "@/service";
import { IReqCreateAdmin } from "@/types";
import { toast } from "sonner";

let id = "add_hod_sheet";

const AddHodSheet = () => {
  const deptOpts = useMetaStore((state) => state.depts);
  const queryClient = useQueryClient();

  const methods = useForm({
    resolver: yupResolver(newHodSchema),
  });

  const { handleSubmit } = methods;

  const { mutate, isPending } = useMutation({
    mutationFn: API.ADMIN.CREATE,
    mutationKey: ["ADMIN", "CREATE"],
    onError(err) {
      console.log("onError");
      console.log(err);
      toast.error(err.response.data.message, { id });
    },
    onSuccess(res) {
      console.log("onSuccess");
      queryClient.invalidateQueries({
        queryKey: ["ADMIN"],
      });
      toast.success(res.message, { id });
    },
  });

  const onSubmit = (data: IReqCreateAdmin) => {
    toast.loading("Adding New HOD ...", { id });
    mutate(data);
  };

  return (
    <Sheet>
      <SheetTrigger>
        <Button>
          <Plus />
          Add HOD
        </Button>
      </SheetTrigger>

      <SheetContent className="!w-[850px]">
        <SheetHeader>
          <SheetTitle>Add New HOD</SheetTitle>
          <SheetDescription>This action cannot be undone.</SheetDescription>
        </SheetHeader>
        <FormProvider {...methods}>
          <form
            className="flex flex-col gap-2"
            onSubmit={handleSubmit(onSubmit)}
          >
            <FormInput name="name" label="Name" />
            <FormInput name="mobile" label="Mobile" type="number" />
            <FormInput name="email" label="Email Address" type="email" />
            <FormInput name="password" label="Password" type="text" />
            <FormSelect name="deptId" options={deptOpts} label="Department" />
            <div className="mt-4">
              <Button type="submit" className="w-full" disabled={isPending}>
                Submit
              </Button>
            </div>
          </form>
        </FormProvider>
      </SheetContent>
    </Sheet>
  );
};

export { AddHodSheet };
