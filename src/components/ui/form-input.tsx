import { FC } from "react";
import { Input, InputProps } from "./input";
import { useFormContext } from "react-hook-form";
import { FormError } from "./form-error";
import { FormDescription, FormLabel } from "./form";

export interface FormInputProps extends InputProps {
  name: string;
  label: string;
  desc?: string;
  info?: string;
}

const FormInput: FC<FormInputProps> = ({
  label,
  desc,
  name,
  info,
  ...props
}) => {
  const { register, formState } = useFormContext();
  const error = formState?.errors[name]?.message?.toString();
  return (
    <div className="flex flex-col gap-0.5">
      <FormLabel htmlFor={name} info={info}>
        {label}
      </FormLabel>
      <Input {...props} id={name} {...register(name)} />
      {desc && <FormDescription>{desc}</FormDescription>}
      <FormError>{error}</FormError>
    </div>
  );
};
FormInput.displayName = "FormInput";

export { FormInput };
