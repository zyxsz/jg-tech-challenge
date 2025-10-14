import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import type { ComponentProps } from "react";

interface Props extends ComponentProps<"div"> {
  asChild?: boolean;
}

export const Tag = ({ className, asChild, ...rest }: Props) => {
  const Element = asChild ? Slot : "div";

  return (
    <Element
      className={cn(
        "flex items-center gap-2 rounded-md bg-background p-2 border text-xs [&_svg]:size-4 select-none text-muted-foreground",
        className
      )}
      {...rest}
    />
  );
};
