import { FieldValues, FormProvider, UseFormReturn } from "react-hook-form";
import { H3 } from "../typography";
import { CrossButton, SearchButton } from "../custom";
import { FormInput } from "../ui";
import type { FormInputProps } from "../ui";

type SearchFormProps<TFieldValues extends FieldValues, TContext = any> = {
  formProps?: Omit<
    React.ComponentPropsWithoutRef<"form">,
    "onSubmit" | "children"
  >;
  onSearch: () => void;
  onReset: () => void;
  fields: FormInputProps[];
} & UseFormReturn<TFieldValues, TContext>;

const SearchForm = <TFieldValues extends FieldValues, TContext = any>(
  props: SearchFormProps<TFieldValues, TContext>,
) => {
  const { onSearch, onReset, formProps, fields, ...methods } = props;
  return (
    <>
      <H3>Search</H3>
      <div className="flex items-end gap-4 py-4">
        <FormProvider {...methods}>
          <form className="flex gap-4 items-end" {...formProps}>
            {fields.map((props) => (
              <FormInput
                key={props.name}
                placeholder={`Search by ${props.label} ...`}
                {...props}
              />
            ))}
            <SearchButton onClick={onSearch} />
            <CrossButton onClick={onReset} />
          </form>
        </FormProvider>
      </div>
    </>
  );
};

export { SearchForm };
