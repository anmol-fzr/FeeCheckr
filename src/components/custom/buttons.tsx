import { Button, ButtonProps } from "../ui";
import { SearchIcon } from "lucide-react";
import { Cross2Icon } from "@radix-ui/react-icons";

type SearchButtonProps = ButtonProps;

const SearchButton = (props: SearchButtonProps) => {
  return (
    <Button variant="outline" {...props}>
      <SearchIcon />
      Search
    </Button>
  );
};

const CrossButton = (props: SearchButtonProps) => {
  return (
    <Button variant="ghost" {...props}>
      Reset
      <Cross2Icon />
    </Button>
  );
};

const CancelButton = (props: ButtonProps) => {
  return (
    <Button type="button" variant="outline" {...props}>
      Cancel
    </Button>
  );
};

export { SearchButton, CrossButton, CancelButton };
