import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Label,
  FormError,
} from "@/components";
import { Option } from "@/types";
import { useFormContext } from "react-hook-form";
import { Controller } from "react-hook-form";

type FormSelectProps = {
  options: Option[];
  name: string;
  label: string;
};

const FormSelect = ({ label, name, options }: FormSelectProps) => {
  const { control, formState } = useFormContext();
  const error = formState.errors[name]?.message?.toString();
  return (
    <div className="w-full flex flex-col gap-0.5">
      <Label htmlFor={name}>{label}</Label>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value, disabled } }) => (
          <Select onValueChange={onChange} value={value} disabled={disabled}>
            <SelectTrigger id="framework">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent position="popper">
              {options.map(({ label, value }) => (
                <SelectItem value={value} key={label}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
      <FormError>{error}</FormError>
    </div>
  );
};

export { FormSelect };
