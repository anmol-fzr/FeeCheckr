import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui";
import {
  DotsHorizontalIcon,
  Pencil1Icon,
  TrashIcon,
  EyeOpenIcon,
} from "@radix-ui/react-icons";

type TableActionsMenuProps = {
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
};

const TableActionsMenu = ({
  onView,
  onEdit,
  onDelete,
}: TableActionsMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <DotsHorizontalIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {onView && (
          <DropdownMenuItem onClick={onView}>
            <EyeOpenIcon className="w-4 h-4" />
            View
          </DropdownMenuItem>
        )}
        {onEdit && (
          <DropdownMenuItem onClick={onEdit}>
            <Pencil1Icon className="w-4 h-4" />
            Edit
          </DropdownMenuItem>
        )}
        {onDelete && (
          <DropdownMenuItem onClick={onDelete}>
            <TrashIcon className="w-4 h-4" color="red" />
            Delete
          </DropdownMenuItem>
        )}
        {!onView && !onEdit && !onDelete && (
          <DropdownMenuItem>No Actions Available</DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { TableActionsMenu };
