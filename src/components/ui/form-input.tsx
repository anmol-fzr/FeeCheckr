import { FC } from "react";
import { Input, InputProps } from "./input";
import { useFormContext } from "react-hook-form";
import { Label } from "@radix-ui/react-label";
import { FormError } from "./form-error";

export interface FormInputProps extends InputProps {
  name: string;
  label: string;
}

const FormInput: FC<FormInputProps> = ({ label, ...props }) => {
  const { register, formState } = useFormContext();
  const error = formState.errors[props.name]?.message?.toString();
  return (
    <div className="flex flex-col gap-0.5">
      <Label htmlFor={props.name}>{label}</Label>
      <Input {...props} id={props.name} {...register(props.name)} />
      <FormError>{error}</FormError>
    </div>
  );
};
FormInput.displayName = "FormInput";

export { FormInput };
