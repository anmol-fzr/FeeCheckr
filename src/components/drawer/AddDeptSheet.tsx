import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Plus } from "lucide-react";
import { Button, FormInput } from "@/components";
import { FormProvider, useForm } from "react-hook-form";
import { newDeptSchema } from "@/schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API } from "@/service";
import { IReqCreateDept } from "@/types";
import { toast } from "sonner";

let id = "add_dept_sheet";

const AddDeptSheet = () => {
  const queryClient = useQueryClient();

  const methods = useForm({
    resolver: yupResolver(newDeptSchema),
  });

  const { handleSubmit } = methods;

  const { mutate, isPending } = useMutation({
    mutationFn: API.DEPTS.CREATE,
    mutationKey: ["DEPTS", "CREATE"],
    onError(err) {
      console.log("onError");
      console.log(err);
      toast.error(err.response.data.message, { id });
    },
    onSuccess(res) {
      console.log("onSuccess");
      queryClient.invalidateQueries({
        queryKey: ["DEPTS"],
      });
      toast.success(res.message, { id });
    },
  });

  const onSubmit = (data: IReqCreateDept) => {
    toast.loading("Adding New Department ...", { id });
    mutate(data);
  };

  return (
    <Sheet>
      <SheetTrigger>
        <Button>
          <Plus />
          Add New Dept
        </Button>
      </SheetTrigger>

      <SheetContent className="!w-[850px]">
        <SheetHeader>
          <SheetTitle>Add New Department</SheetTitle>
          <SheetDescription>This action cannot be undone.</SheetDescription>
        </SheetHeader>
        <FormProvider {...methods}>
          <form
            className="flex flex-col gap-2 mt-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <FormInput name="name" label="Name" />
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

export { AddDeptSheet };
