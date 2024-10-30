import { NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { buttonVariants } from "@/components";
import { cn } from "@/lib/utils";

const items = [
  {
    title: "User Interface",
    href: "/settings/ui",
  },
  {
    title: "Account",
    href: "/settings/account",
  },
];

const SettingsSidebar = () => {
  return (
    <nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
      {items.map((item) => (
        <NavLink
          key={item.href}
          to={item.href}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "bg-transparent hover:bg-transparent",
            "relative justify-start p-0 !max-w-xs",
          )}
        >
          {({ isActive }) => (
            <>
              <p className="!z-[10] px-4">{item.title}</p>
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    layoutId="id"
                    className={cn(
                      buttonVariants({ variant: "ghost" }),
                      "bg-border hover:bg-border dark:bg-muted ",
                      "justify-start absolute !z-1 w-full",
                    )}
                  />
                )}
              </AnimatePresence>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
};

export { SettingsSidebar };
